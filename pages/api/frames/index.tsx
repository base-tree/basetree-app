import {
  DEFAULT_STYLES,
  SITE_URL,
  TALENT_PASSPORTS_API,
} from "@/core/utils/constants";
import { main_addresses } from "@/core/utils/contractAddresses";
import axios from "axios";
// Route that handles frame actions
import {
  FrameActionPayload,
  getFrameHtml,
  validateFrameMessage,
} from "frames.js";
import { Frame } from "frames.js/types";
import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

import ReverserRegistrarAbi from "@/abis/ReverseRegistrarAbi.json";
import PublicResolverAbi from "@/abis/PublicResolverAbi.json";
import { ipfsCheckedUrl } from "@/core/utils";

export const config = {
  runtime: "experimental-edge",
  unstable_allowDynamic: [
    "**/node_modules/@protobufjs/inquire/**", // use a glob to allow anything in the function-bind 3rd party module
  ],
};

export default async function getResponse(
  request: NextRequest
): Promise<NextResponse> {
  const body: FrameActionPayload = await request.json();
  const { isValid, message } = await validateFrameMessage(body);
  const publicClient = createPublicClient({
    chain: base,
    transport: http("https://mainnet.base.org"),
  });

  const signerFid = body.untrustedData.fid;
  // if (!isValid && signerFid < 1) {
  //   return new NextResponse('Message not valid', { status: 500 });
  // }

  const userData = await axios(
    `https://api.pinata.cloud/v3/farcaster/users/${signerFid}`,
    {
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
    }
  ).then((res) => res.data);
  console.log("user data : ", userData);
  const address = userData.user.verified_addresses.eth_addresses[0] ? userData.user.verified_addresses.eth_addresses[0] : userData.user.custody_address ;
  if (!address)
    return new NextResponse("user eth address not found", { status: 500 });
  console.log(address);

  const node = await publicClient.readContract({
    address: main_addresses.ReverseRegistrar as `0x${string}`,
    abi: ReverserRegistrarAbi,
    functionName: "node",
    args: [address],
  });

  const name = await publicClient.readContract({
    address: main_addresses.PublicResolver as `0x${string}`,
    abi: PublicResolverAbi,
    functionName: "name",
    args: [node],
  });

  if(!name || name === ''){
    const frame = {
      version: "vNext",
      image: `${SITE_URL}frames/notfound.png`,
      buttons: [
        {
          label: `What is Basetree?`,
          action: "link",
          target: SITE_URL,
        },
        {
          label: `Manage Your Basetrees`,
          action: "link",
          target: `${SITE_URL}names`,
        },
      ],
      postUrl: `${SITE_URL}/frames`,
      ogImage: `${SITE_URL}frames/notfound.png`,
    };
    const html = getFrameHtml(frame as Frame);
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-control": "s-maxage=60, stale-while-revalidate",
      },
      status: 200,
    });
  }

  let display = await publicClient.getEnsText({
    name: String(name),
    key: "display",
    universalResolverAddress: main_addresses.PublicResolver as `0x${string}`,
  });

  let avatar = await publicClient.getEnsText({
    name: String(name),
    key: "avatar",
    universalResolverAddress: main_addresses.PublicResolver as `0x${string}`,
  });

  let location = await publicClient.getEnsText({
    name: String(name),
    key: "location",
    universalResolverAddress: main_addresses.PublicResolver as `0x${string}`,
  });

  const styles = await publicClient.getEnsText({
    name: String(name),
    key: "xyz.basetree.styles",
    universalResolverAddress: main_addresses.PublicResolver as `0x${string}`,
  });

  const talentHeaders = new Headers();
  talentHeaders.append("X-API-KEY", process.env.NEXT_PUBLIC_TALENT_API || "");

  const talent_passport_results = await fetch(
    `${TALENT_PASSPORTS_API}/${address}`,
    { headers: talentHeaders }
  );

  let _passport: any = undefined;

  if (talent_passport_results.status === 200) {
    _passport = await talent_passport_results
      .json()
      .then((pass) => pass.passport);
  }

  let builderScore = _passport ? _passport.score : undefined;

  if (!display || display === "") {
    console.log('display is empty')
    if (
      _passport &&
      _passport.passport_profile &&
      _passport.passport_profile.display_name
    ) {
      display = _passport.passport_profile.display_name;
      console.log(display)
    }
  }

  if (!location || location === "") {
    if (
      _passport &&
      _passport.passport_profile &&
      _passport.passport_profile.location
    ) {
      location = _passport.passport_profile.location;
    }
  }

  if (!avatar || avatar === "") {
    console.log("avatar is empty")
    if (
      _passport &&
      _passport.passport_profile &&
      _passport.passport_profile.image_url
    ) {
      avatar = _passport.passport_profile.image_url;
    }
  }

  let hashtags = "Basetree,Base";
  let text = `🚀 Just launched my new Basetree profile! 🎉
%0a%0a
It’s now easier than ever to explore my links, projects, and more, all in one place. Check it out and let me know what you think! 👇

%0a%0aget yours @basetree! %0a%0a`;

  const _styles = {
    ...DEFAULT_STYLES,
    ...JSON.parse(String(styles) !== "" ? String(styles) : "null"),
  };
  console.log(avatar, location, styles);
  //   // Use the frame message to build the frame
  const frame = {
    version: "vNext",
    image: `${SITE_URL}api/pog?title=${encodeURIComponent(
      String(display)
    )}&subtitle=${encodeURIComponent(String(location))}&lightmode=${
      _styles.lightMode
    }${
      avatar ? "&avatar=" + ipfsCheckedUrl(avatar) : ""
    }&name=${name}&font=${encodeURIComponent(
      _styles.font
    )}&bg=${encodeURIComponent(_styles.bgColor)}${
      builderScore ? "&bScore=" + builderScore : ""
    }`,
    buttons: [
      {
        label: `View Basetree`,
        action: "link",
        target: `${SITE_URL}${name}`,
      },
      {
        label: `Customize`,
        action: "link",
        target: `${SITE_URL}name/${name}`,
      },
      {
        label: `Share`,
        action: "link",
        target: `https://warpcast.com/~/compose?original_referer=${SITE_URL}&text=${text}&hashtags=${hashtags}&embeds[]=${SITE_URL}${name}`,
      },
    ],
    postUrl: `${SITE_URL}/frames`,
    ogImage: `${SITE_URL}api/pog?title=${encodeURIComponent(
      String(display)
    )}&subtitle=${encodeURIComponent(String(location))}&lightmode=${
      _styles.lightMode
    }${
      avatar ? "&avatar=" + avatar : ""
    }&name=${name}&font=${encodeURIComponent(
      _styles.font
    )}&bg=${encodeURIComponent(_styles.bgColor)}${
      builderScore ? "&bScore=" + builderScore : ""
    }`,
  };

  // Return the frame as HTML
  const html = getFrameHtml(frame as Frame);
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
      "Cache-control": "s-maxage=60, stale-while-revalidate",
    },
    status: 200,
  });
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

// const userData = await fetch(`https://api.pinata.cloud/v3/farcaster/users/${signerFid}`,{headers : {'authorization' : `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`}}).then((res)=> res.json())

// if(!userData.user.verified_addresses.eth_addresses[0]) return new NextResponse("user eth address not found", { status: 500 });

// const name = await mainViemClient.getEnsName({
//   address: userData.user.verified_addresses.eth_addresses[0]
// });

//   const text = message?.inputText || "";
//   let state = {
//     page: 0,
//   };
//   try {
//     state = JSON.parse(decodeURIComponent(message.state?.serialized));
//   } catch (e) {
//     console.error(e);
//   }

/**
   * Use this code to redirect to a different page
//    */
//   if (message?.buttonIndex === 3) {
//     return NextResponse.redirect(
//       "https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms",
//       { status: 302 }
//     );
//   }

// import { Button } from "frames.js/next";
// import { frames } from "./frames";

// const handleRequest = frames(async (ctx: any) => {
//   console.log(ctx)
//   const message = ctx.message;
//   const signerFid = message.requesterFid

//   return {
//     image: (
//       <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex text-[48px]">
//         The current fid is {signerFid}
//       </div>
//     ),
//     imageOptions: {
//       dynamic: true,
//       headers: {
//         // make sure this is always equal or great than minimumCacheTTL when using Next.js Image component
//         // @see https://nextjs.org/docs/app/api-reference/components/image#minimumcachettl
//         "Cache-Control": "max-age=60",
//       },
//     },
//     buttons: [<Button action="post">Refresh</Button>],
//   };
// });

// export const GET = handleRequest;
// export const POST = handleRequest;
// export default handleRequest;
