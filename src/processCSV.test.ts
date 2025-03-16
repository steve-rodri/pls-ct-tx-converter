import { describe, it, expect } from "vitest"
import * as fs from "fs"
import { resolve } from "path"
import os from "os"
import { processCSV } from "./processCSV"

describe("processCSV", () => {
  it("should read the input CSV, convert transactions, and write the expected output CSV", async () => {
    // Create a temporary directory for test files.
    const tmpDir = fs.mkdtempSync(resolve(os.tmpdir(), "processCSV-test-"))
    const inputFile = resolve(tmpDir, "input.csv")
    const outputFile = resolve(tmpDir, "output.csv")

    // Define the header (21 fields) as an array.
    const header = [
      "Date",
      "Type",
      "Transaction ID",
      "Received Quantity",
      "Received Currency",
      "Received Cost Basis (USD)",
      "Received Wallet",
      "Received Address",
      "Received Comment",
      "Sent Quantity",
      "Sent Currency",
      "Sent Cost Basis (USD)",
      "Sent Wallet",
      "Sent Address",
      "Sent Comment",
      "Fee Amount",
      "Fee Currency",
      "Fee Cost Basis (USD)",
      "Realized Return (USD)",
      "Fee Realized Return (USD)",
      "Transaction Hash",
    ]
    // Define a data row for a RECEIVE transaction.
    // We supply 5 values and then 16 empty strings so that total fields = 21.
    const row = [
      "2024-12-17T00:00:00Z", // Date
      "RECEIVE", // Type
      "tx1", // Transaction ID
      "100", // Received Quantity
      "HEX", // Received Currency
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ]
    // Build the CSV string.
    const csvInput = header.join(",") + "\n" + row.join(",")
    fs.writeFileSync(inputFile, csvInput)

    // Wrap processCSV call in a promise to wait for output file creation.
    await new Promise<void>((resolvePromise, rejectPromise) => {
      try {
        processCSV(inputFile, outputFile)
        const interval = setInterval(() => {
          if (fs.existsSync(outputFile)) {
            clearInterval(interval)
            resolvePromise()
          }
        }, 100)
      } catch (error) {
        rejectPromise(error)
      }
    })

    // Read the output file.
    const outputContent = fs.readFileSync(outputFile, "utf-8")

    // Expected output:
    // The CSV-stringify library produces a header and then a row for the converted transaction.
    // Assuming our convertTransaction formats "2024-12-17T00:00:00Z" to "12/17/2024 00:00:00",
    // the expected header and row (for a RECEIVE transaction) might be:
    const expectedHeader =
      "Date,Received Quantity,Received Currency,Sent Quantity,Sent Currency,Fee Amount,Fee Currency,Tag"
    const expectedRow = "12/17/2024 00:00:00,100,HEX,,,,,"

    expect(outputContent).toContain(expectedHeader)
    expect(outputContent).toContain(expectedRow)

    // Cleanup temporary files and directory.
    fs.unlinkSync(inputFile)
    fs.unlinkSync(outputFile)
    fs.rmdirSync(tmpDir)
  })
})
