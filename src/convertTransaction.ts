import { formatDate } from "./helpers"
import type { CoinTrackerRow } from "./interfaces/CoinTrackerRow"
import type { PulseTransaction } from "./interfaces/PulseTransaction"

export function convertTransaction(row: PulseTransaction): CoinTrackerRow {
  const ctRow: CoinTrackerRow = {
    Date: formatDate(row.Date),
    "Received Quantity": "",
    "Received Currency": "",
    "Sent Quantity": "",
    "Sent Currency": "",
    "Fee Amount": row["Fee Amount"] || "",
    "Fee Currency": row["Fee Currency"] || "",
    Tag: "",
  }

  switch (row.Type.toUpperCase()) {
    case "ADD_LIQUIDITY":
      ctRow["Received Quantity"] = row["Received Quantity"]
      ctRow["Received Currency"] = row["Received Currency"]
      ctRow["Sent Quantity"] = row["Sent Quantity"]
      ctRow["Sent Currency"] = row["Sent Currency"]
      ctRow.Tag = "add_liquidity"
      break

    case "AIRDROP":
      ctRow["Received Quantity"] = row["Received Quantity"]
      ctRow["Received Currency"] = row["Received Currency"]
      ctRow.Tag = "airdrop"
      break

    case "BRIDGE":
      if (row["Received Quantity"]) {
        ctRow["Received Quantity"] = row["Received Quantity"]
        ctRow["Received Currency"] = row["Received Currency"]
      } else if (row["Sent Quantity"]) {
        ctRow["Sent Quantity"] = row["Sent Quantity"]
        ctRow["Sent Currency"] = row["Sent Currency"]
      }
      ctRow.Tag = "bridge"
      break

    case "BUY":
      ctRow["Received Quantity"] = row["Received Quantity"]
      ctRow["Received Currency"] = row["Received Currency"]
      ctRow["Sent Quantity"] = row["Sent Quantity"]
      ctRow["Sent Currency"] = row["Sent Currency"]
      break

    case "INTEREST_PAYMENT":
      ctRow["Received Quantity"] = row["Received Quantity"]
      ctRow["Received Currency"] = row["Received Currency"]
      ctRow.Tag = "interest_payment"
      break

    case "MINT":
      ctRow["Received Quantity"] = row["Received Quantity"]
      ctRow["Received Currency"] = row["Received Currency"]
      ctRow.Tag = "mint"
      break

    case "REMOVE_LIQUIDITY":
      ctRow["Received Quantity"] = row["Received Quantity"]
      ctRow["Received Currency"] = row["Received Currency"]
      ctRow["Sent Quantity"] = row["Sent Quantity"]
      ctRow["Sent Currency"] = row["Sent Currency"]
      ctRow.Tag = "remove_liquidity"
      break

    case "RECEIVE":
      ctRow["Received Quantity"] = row["Received Quantity"]
      ctRow["Received Currency"] = row["Received Currency"]
      break

    case "SEND":
      ctRow["Sent Quantity"] = row["Sent Quantity"]
      ctRow["Sent Currency"] = row["Sent Currency"]
      break

    case "SELL":
      ctRow["Received Quantity"] = row["Received Quantity"]
      ctRow["Received Currency"] = row["Received Currency"]
      ctRow["Sent Quantity"] = row["Sent Quantity"]
      ctRow["Sent Currency"] = row["Sent Currency"]
      break

    case "SPAM":
      if (row["Received Quantity"]) {
        ctRow["Received Quantity"] = row["Received Quantity"]
        ctRow["Received Currency"] = row["Received Currency"]
      }
      if (row["Sent Quantity"]) {
        ctRow["Sent Quantity"] = row["Sent Quantity"]
        ctRow["Sent Currency"] = row["Sent Currency"]
      }
      ctRow.Tag = "spam"
      break

    case "STAKE":
      if (row["Sent Quantity"]) {
        ctRow["Sent Quantity"] = row["Sent Quantity"]
        ctRow["Sent Currency"] = row["Sent Currency"]
      } else {
        ctRow["Sent Quantity"] = row["Received Quantity"]
        ctRow["Sent Currency"] = row["Received Currency"]
      }
      ctRow.Tag = "stake"
      break

    case "TRADE":
      ctRow["Received Quantity"] = row["Received Quantity"]
      ctRow["Received Currency"] = row["Received Currency"]
      ctRow["Sent Quantity"] = row["Sent Quantity"]
      ctRow["Sent Currency"] = row["Sent Currency"]
      break

    case "TRANSFER":
      if (row["Received Quantity"]) {
        ctRow["Received Quantity"] = row["Received Quantity"]
        ctRow["Received Currency"] = row["Received Currency"]
      }
      if (row["Sent Quantity"]) {
        ctRow["Sent Quantity"] = row["Sent Quantity"]
        ctRow["Sent Currency"] = row["Sent Currency"]
      }
      ctRow.Tag = "transfer"
      break

    case "UNSTAKE":
      ctRow["Received Quantity"] = row["Received Quantity"]
      ctRow["Received Currency"] = row["Received Currency"]
      ctRow.Tag = "unstake"
      break

    case "WRAP":
      ctRow["Received Quantity"] = row["Received Quantity"]
      ctRow["Received Currency"] = row["Received Currency"]
      ctRow["Sent Quantity"] = row["Sent Quantity"]
      ctRow["Sent Currency"] = row["Sent Currency"]
      ctRow.Tag = "wrap"
      break

    default:
      if (row["Received Quantity"]) {
        ctRow["Received Quantity"] = row["Received Quantity"]
        ctRow["Received Currency"] = row["Received Currency"]
      } else if (row["Sent Quantity"]) {
        ctRow["Sent Quantity"] = row["Sent Quantity"]
        ctRow["Sent Currency"] = row["Sent Currency"]
      }
      ctRow.Tag = row.Type.toLowerCase()
      break
  }
  return ctRow
}
