import ConnectWalletButton from './ConnectButton';
import { createThirdwebClient, defineChain } from "thirdweb";
import { FleekSdk, ApplicationAccessTokenService } from '@fleek-platform/sdk';
import { http } from "viem";
import { baseSepolia } from "viem/chains";
import { addEnsContracts, createEnsPublicClient } from "@base-tree/js";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_ID,
} as any);

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

export { ConnectWalletButton, client, fleekSdk , viemClient}