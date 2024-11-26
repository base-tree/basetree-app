import {
  prepareEvent,
  prepareContractCall,
  readContract,
  type BaseTransactionOptions,
  type AbiParameterToPrimitiveType,
} from "thirdweb";

/**
* Contract events
*/

/**
 * Represents the filters for the "Activate" event.
 */
export type ActivateEventFilters = Partial<{
  wallet: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"wallet","type":"address"}>
}>;

/**
 * Creates an event object for the Activate event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { activateEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  activateEvent({
 *  wallet: ...,
 * })
 * ],
 * });
 * ```
 */
export function activateEvent(filters: ActivateEventFilters = {}) {
  return prepareEvent({
    signature: "event Activate(address indexed wallet, uint256 passportId)",
    filters,
  });
};
  

/**
 * Represents the filters for the "Create" event.
 */
export type CreateEventFilters = Partial<{
  wallet: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"wallet","type":"address"}>
}>;

/**
 * Creates an event object for the Create event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { createEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  createEvent({
 *  wallet: ...,
 * })
 * ],
 * });
 * ```
 */
export function createEvent(filters: CreateEventFilters = {}) {
  return prepareEvent({
    signature: "event Create(address indexed wallet, uint256 passportId, string source)",
    filters,
  });
};
  

/**
 * Represents the filters for the "Deactivate" event.
 */
export type DeactivateEventFilters = Partial<{
  wallet: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"wallet","type":"address"}>
}>;

/**
 * Creates an event object for the Deactivate event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { deactivateEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  deactivateEvent({
 *  wallet: ...,
 * })
 * ],
 * });
 * ```
 */
export function deactivateEvent(filters: DeactivateEventFilters = {}) {
  return prepareEvent({
    signature: "event Deactivate(address indexed wallet, uint256 passportId)",
    filters,
  });
};
  

/**
 * Represents the filters for the "OwnershipTransferred" event.
 */
export type OwnershipTransferredEventFilters = Partial<{
  previousOwner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"}>
newOwner: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}>
}>;

/**
 * Creates an event object for the OwnershipTransferred event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { ownershipTransferredEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  ownershipTransferredEvent({
 *  previousOwner: ...,
 *  newOwner: ...,
 * })
 * ],
 * });
 * ```
 */
export function ownershipTransferredEvent(filters: OwnershipTransferredEventFilters = {}) {
  return prepareEvent({
    signature: "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
    filters,
  });
};
  



/**
 * Creates an event object for the PassportGenerationChanged event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { passportGenerationChangedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  passportGenerationChangedEvent()
 * ],
 * });
 * ```
 */
export function passportGenerationChangedEvent() {
  return prepareEvent({
    signature: "event PassportGenerationChanged(bool sequencial, uint256 nextSequencialPassportId)",
  });
};
  



/**
 * Creates an event object for the Paused event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { pausedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  pausedEvent()
 * ],
 * });
 * ```
 */
export function pausedEvent() {
  return prepareEvent({
    signature: "event Paused(address account)",
  });
};
  

/**
 * Represents the filters for the "Transfer" event.
 */
export type TransferEventFilters = Partial<{
  oldWallet: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"oldWallet","type":"address"}>
newWallet: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"newWallet","type":"address"}>
}>;

/**
 * Creates an event object for the Transfer event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { transferEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  transferEvent({
 *  oldWallet: ...,
 *  newWallet: ...,
 * })
 * ],
 * });
 * ```
 */
export function transferEvent(filters: TransferEventFilters = {}) {
  return prepareEvent({
    signature: "event Transfer(uint256 oldPassportId, uint256 newPassportId, address indexed oldWallet, address indexed newWallet)",
    filters,
  });
};
  

/**
 * Represents the filters for the "TransferAccepted" event.
 */
export type TransferAcceptedEventFilters = Partial<{
  fromWallet: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"fromWallet","type":"address"}>
toWallet: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"toWallet","type":"address"}>
}>;

/**
 * Creates an event object for the TransferAccepted event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { transferAcceptedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  transferAcceptedEvent({
 *  fromWallet: ...,
 *  toWallet: ...,
 * })
 * ],
 * });
 * ```
 */
export function transferAcceptedEvent(filters: TransferAcceptedEventFilters = {}) {
  return prepareEvent({
    signature: "event TransferAccepted(address indexed fromWallet, address indexed toWallet, uint256 passportId)",
    filters,
  });
};
  

/**
 * Represents the filters for the "TransferRequested" event.
 */
export type TransferRequestedEventFilters = Partial<{
  fromWallet: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"fromWallet","type":"address"}>
toWallet: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"toWallet","type":"address"}>
}>;

/**
 * Creates an event object for the TransferRequested event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { transferRequestedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  transferRequestedEvent({
 *  fromWallet: ...,
 *  toWallet: ...,
 * })
 * ],
 * });
 * ```
 */
export function transferRequestedEvent(filters: TransferRequestedEventFilters = {}) {
  return prepareEvent({
    signature: "event TransferRequested(address indexed fromWallet, address indexed toWallet, uint256 passportId)",
    filters,
  });
};
  

/**
 * Represents the filters for the "TransferRevoked" event.
 */
export type TransferRevokedEventFilters = Partial<{
  wallet: AbiParameterToPrimitiveType<{"indexed":true,"internalType":"address","name":"wallet","type":"address"}>
}>;

/**
 * Creates an event object for the TransferRevoked event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { transferRevokedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  transferRevokedEvent({
 *  wallet: ...,
 * })
 * ],
 * });
 * ```
 */
export function transferRevokedEvent(filters: TransferRevokedEventFilters = {}) {
  return prepareEvent({
    signature: "event TransferRevoked(address indexed wallet, uint256 passportId)",
    filters,
  });
};
  



/**
 * Creates an event object for the Unpaused event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { unpausedEvent } from "TODO";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  unpausedEvent()
 * ],
 * });
 * ```
 */
export function unpausedEvent() {
  return prepareEvent({
    signature: "event Unpaused(address account)",
  });
};
  

/**
* Contract read functions
*/

/**
 * Represents the parameters for the "idActive" function.
 */
export type IdActiveParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"","type":"uint256"}>
};

/**
 * Calls the "idActive" function on the contract.
 * @param options - The options for the idActive function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { idActive } from "TODO";
 *
 * const result = await idActive({
 *  arg_0: ...,
 * });
 *
 * ```
 */
export async function idActive(
  options: BaseTransactionOptions<IdActiveParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x02fa5d23",
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ]
],
    params: [options.arg_0]
  });
};


/**
 * Represents the parameters for the "idPassport" function.
 */
export type IdPassportParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"","type":"uint256"}>
};

/**
 * Calls the "idPassport" function on the contract.
 * @param options - The options for the idPassport function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { idPassport } from "TODO";
 *
 * const result = await idPassport({
 *  arg_0: ...,
 * });
 *
 * ```
 */
export async function idPassport(
  options: BaseTransactionOptions<IdPassportParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x7bdfddd2",
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: [options.arg_0]
  });
};


/**
 * Represents the parameters for the "idSource" function.
 */
export type IdSourceParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"","type":"uint256"}>
};

/**
 * Calls the "idSource" function on the contract.
 * @param options - The options for the idSource function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { idSource } from "TODO";
 *
 * const result = await idSource({
 *  arg_0: ...,
 * });
 *
 * ```
 */
export async function idSource(
  options: BaseTransactionOptions<IdSourceParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xeaea2e17",
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ]
],
    params: [options.arg_0]
  });
};




/**
 * Calls the "nextId" function on the contract.
 * @param options - The options for the nextId function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { nextId } from "TODO";
 *
 * const result = await nextId();
 *
 * ```
 */
export async function nextId(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x61b8ce8c",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "owner" function on the contract.
 * @param options - The options for the owner function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { owner } from "TODO";
 *
 * const result = await owner();
 *
 * ```
 */
export async function owner(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x8da5cb5b",
  [],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "passportId" function.
 */
export type PassportIdParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
};

/**
 * Calls the "passportId" function on the contract.
 * @param options - The options for the passportId function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { passportId } from "TODO";
 *
 * const result = await passportId({
 *  arg_0: ...,
 * });
 *
 * ```
 */
export async function passportId(
  options: BaseTransactionOptions<PassportIdParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x1ca8b8ab",
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: [options.arg_0]
  });
};




/**
 * Calls the "paused" function on the contract.
 * @param options - The options for the paused function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { paused } from "TODO";
 *
 * const result = await paused();
 *
 * ```
 */
export async function paused(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x5c975abb",
  [],
  [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "sequencial" function on the contract.
 * @param options - The options for the sequencial function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { sequencial } from "TODO";
 *
 * const result = await sequencial();
 *
 * ```
 */
export async function sequencial(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x3031738a",
  [],
  [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "sourcePassports" function.
 */
export type SourcePassportsParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"string","name":"","type":"string"}>
};

/**
 * Calls the "sourcePassports" function on the contract.
 * @param options - The options for the sourcePassports function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { sourcePassports } from "TODO";
 *
 * const result = await sourcePassports({
 *  arg_0: ...,
 * });
 *
 * ```
 */
export async function sourcePassports(
  options: BaseTransactionOptions<SourcePassportsParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x5ea054c0",
  [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: [options.arg_0]
  });
};




/**
 * Calls the "totalAdminsCreates" function on the contract.
 * @param options - The options for the totalAdminsCreates function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { totalAdminsCreates } from "TODO";
 *
 * const result = await totalAdminsCreates();
 *
 * ```
 */
export async function totalAdminsCreates(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x16d060c4",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "totalCreates" function on the contract.
 * @param options - The options for the totalCreates function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { totalCreates } from "TODO";
 *
 * const result = await totalCreates();
 *
 * ```
 */
export async function totalCreates(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x67d67bb1",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "totalPassportTransfers" function on the contract.
 * @param options - The options for the totalPassportTransfers function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { totalPassportTransfers } from "TODO";
 *
 * const result = await totalPassportTransfers();
 *
 * ```
 */
export async function totalPassportTransfers(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xcbd9ca03",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};




/**
 * Calls the "totalSequencialCreates" function on the contract.
 * @param options - The options for the totalSequencialCreates function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { totalSequencialCreates } from "TODO";
 *
 * const result = await totalSequencialCreates();
 *
 * ```
 */
export async function totalSequencialCreates(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x95a7d9eb",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "transferRequests" function.
 */
export type TransferRequestsParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"","type":"uint256"}>
};

/**
 * Calls the "transferRequests" function on the contract.
 * @param options - The options for the transferRequests function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { transferRequests } from "TODO";
 *
 * const result = await transferRequests({
 *  arg_0: ...,
 * });
 *
 * ```
 */
export async function transferRequests(
  options: BaseTransactionOptions<TransferRequestsParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x03486c40",
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ]
],
    params: [options.arg_0]
  });
};


/**
 * Represents the parameters for the "walletActive" function.
 */
export type WalletActiveParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
};

/**
 * Calls the "walletActive" function on the contract.
 * @param options - The options for the walletActive function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { walletActive } from "TODO";
 *
 * const result = await walletActive({
 *  arg_0: ...,
 * });
 *
 * ```
 */
export async function walletActive(
  options: BaseTransactionOptions<WalletActiveParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xe34f95c5",
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ]
],
    params: [options.arg_0]
  });
};


/**
* Contract write functions
*/

/**
 * Represents the parameters for the "acceptTransfer" function.
 */
export type AcceptTransferParams = {
  passportId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_passportId","type":"uint256"}>
};

/**
 * Calls the "acceptTransfer" function on the contract.
 * @param options - The options for the "acceptTransfer" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { acceptTransfer } from "TODO";
 *
 * const transaction = acceptTransfer({
 *  passportId: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function acceptTransfer(
  options: BaseTransactionOptions<AcceptTransferParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x274fae7c",
  [
    {
      "internalType": "uint256",
      "name": "_passportId",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.passportId]
  });
};


/**
 * Represents the parameters for the "activate" function.
 */
export type ActivateParams = {
  passportId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_passportId","type":"uint256"}>
};

/**
 * Calls the "activate" function on the contract.
 * @param options - The options for the "activate" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { activate } from "TODO";
 *
 * const transaction = activate({
 *  passportId: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function activate(
  options: BaseTransactionOptions<ActivateParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xb260c42a",
  [
    {
      "internalType": "uint256",
      "name": "_passportId",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.passportId]
  });
};


/**
 * Represents the parameters for the "adminCreate" function.
 */
export type AdminCreateParams = {
  source: AbiParameterToPrimitiveType<{"internalType":"string","name":"source","type":"string"}>
wallet: AbiParameterToPrimitiveType<{"internalType":"address","name":"wallet","type":"address"}>
id: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"id","type":"uint256"}>
};

/**
 * Calls the "adminCreate" function on the contract.
 * @param options - The options for the "adminCreate" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { adminCreate } from "TODO";
 *
 * const transaction = adminCreate({
 *  source: ...,
 *  wallet: ...,
 *  id: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function adminCreate(
  options: BaseTransactionOptions<AdminCreateParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xa5a968d7",
  [
    {
      "internalType": "string",
      "name": "source",
      "type": "string"
    },
    {
      "internalType": "address",
      "name": "wallet",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.source, options.wallet, options.id]
  });
};


/**
 * Represents the parameters for the "adminTransfer" function.
 */
export type AdminTransferParams = {
  wallet: AbiParameterToPrimitiveType<{"internalType":"address","name":"wallet","type":"address"}>
id: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"id","type":"uint256"}>
};

/**
 * Calls the "adminTransfer" function on the contract.
 * @param options - The options for the "adminTransfer" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { adminTransfer } from "TODO";
 *
 * const transaction = adminTransfer({
 *  wallet: ...,
 *  id: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function adminTransfer(
  options: BaseTransactionOptions<AdminTransferParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xf17e48ec",
  [
    {
      "internalType": "address",
      "name": "wallet",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.wallet, options.id]
  });
};


/**
 * Represents the parameters for the "create" function.
 */
export type CreateParams = {
  source: AbiParameterToPrimitiveType<{"internalType":"string","name":"source","type":"string"}>
};

/**
 * Calls the "create" function on the contract.
 * @param options - The options for the "create" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { create } from "TODO";
 *
 * const transaction = create({
 *  source: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function create(
  options: BaseTransactionOptions<CreateParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xb6a46b3b",
  [
    {
      "internalType": "string",
      "name": "source",
      "type": "string"
    }
  ],
  []
],
    params: [options.source]
  });
};


/**
 * Represents the parameters for the "deactivate" function.
 */
export type DeactivateParams = {
  passportId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_passportId","type":"uint256"}>
};

/**
 * Calls the "deactivate" function on the contract.
 * @param options - The options for the "deactivate" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { deactivate } from "TODO";
 *
 * const transaction = deactivate({
 *  passportId: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function deactivate(
  options: BaseTransactionOptions<DeactivateParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x916b9bef",
  [
    {
      "internalType": "uint256",
      "name": "_passportId",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.passportId]
  });
};




/**
 * Calls the "pause" function on the contract.
 * @param options - The options for the "pause" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { pause } from "TODO";
 *
 * const transaction = pause();
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function pause(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x8456cb59",
  [],
  []
],
    params: []
  });
};




/**
 * Calls the "renounceOwnership" function on the contract.
 * @param options - The options for the "renounceOwnership" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { renounceOwnership } from "TODO";
 *
 * const transaction = renounceOwnership();
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function renounceOwnership(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x715018a6",
  [],
  []
],
    params: []
  });
};


/**
 * Represents the parameters for the "revokeTransfer" function.
 */
export type RevokeTransferParams = {
  passportId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_passportId","type":"uint256"}>
};

/**
 * Calls the "revokeTransfer" function on the contract.
 * @param options - The options for the "revokeTransfer" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { revokeTransfer } from "TODO";
 *
 * const transaction = revokeTransfer({
 *  passportId: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function revokeTransfer(
  options: BaseTransactionOptions<RevokeTransferParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x8bed5079",
  [
    {
      "internalType": "uint256",
      "name": "_passportId",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.passportId]
  });
};


/**
 * Represents the parameters for the "setGenerationMode" function.
 */
export type SetGenerationModeParams = {
  sequentialFlag: AbiParameterToPrimitiveType<{"internalType":"bool","name":"sequentialFlag","type":"bool"}>
nextSequentialPassportId: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"nextSequentialPassportId","type":"uint256"}>
};

/**
 * Calls the "setGenerationMode" function on the contract.
 * @param options - The options for the "setGenerationMode" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { setGenerationMode } from "TODO";
 *
 * const transaction = setGenerationMode({
 *  sequentialFlag: ...,
 *  nextSequentialPassportId: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setGenerationMode(
  options: BaseTransactionOptions<SetGenerationModeParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x65c6f69a",
  [
    {
      "internalType": "bool",
      "name": "sequentialFlag",
      "type": "bool"
    },
    {
      "internalType": "uint256",
      "name": "nextSequentialPassportId",
      "type": "uint256"
    }
  ],
  []
],
    params: [options.sequentialFlag, options.nextSequentialPassportId]
  });
};


/**
 * Represents the parameters for the "transfer" function.
 */
export type TransferParams = {
  newWallet: AbiParameterToPrimitiveType<{"internalType":"address","name":"newWallet","type":"address"}>
};

/**
 * Calls the "transfer" function on the contract.
 * @param options - The options for the "transfer" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transfer } from "TODO";
 *
 * const transaction = transfer({
 *  newWallet: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function transfer(
  options: BaseTransactionOptions<TransferParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x1a695230",
  [
    {
      "internalType": "address",
      "name": "newWallet",
      "type": "address"
    }
  ],
  []
],
    params: [options.newWallet]
  });
};


/**
 * Represents the parameters for the "transferOwnership" function.
 */
export type TransferOwnershipParams = {
  newOwner: AbiParameterToPrimitiveType<{"internalType":"address","name":"newOwner","type":"address"}>
};

/**
 * Calls the "transferOwnership" function on the contract.
 * @param options - The options for the "transferOwnership" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { transferOwnership } from "TODO";
 *
 * const transaction = transferOwnership({
 *  newOwner: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function transferOwnership(
  options: BaseTransactionOptions<TransferOwnershipParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xf2fde38b",
  [
    {
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
  ],
  []
],
    params: [options.newOwner]
  });
};




/**
 * Calls the "unpause" function on the contract.
 * @param options - The options for the "unpause" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { unpause } from "TODO";
 *
 * const transaction = unpause();
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function unpause(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x3f4ba83a",
  [],
  []
],
    params: []
  });
};


