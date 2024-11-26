import { defineChain, getContract, readContract } from "thirdweb";
import { client } from "components/walletConnect";
import { base, baseSepolia } from "thirdweb/chains";
import { ETHRegistrarControllerAbi } from "./abis";

export const ETHRegistrarController = getContract({
  client: client,
  address: "0x73629FC23b4518fF818df194b6D304BC2048E5aF",
  chain: baseSepolia,
  abi: ETHRegistrarControllerAbi,
});

export const MainETHRegistrarController = getContract({
  client: client,
  address: "0x4cCb0BB02FCABA27e82a56646E81d8c5bC4119a5",
  chain: base,
  abi: ETHRegistrarControllerAbi,
});

export const MainPriceOracle = getContract({
  client: client,
  address: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
  chain: base,
});

export const PriceOracle = getContract({
  client: client,
  address: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1",
  chain: baseSepolia,
});

export const Resolver = getContract({
  client: client,
  address: "0xbc6e57d6a3aC2A181ec397f34A3DC19A87b8f674",
  chain: baseSepolia,
  abi: [
    {
      inputs: [
        {
          internalType: "bytes[]",
          name: "data",
          type: "bytes[]",
        },
      ],
      name: "multicall",
      outputs: [
        {
          internalType: "bytes[]",
          name: "results",
          type: "bytes[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
});

export const ReverseRegistrar = getContract({
  client: client,
  address: "0x2EB9BE1078c2DD96b7FD425E20FF9C1f5CcedBfB",
  chain: baseSepolia,
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
      ],
      name: "setName",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
});


