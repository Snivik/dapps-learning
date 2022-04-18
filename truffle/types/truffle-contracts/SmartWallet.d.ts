/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface SmartWalletContract
  extends Truffle.Contract<SmartWalletInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<SmartWalletInstance>;
}

export interface AllowanceIsSet {
  name: "AllowanceIsSet";
  args: {
    from: string;
    to: string;
    allowance: BN;
    0: string;
    1: string;
    2: BN;
  };
}

export interface Replenished {
  name: "Replenished";
  args: {
    account: string;
    balance: BN;
    0: string;
    1: BN;
  };
}

export interface Withdrawn {
  name: "Withdrawn";
  args: {
    from: string;
    to: string;
    amount: BN;
    0: string;
    1: string;
    2: BN;
  };
}

type AllEvents = AllowanceIsSet | Replenished | Withdrawn;

export interface SmartWalletInstance extends Truffle.ContractInstance {
  accounts(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

  /**
   * Returns balance of your account
   */
  getBalance(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  /**
   * Returns allowance for certain individual and maximum withdrawable amount
   */
  getAllowance(
    from: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN; 1: BN }>;

  /**
   * Sets permittable allowance for a certain address to withdraw from an account
   */
  setAllowance: {
    (
      to: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      to: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      to: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      to: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Lets you withdrwaw from your account or any other account that has funds from your allowance
   */
  withdrawFrom: {
    (
      from: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      from: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      from: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      from: string,
      amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Deposit money to a certain account
   */
  depositMoneyTo: {
    (to: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(to: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      to: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      to: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * Deposit money to sender's account
   */
  depositMoney: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  destroy: {
    (to: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(to: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      to: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      to: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    accounts(arg0: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

    /**
     * Returns balance of your account
     */
    getBalance(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    /**
     * Returns allowance for certain individual and maximum withdrawable amount
     */
    getAllowance(
      from: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: BN }>;

    /**
     * Sets permittable allowance for a certain address to withdraw from an account
     */
    setAllowance: {
      (
        to: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        to: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        to: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        to: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Lets you withdrwaw from your account or any other account that has funds from your allowance
     */
    withdrawFrom: {
      (
        from: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        from: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        from: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        from: string,
        amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Deposit money to a certain account
     */
    depositMoneyTo: {
      (to: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(to: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(
        to: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        to: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * Deposit money to sender's account
     */
    depositMoney: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    destroy: {
      (to: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(to: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(
        to: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        to: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
