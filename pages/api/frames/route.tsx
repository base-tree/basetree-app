import { mainViemClient } from "@/components/walletConnect";
import { SITE_URL } from "@/core/utils/constants";
import {
  FrameActionPayload,
  getFrameHtml,
  validateFrameMessage,
} from "frames.js";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameActionPayload = await req.json();
  const { isValid, message: _message } = await validateFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const signerFid = _message?.data.fid ;
  const userData = await fetch(`https://api.pinata.cloud/v3/farcaster/users/${signerFid}`,{headers : {'authorization' : `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`}}).then((res)=> res.json())
  
  if(!userData.user.verified_addresses.eth_addresses[0]) return new NextResponse("user eth address not found", { status: 500 });

  const name = await mainViemClient.getEnsName({
    address: userData.user.verified_addresses.eth_addresses[0]
  });
  
  

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

  return new NextResponse(
    getFrameHtml({
      buttons: [
        {
          action: "link",
          label: "your basetree : " + name,
          target: SITE_URL + name,
        }
      ],
      image: `${SITE_URL}/frames/home.png`,
      postUrl: `${SITE_URL}/api/frames`,
      version: 'vNext'
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
