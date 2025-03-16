export type TransactionType =
  | "ADD_LIQUIDITY"
  | "AIRDROP"
  | "BRIDGE"
  | "BUY"
  | "INTEREST_PAYMENT"
  | "MINT"
  | "REMOVE_LIQUIDITY"
  | "RECEIVE"
  | "SEND"
  | "SELL"
  | "SPAM"
  | "STAKE"
  | "TRADE"
  | "TRANSFER"
  | "UNSTAKE"
  | "WRAP"

export interface PulseTransaction {
  Date: string
  Type: TransactionType
  "Transaction ID": string
  "Received Quantity": string
  "Received Currency": string
  "Received Cost Basis (USD)": string
  "Received Wallet": string
  "Received Address": string
  "Received Comment": string
  "Sent Quantity": string
  "Sent Currency": string
  "Sent Cost Basis (USD)": string
  "Sent Wallet": string
  "Sent Address": string
  "Sent Comment": string
  "Fee Amount": string
  "Fee Currency": string
  "Fee Cost Basis (USD)": string
  "Realized Return (USD)": string
  "Fee Realized Return (USD)": string
  "Transaction Hash": string
}
