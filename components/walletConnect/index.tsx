import ConnectWalletButton from './ConnectButton';
import { createThirdwebClient, defineChain } from "thirdweb";
import { FleekSdk, ApplicationAccessTokenService } from '@fleek-platform/sdk';
import { createPublicClient, http } from "viem";
import { base, baseSepolia } from "viem/chains";
import { addEnsContracts, createEnsPublicClient } from "@base-tree/js";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_ID!;
const secretKey = process.env.THIRDWEB_SECRET_KEY;

const client = createThirdwebClient(
  secretKey
    ? { secretKey }
    : {
        clientId,
      }
);

const applicationService = new ApplicationAccessTokenService({
  clientId: process.env.NEXT_PUBLIC_FLEEK_AAT || '',
});

const fleekSdk = new FleekSdk({
  accessTokenService: applicationService
});

const viemClient = createEnsPublicClient({
  chain: addEnsContracts(baseSepolia),
  transport: http(),
});

const mainViemClient = createPublicClient({
  chain: base,
  transport: http(),
});

export { ConnectWalletButton, client, fleekSdk , viemClient, mainViemClient}