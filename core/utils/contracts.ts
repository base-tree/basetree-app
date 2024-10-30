import { defineChain, getContract, readContract } from "thirdweb";
import { client } from "components/walletConnect";
import { baseSepolia } from "thirdweb/chains";

export const ETHRegistrarController = getContract({
  client: client,
  address: "0x73629FC23b4518fF818df194b6D304BC2048E5aF",
  chain: baseSepolia,
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "duration",
          type: "uint256",
        },
        {
          internalType: "bytes32",
          name: "secret",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "resolver",
          type: "address",
        },
        {
          internalType: "bytes[]",
          name: "data",
          type: "bytes[]",
        },
        {
          internalType: "bool",
          name: "reverseRecord",
          type: "bool",
        },
        {
          internalType: "uint32",
          name: "fuses",
          type: "uint32",
        },
        {
          internalType: "uint64",
          name: "wrapperExpiry",
          type: "uint64",
        },
      ],
      name: "makeCommitment",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "duration",
          type: "uint256",
        },
        {
          internalType: "bytes32",
          name: "secret",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "resolver",
          type: "address",
        },
        {
          internalType: "bytes[]",
          name: "data",
          type: "bytes[]",
        },
        {
          internalType: "bool",
          name: "reverseRecord",
          type: "bool",
        },
        {
          internalType: "uint32",
          name: "fuses",
          type: "uint32",
        },
        {
          internalType: "uint64",
          name: "wrapperExpiry",
          type: "uint64",
        },
      ],
      name: "register",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "commitment",
          type: "bytes32",
        },
      ],
      name: "commit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
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


