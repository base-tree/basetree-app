import { BgColorItem, LinkType, BgImageItem, LinkCategory } from "types";
import { capFirstLetter } from ".";

export const MINT_OPEN = true;
export const MINT_TOTAL_SUPPLY: number = 10000;
export const TLD = "bst";
export const MAIN_TLD = "base.eth";
export const DOMAIN_REGISTER_FEE = 0.00001;
export const MINT_DATE = "";
export const MINT_MESSAGE = "Soon on Base Testnet";
export const SITE_URL = "https://basetree.xyz/";
export const SITE_LOGO_URL = "https://basetree.xyz/logo.svg";
export const SITE_LOGO_URL_PNG = "https://basetree.xyz/logos/logo.png";
export const SITE_OGS_URL = "https://basetree.xyz/ogs/";
export const SITE_URL_SHORT = "basetree.xyz";
export const SITE_TITLE = "Basetree";
export const SITE_DESCRIPTION = "Decentralized Link In Bio Tools";
export const SITE_KEYWORDS =
  "BaseTree, Blockchain Domains, Decentralized Naming Service, Base Naming Service";
export const SITE_FULL_DESCRIPTION =
  "Create and customize your decentralized profile with Basetree. Elevate your Basenames, showcase verified social identities, and unlock new possibilities for creators and builders in the Web3 space.";
export const SITE_MANAGE_URL = "https://basetree.xyz/names/";
export const SITE_MANAGE_SINGLE_URL = "https://basetree.xyz/name/";
export const METADATA_URL = "https://metadata.basetree.xyz/";
export const SITE_PROFILE_URL = "https://basetree.xyz/";
export const ZEALY_URL = "https://zealy.io/c/basetree/";
export const AVATAR_API_URL =
  "https://metadata.basetree.xyz/baseSepolia/avatar/";
export const AVATAR_PREVIEW_URL = "https://metadata.basetree.xyz/preview/";
export const BTCSCAN_ADDRESS = "https://blockchair.com/bitcoin/";
export const ETHERSCAN_ADDRESS = "https://sepolia.basescan.org/tx/";
export const JSON_RPC_URL = "https://cloudflare-eth.com";
export const MAX_NAME_LENGTH = 63;
export const MIN_NAME_LENGTH = 2;
export const MIN_FEE = 660000000;
export const TWITTER_CALLBACK_URL = "https://basetree.xyz/api/twitter/callback";
//export const TWITTER_CALLBACK_URL = 'http://localhost:3000/api/twitter/callback';
export const TWITTER_ME = "https://api.twitter.com/2/users/me";
export const TWITTER_SCOPES = ["tweet.read", "users.read", "offline.access"];
export const TWITTER_FOLLOW_URL =
  "https://twitter.com/intent/user?screen_name=basetree_xyz";
export const TWITTER_RETWEET_URL = "";
export const ZEALY_USERS_API = "";
export const TALENT_PASSPORTS_API = "https://api.talentprotocol.com/api/v2/passports";
export const PASSPORT_CREDENTIALS_API = "https://api.talentprotocol.com/api/v2/passport_credentials";
export const TALENT_PASSPORT_URL = "https://passport.talentprotocol.com/";
export const TALENT_PROTOCOL_URL = "https://talentprotocol.com/";
export const BASENAMES_URL = "https://base.org/names";
export const IPFS_IO_URL = "https://ipfs.io/ipfs/";

export const SOCIAL_TWITTER = "basetree_xyz";
export const TWITTER_URL = "https://twitter.com/";
export const DISCORD_URL = "https://discord.gg/eRD8PBVFaB";
export const GITHUB_URL = "https://github.com/base-tree";
export const TELEGRAM_URL = "https://t.me/basetree";
export const DOCS_URL = "#";
export const ROADMAP_URL = "https://docs.basetree.xyz/overview/roadmap";
export const GUIDES_URL = "https://docs.basetree.xyz/guides/overview";
export const EMAIL_URL = "mailto:info@basetree.xyz";
export const MEDIUM_URL = "https://medium.com/@basetree";
export const FARCASTER_URL = "https://warpcast.com/basetree";
export const YOUTUBE_URL = "https://www.youtube.com/@basetree";
export const OPENSEA_URL =
  "https://testnets.opensea.io/assets/arbitrum-sepolia/0x955357e06046c91186cf4571f4dd729157bfbcfb/";
export const FAUCET_URL = "https://www.alchemy.com/faucets/arbitrum-sepolia";

export const MARKETPLACE_URLS_COLLECTION: any = {
  ethereum: "https://opensea.io/assets/ethereum/",
  polygon: "https://opensea.io/assets/matic/",
  arbitrum: "https://opensea.io/assets/arbitrum/",
  optimism: "https://opensea.io/assets/optimism/",
};

export const MARKETPLACE_URLS: any = {
  ethereum: "https://opensea.io/assets/ethereum/",
  polygon: "https://opensea.io/assets/matic/",
  arbitrum: "https://opensea.io/assets/arbitrum/",
  optimism: "https://opensea.io/assets/optimism/",
  base: "https://opensea.io/assets/base/",
};

export const ETHERSCAN_URLS: any = {
  btc: "https://blockchair.com/bitcoin/address/",
  trx: "https://tronscan.org/#/address/",
  avax: "https://snowtrace.io/address/",
  eth: "https://etherscan.io/address/",
  matic: "https://polygonscan.com/address/",
  bnb: "https://bscscan.com/address/",
  sol: "https://solscan.io/account/",
  tree: "https://explorer-testnet.soneium.org/address/",
  base: "https://basescan.org/address/",
  basesepolia: "https://sepolia.basescan.org/address/",
  arb1: "https://arbiscan.io/address/",
  op: "https://optimistic.etherscan.io/address/",
};

export const IPFS_IMAGE_URI = "ipfs";
export const IMAGE_URI = "http";

export const IPFS_URLS = [
  `https://${process.env.NEXT_PUBLIC_THIRDWEB_ID}.ipfscdn.io/ipfs/`,
  "https://cf-ipfs.com/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://gateway.ipfs.io/",
  "https://gateway.pinata.cloud/ipfs/",
  "https://10.via0.com/ipfs/",
  "https://ipfs.cf-ipfs.com/",
];

export const SIGN_MESSAGE =
  "Welcome to BaseTree. By signing this message, you agree with our terms and conditions. timestamp=";

export const MAX_FILE_UPLOAD = 5242880;

export const DONATE_VALUES: any = {
  ethereum: ["0.001", "0.01", "0.1"],
  bitcoin: ["0.0001 BTC", "0.001 BTC", "0.005 BTC"],
  paypal: ["1 USD", "10 USD", "50 USD"],
};

export const LINK_VALIDATION_REGEX =
  "^(https?:\\/\\/)?" + // protocol
  "([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)" + // subdomain and domain name
  "(\\.[a-zA-Z]{2,})+" + // top-level domain
  "(\\:\\d+)?" + // port
  "(\\/[\\-a-zA-Z\\d%_.~+:@]*)*" + // path (updated to include colon)
  "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + // query string
  "(\\#[-a-zA-Z\\d_]*)?$"; // fragment identifier

export const YOUTUBE_LINK_VALIDATION_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export const SOUNDCLOUD_LINK_REGEX =
  /https?:\/\/(?:w\.|www\.|)(?:soundcloud\.com\/)(?:(?:player\/\?url=https\%3A\/\/api.soundcloud.com\/tracks\/)|)(((\w|-)[^A-z]{7})|([A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*(?!\/sets(?:\/|$))(?:\/[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*){1,2}))/;

export const TWITTER_STATUS_REGEX =
  /^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)$/;

export const LINK_CATEGORIES : LinkCategory[] = [{name : 'Content', icon : 'heading', id: 1}];

export const AVAILABLE_LINKS: LinkType[] = [
  { type: "heading", av: true, reg: "" },
  { type: "text paragraph", av: true, reg: "" },
  { type: "block", av: true, reg: "" },
  { type: "farcaster cast", av: true, reg: "" },
  // { type: "farcaster profile", av: true, reg: "" },
  // { type: "farcaster conversation", av: true, reg: "" },
  // { type: "farcaster feed", av: true, reg: "" },
  { type: "nft link", av: true, reg: "" },
  { type: "simple link", av: true, reg: LINK_VALIDATION_REGEX },
  //{ type: "psn profile", av: true, reg: "" },
  { type: "image link", av: true, reg: LINK_VALIDATION_REGEX },
  { type: "ipfs image", av: true, reg: "" },
  { type: "youtube video", av: true, reg: YOUTUBE_LINK_VALIDATION_REGEX },
  { type: "soundcloud track", av: true, reg: SOUNDCLOUD_LINK_REGEX },
  { type: "pdf document", av: true, reg: LINK_VALIDATION_REGEX },
  { type: "donate button", av: true, reg: "" },
  { type: "payment button", av: true, reg: "" },
  { type: "nft gallery", av: true, reg: "" },
  { type: "nft slider", av: true, reg: "" },
  { type: "tweet", av: true, reg: TWITTER_STATUS_REGEX },
  { type: "twitter timeline", av: true, reg: "" },
  { type: "embed", av: true, reg: "" },
  { type: "token chart", av: true, reg: "" },
  { type: "swap box", av: false, reg: "" },
  { type: "mint box", av: false, reg: "" },
  { type: "token-gated content", av: false, reg: "" },
  { type: "shop box", av: false, reg: "" },
];

export const EXAMPLE_SOCIAL_URLS: any = {
  twitter: "https://twitter.com/exampleuser",
  farcaster: "https://warpcast.com/exampleuser",
  x: "https://x.com/exampleuser",
  linkedin: "https://www.linkedin.com/in/exampleuser/",
  github: "https://github.com/exampleuser",
  medium: "https://medium.com/@exampleuser",
  youtube: "https://www.youtube.com/@exampleuser",
  instagram: "https://www.instagram.com/exampleuser",
  tiktok: "https://www.tiktok.com/@exampleuser",
  twitch: "https://www.twitch.tv/exampleuser",
  snapchat: "https://www.snapchat.com/add/exampleuser",
  facebook: "https://www.facebook.com/exampleuser",
  dribbble: "https://dribbble.com/exampleuser",
  pinterest: "https://www.pinterest.com/exampleuser",
  soundcloud: "https://soundcloud.com/exampleuser",
  spotify: "https://open.spotify.com/user/exampleuser",
  patreon: "https://www.patreon.com/exampleuser",
  substack: "https://exampleuser.substack.com",
  galxe: "https://galxe.com/exampleuser",
  opensea: "https://opensea.io/exampleuser",
  zealy: "https://zealy.io/c/exampleuser",
  ylide: "https://hub.ylide.io/project/exampleuser",
  amazon: "https://www.amazon.com/gp/profile/exampleuser",
  playstore: "https://play.google.com/store/apps/developer?id=Example+User",
  appstore: "https://apps.apple.com/us/developer/example-user/id123456789",
  applemusic: "https://music.apple.com/profile/exampleuser",
  clubhouse: "https://www.joinclubhouse.com/@exampleuser",
  etsy: "https://www.etsy.com/shop/exampleuser",
  discord: "https://discord.gg/exampleuser",
  skype: "exampleuser",
  slack: "https://exampleuser.slack.com",
  telegram: "https://t.me/exampleuser",
  whatsapp: "44234567890",
  phone: "44234567890",
  email: "example@example.com",
};

export const EXAMPLE_LINK_URLS: any = {
  nftlink: "https://yourlink.com",
  simplelink: "https://yourlink.com",
  imagelink: "https://yourlink.com",
  youtubevideo: "https://youtu.be/khZrWdAOirw?si=QY7RefMq8CWDRe68",
  soundcloudtrack: "https://soundcloud.com/symbolico/im-free",
  tweet: "https://x.com/base/status/1844838910918025302",
  farcastercast: "https://warpcast.com/0xsamy/0x7de62a98",
  twittertimeline: "https://x.com/base",
};

export const EXAMPLE_WALLETS: any = {
  base: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  soneium: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  ethereum: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  bitcoin: "bc1qpvsvcfzvz59h02hcuvc8y8jj385r2mlhnkt654",
  polygon: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  arbitrum: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  binance: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  avalanche: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  optimism: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  solana: "BfiZDeHXzuz8pz5EGM6eUv1B1hLsGJQPRoxqYsBRKW3i",
  tron: "TR22H7PLMm1BUaGfhmfnPY7VLEhG2U6y3t",
};

export const SOCIALS = [
  { key: "Twitter", value: "com.twitter", color: "#000000" },
  { key: "Farcaster", value: "xyz.farcaster", color: "#000000" },
  { key: "Discord", value: "com.discord", color: "#5865F2" },
  { key: "Medium", value: "com.medium", color: "#000000" },
  { key: "Opensea", value: "com.opensea", color: "#2081E2" },
  { key: "Telegram", value: "org.telegram", color: "#0088CC" },
  { key: "Github", value: "com.github", color: "#181717" },
  { key: "Instagram", value: "com.instagram", color: "#E4405F" },
  { key: "Threads", value: "com.instagram.threads", color: "#000000" },
  { key: "Youtube", value: "com.google.youtube", color: "#FF0000" },
  { key: "Galxe", value: "com.galxe", color: "#101010" }, // Estimated brand color
  { key: "Facebook", value: "com.facebook", color: "#1877F2" },
  { key: "Zealy", value: "com.zealy", color: "#101010" }, // Estimated brand color
  { key: "Linkedin", value: "com.linkedin", color: "#0077B5" },
  { key: "Email", value: "email", color: "#DD4B39" }, // Standard email color (Gmail red)
  { key: "Dribbble", value: "com.dribbble", color: "#EA4C89" },
  { key: "Phone", value: "phone", color: "#000000" }, // Default phone color
  { key: "Pinterest", value: "com.pinterest", color: "#BD081C" },
  { key: "Soundcloud", value: "com.soundcloud", color: "#FF5500" },
  { key: "Spotify", value: "com.spotify", color: "#1DB954" },
  { key: "TikTok", value: "com.tiktok", color: "#010101" },
  { key: "Twitch", value: "tv.twitch", color: "#9146FF" },
  { key: "Snapchat", value: "com.snapchat", color: "#FFFC00" },
  { key: "Substack", value: "com.substack", color: "#FF6719" },
  { key: "Patreon", value: "com.patreon", color: "#F96854" },
  { key: "Ylide", value: "com.ylide", color: "#0057FF" }, // Estimated brand color
  { key: "Amazon", value: "com.amazon", color: "#FF9900" },
  { key: "Play Store", value: "com.google.play", color: "#34A853" },
  { key: "App Store", value: "com.apple.appstore", color: "#0D96F6" },
  { key: "Apple Music", value: "com.apple.music", color: "#FA243C" },
  { key: "Clubhouse", value: "com.clubhouse", color: "#F3E6D3" },
  { key: "Etsy", value: "com.etsy", color: "#F56400" },
  { key: "Skype", value: "com.skype", color: "#00AFF0" },
  { key: "Slack", value: "com.slack", color: "#4A154B" },
  { key: "Reddit", value: "org.reddit", color: "#FF4500" },
  { key: "Whatsapp", value: "com.whatsapp", color: "#25D366" },
  { key: "X", value: "com.twitter", color: "#000000" },
];

// Function to get the color of a social media platform by name
export function getSocialMediaColor(name: string): string {
  const social = SOCIALS.find(
    (s) => s.key.toLowerCase() === name.toLowerCase()
  );
  return social ? social.color : "#000000"; // Default to black if not found
}

export function getSocialUrlScheme(platform: string): string {
  const socialItem = SOCIALS.find(
    (item) => item.key.toLowerCase() === platform.toLowerCase()
  );
  return socialItem ? socialItem.value : `com.${platform.toLowerCase()}`;
}

export function getSocialTitle(value: string): string | undefined {
  const socialItem = SOCIALS.find(
    (item) => item.value.toLowerCase() === value.toLowerCase()
  );
  return socialItem ? socialItem.key : undefined;
}

export function updateSocialsFromPassport(_socials: Record<string, string>, newData: any): Record<string, string> {
  // Create a map from SOCIALS for easy lookup
  const socialKeyMap: Record<string, string> = SOCIALS.reduce((acc, social) => {
    acc[social.key.toLowerCase()] = social.value;
    return acc;
  }, {} as Record<string, string>);

  // Loop through new data and add it to _socials if it doesn't exist
  newData.forEach(({ profile_url, source }: any) => {
    const formattedSource = source.toLowerCase();
    const socialKey = socialKeyMap[formattedSource];

    if (socialKey && !_socials.hasOwnProperty(socialKey)) {
      const baseUrl = SOCIAL_URLS[formattedSource];

      if (baseUrl) {
        // Remove the base URL from the profile_url to extract only the username
        const username = profile_url.replace(new RegExp(`^https?://(www\\.)?${baseUrl}`, 'i'), '').replace(/\/$/, '');
        _socials[socialKey] = username;
      }
    }
  });
  return _socials;
}

// export function getWalletName(platform: string): string | undefined {
//   const socialItem = SOCIALS.find((item) => item.key.toLowerCase() === platform.toLowerCase());
//   return socialItem?.value;
// }

export const WALLETS = [
  { value: "base", label: "Base" },
  { value: "ethereum", label: "Ethereum" },
  { value: "arbitrum", label: "Arbitrum" },
  { value: "optimism", label: "Optimism" },
  { value: "polygon", label: "Polygon" },
  { value: "avalanche", label: "Avalanche" },
  { value: "solana", label: "Solana" },
  { value: "zora", label: "Zora" },
];

export const BG_COLORS = [
  {
    color: "linear-gradient(0deg, #3d444d 0%, #000000 100%)",
    lightMode: false,
  }, // darkGradient
  { color: "#161618", lightMode: false }, // dark
  {
    color: "linear-gradient(to bottom, #232526 10%, #414345 90%)",
    lightMode: false,
  }, // darkGradient0
  {
    color:
      "radial-gradient(at 40% 30%, #e6e6e6 10%, #ededed 35%, #dcdcdc 55%, #f0f0f0 80%)",
    lightMode: true,
  }, // lightGradient
  {
    color: "linear-gradient(to bottom, #cfdef3 10%, #e0eafc 90%)",
    lightMode: true,
  }, // grayGradient
  {
    color: "linear-gradient(to bottom, #8e9eab 10%, #eef2f3 90%)",
    lightMode: true,
  }, // lightGreyGradient
  {
    color: "linear-gradient(to bottom, #444444 0%, #888888 100%)",
    lightMode: false,
  }, // baseGradient
  {
    color: "linear-gradient(to bottom, #5e1494 0%, #af4bd6 100%)",
    lightMode: false,
  }, // purpleGradient
  {
    color: "linear-gradient(to bottom, #ed213a 0%, #93291e 100%)",
    lightMode: false,
  }, // redGradient
  {
    color: "linear-gradient(to bottom, #b2fefa 0%, #0ed2f7 100%)",
    lightMode: true,
  }, // blueGradient
  {
    color: "linear-gradient(to bottom, #f16311 0%, #f5af19 100%)",
    lightMode: true,
  }, // orangeGradient
  {
    color: "linear-gradient(to bottom, #fffc00 0%, #fffbc0 100%)",
    lightMode: true,
  }, // yellowGradient
];

export const BG_COLORS_SAMPLE = [
  "#161618",
  "#1B262C",
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#607d8b",
  "#EB144C",
  "#F78DA7",
  "#ba68c8",
  "#9900EF",
  "linear-gradient(180deg, #8E44AD 0%, #2C3E50 100%)",
  "linear-gradient(180deg, #1ABC9C 0%, #16A085 100%)",
  "linear-gradient(180deg, #141E30 0%, #243B55 100%)",
  "linear-gradient(180deg, #2ECC71 0%, #27AE60 100%)",
  "linear-gradient(180deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
  "linear-gradient(180deg, #FF7E5F 0%, #FEB47B 100%)",
  "linear-gradient(0deg, #000000 10%, #232323 100%)",
  "linear-gradient(0deg, rgb(0, 0, 0) 0%, #acacac 100%)",
  "linear-gradient(0deg, rgb(255, 177, 153) 0%, rgb(255, 8, 68) 100%)",
  "linear-gradient(270deg, rgb(251, 171, 126) 8.00%, rgb(247, 206, 104) 92.00%)",
  "linear-gradient(315deg, rgb(150, 230, 161) 8.00%, rgb(212, 252, 121) 92.00%)",
  "linear-gradient(to left, rgb(249, 240, 71) 0%, rgb(15, 216, 80) 100%)",
  "linear-gradient(315deg, rgb(194, 233, 251) 8.00%, rgb(161, 196, 253) 92.00%)",
  "linear-gradient(0deg, rgb(0, 198, 251) 0%, rgb(0, 91, 234) 100%)",
  "linear-gradient(0deg, rgb(167, 166, 203) 0%, rgb(137, 137, 186) 51.00%, rgb(137, 137, 186) 100%)",
  "linear-gradient(0deg, rgb(80, 82, 133) 0%, rgb(88, 94, 146) 15.0%, rgb(101, 104, 159) 28.00%, rgb(116, 116, 176) 43.00%, rgb(126, 126, 187) 57.00%, rgb(131, 137, 199) 71.00%, rgb(151, 149, 212) 82.00%, rgb(162, 161, 220) 92.00%, rgb(181, 174, 228) 100%)",
  "linear-gradient(270deg, rgb(255, 126, 179) 0%, rgb(255, 117, 140) 100%)",
  "linear-gradient(90deg, rgb(120, 115, 245) 0%, rgb(236, 119, 171) 100%)",
  "linear-gradient(45deg, #2e266f 0.00%, #9664dd38 100.00%)",
  "linear-gradient(0deg, #cfdef3 10%, #e0eafc 90%)",
  "linear-gradient(0deg, #8e9eab 10%, #eef2f3 90%)",
  "linear-gradient(0deg, #444444 0%, #888888 100%)",
  "linear-gradient(0deg, #5e1494 0%, #af4bd6 100%)",
  "linear-gradient(0deg, #ed213a 0%, #93291e 100%)",
  "linear-gradient(0deg, #b2fefa 0%, #0ed2f7 100%)",
  "linear-gradient(0deg, #f16311 0%, #f5af19 100%)",
  "linear-gradient(0deg, #fffc00 0%, #fffbc0 100%)",
  "radial-gradient(circle at center, yellow 0%, #009966 50%, purple 100%)",
];

export const BG_IMAGES: BgImageItem[] = [
  { bg: "var(--bg1Gradient)", lightMode: false },
  { bg: "var(--bg3Gradient)", lightMode: false },
  { bg: "var(--bg2Gradient)", lightMode: true },
  { bg: "var(--bg4Gradient)", lightMode: false },
  { bg: "var(--bg5Gradient)", lightMode: false },
  { bg: "var(--bg6Gradient)", lightMode: false },
  { bg: "var(--bg7Gradient)", lightMode: false },
  { bg: "var(--bg8Gradient)", lightMode: false },
  { bg: "var(--bg9Gradient)", lightMode: false },
];

export function isLink(value: string): boolean {
  const _isLink = AVAILABLE_LINKS.filter((item) =>
    value.toLowerCase().includes(item.type.toLowerCase().replace(" ", "."))
  );
  return _isLink.length > 0;
}

export const DEFAULT_RECORDS_SERVER = ["display","avatar","location","description","xyz.basetree.styles"];
export const OTHER_RECORDS_SERVER = ["frames","casts","keywords","notice","xyz.basetree.links"];

export const DEFAULT_RECORDS = ["display", "avatar", "location", "description","frames","casts"];

export const DEFAULT_BASETREE_RECORDS = [
  "keywords",
  "notice",
  "xyz.basetree.styles",
  "xyz.basetree.links",
];

export const DEFAULT_SOCIAL_RECORDS = [
  "com.twitter",
  "com.github",
  "xyz.farcaster",
  "url",
  "url2",
  "url3",
];

export const BUTTON_BG_COLORS = [
  "dark",
  "light",
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

export const SKILLS = [
  "Solidity",
  "Rust",
  "Security",
  "Javascript",
  "Typescript",
  "Go",
  "Game development",
  "Data",
  "UI/UX",
  "Prototyping",
  "Research",
  "Music",
  "Illustration",
  "Writing",
  "Video",
  "Graphic design",
  "Animation",
  "Visual design",
  "Design",
  "Digital art",
  "Photography",
  "Community",
  "Product management",
  "Strategy",
  "Business development",
  "Legal",
  "Marketing",
];

export const BUTTON_ROUNDS = ["none", "md", "full"];
export const BUTTON_VARIANTS = [
  "solid",
  "outline",
  "pop",
  "border",
  "border2",
  "fill",
];
export const FONTS = [
  "Montserrat",
  "DM Sans",
  "Poppins",
  "Lato",
  "Pixelify Sans",
  "Space Mono",
  "Playfair Display",
  "Luckiest Guy",
  "Audiowide",
  "Black Ops One",
];

export const DEFAULT_STYLES = {
  lineIcons: false,
  lightMode: BG_COLORS[0].lightMode,
  bgColor: BG_COLORS[0].color,
  avatarShape: "circle",
  avatarSize: "md",
  headerColor: "#ffffff11",
  socialIcons: true,
  walletButtons: true,
  socialButtons: false,
  buttonBgColor: BUTTON_BG_COLORS[2],
  showDomain: true,
  showSkills: true,
  showScore: true,
  scoreType: 'modal',
  showOnChainScore: true,
  onChainScoreType: 'modal',
  headerMode: false,
  round: "md",
  variant: "solid",
  font: FONTS[0],
};

export const TOUR_STEPS = [
  {
    element: ".title",
    intro: `Please provide a title for your BaseTree by entering your name or brand name, for example: John Doe.`,
  },
  {
    element: ".subtitle",
    intro: `Please enter a subtitle for your BaseTree, for example: Content Manager.`,
  },
  {
    element: ".avatar",
    intro: `Upload an avatar image for your BaseTree or choose one from your NFTs.`,
  },
  {
    element: ".bio",
    intro: `Please enter a short description for your BaseTree Profile, for example: I love Blockchain and AI/ML technologies and currently am learning how to read and write smart contracts.`,
  },
  {
    element: ".wallets",
    intro: `Your Base wallet address is added to your BaseTree, You can add your wallet addresses from another chains, for example: Ethereum, BTC, Solana and More`,
  },
  {
    element: ".links",
    intro: `Add your resources like Headings, Texts, Links, Images, NFTs, Youtube Video, Soundcloud Track, Donate or Payment Button and More`,
  },
  {
    element: ".socials",
    intro: `Add a social media link to your BaseTree, for example: Twitter, Instagram, LinkedIn, Github and More`,
  },
  {
    element: ".add",
    intro: `Add your resources like wallet addresses, social media links, Headings, Texts, Links, Images, NFTs, Youtube Video, Soundcloud Track, Donate or Payment Button and More`,
  },
  {
    element: ".design",
    intro: `Design your BaseTree the way you like it! change the background color, customize the buttons style and font. change the layout and other settings`,
  },
  {
    element: ".save",
    intro: `Save your changes to the blockchain`,
  },
  {
    element: ".share",
    intro: `Share your BaseTree with the world`,
  },

  // ...
];

export const EARLY_ADOPTER_IMAGES: any = {
  explorer: {
    src: "https://ipfs.io/ipfs/QmRdewFUw4jxTWnoVMSVLyQ7WmahWUMxDrCVYEwL7TuUDq/crypto-explorer.svg",
    type: "image/svg+xml",
  },
  pioneer: {
    src: "https://ipfs.io/ipfs/QmQ98JMocRupVnixhGcVupmDdmuMxXdsq1ozPyNhskzqEh/Base-domains-pioneer.svg",
    type: "image/svg+xml",
  },
  family: {
    src: "https://ipfs.io/ipfs/QmSoTZi3B6FXLRVBXhsTCwfYPnWMCUHpBc6HiVrGpuBU6o/basetree-family.gif",
    type: "image/gif",
  },
  geek: {
    src: "https://ipfs.io/ipfs/QmPgY5KJ25cBmG4H4HkF6DTgxQ4gaUtzfChS8wS8EXScgH/basetree-geek.gif",
    type: "image/gif",
  },
  identorian: {
    src: "https://ipfs.io/ipfs/QmYK9CchybNS3HxrgvgxnKGHCzeRVwNZV1cmiLGf4qpx4m/identorian.svg",
    type: "image/svg+xml",
  },
  maverick: {
    src: "https://ipfs.io/ipfs/QmQt3CTiZEwDdrAW7ebSM7QX7ZLYts6nWfjfh36xB4iWM7/basetree-maverick.gif",
    type: "image/gif",
  },
  champion: {
    src: "https://ipfs.io/ipfs/QmSdjoBfigMQu2yGpMj5Fhd1xFQFYoTUVTLjUZjGcpnmee/basetree-champions.gif",
    type: "image/gif",
  },
  earlier: {
    src: "https://ipfs.io/ipfs/Qmb1huuaLMpA3JodFysEqpWc65vy4NkXfuix5mYkvaBkJE/earlier.svg",
    type: "image/svg+xml",
  },
  catalyst: {
    src: "https://ipfs.io/ipfs/QmUYe2xS43JB9d7qNB4KyU9ptGCJ9KG5bJcPj7rkdmfqxg/basetree-countdown-catalyst_nft.jpg",
    type: "image/jpeg",
  },
  spring: {
    src: "https://ipfs.io/ipfs/QmNt4zMpdSUtZ8p9ZQPWZy3U4anh9Pb6BxvUZzpFwkEWyk/basetree-springburst-nft.jpg",
    type: "image/jpeg",
  },
};

export const RAFFLE_IMAGES = [
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(4).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(12).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(39).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(58).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(80).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(119).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(139).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(153).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(192).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(197).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(204).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(230).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(260).png",
];

export const RAFFLE_IMAGES2 = [
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(3).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(11).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(38).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(57).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(79).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(118).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(138).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(152).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(191).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(196).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(203).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(229).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(259).png",
];

export const SOCIAL_URLS: any = {
  twitter: "twitter.com/",
  farcaster: "warpcast.com/",
  x: "x.com/",
  linkedin: "linkedin.com/in/",
  github: "github.com/",
  medium: "medium.com/",
  youtube: "youtube.com/",
  instagram: "instagram.com/",
  threads: "threads.net/",
  tiktok: "tiktok.com/",
  twitch: "twitch.tv/",
  snapchat: "snapchat.com/add/",
  facebook: "facebook.com/",
  dribbble: "dribbble.com/",
  pinterest: "pinterest.com/",
  soundcloud: "soundcloud.com/",
  spotify: "open.spotify.com/user/",
  patreon: "patreon.com/",
  substack: "substack.com/",
  galxe: "galxe.com/",
  opensea: "opensea.io/",
  zealy: "zealy.io/c/",
  ylide: "hub.ylide.io/project/",
  amazon: "amazon.com/gp/profile/eampleuser/",
  playstore: "play.google.com/store/apps/developer?id=",
  appstore: "apps.apple.com/us/developer/",
  applemusic: "music.apple.com/profile/",
  clubhouse: "joinclubhouse.com/",
  etsy: "etsy.com/shop/",
  discord: "discord:",
  skype: "skype:",
  slack: "slack.com/",
  telegram: "t.me/",
  whatsapp: "wa.me/",
  phone: "tel:",
  email: "mailto:",
};
