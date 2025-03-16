import * as fs from "fs"
import { parse } from "csv-parse"
import { stringify } from "csv-stringify"
import { convertTransaction } from "./convertTransaction"
import type { PulseTransaction } from "./interfaces/PulseTransaction"
import type { CoinTrackerRow } from "./interfaces/CoinTrackerRow"

function processCSV(inputFile: string, outputFile: string): void {
  const transactions: PulseTransaction[] = []
  const parser = parse({ columns: true, trim: true })

  fs.createReadStream(inputFile)
    .pipe(parser)
    .on("data", (row: unknown) => {
      transactions.push(row as PulseTransaction)
    })
    .on("end", () => {
      console.log(`Parsed ${transactions.length} transactions.`)
      const coinTrackerRows: CoinTrackerRow[] =
        transactions.map(convertTransaction)
      stringify(coinTrackerRows, { header: true }, (err, output) => {
        if (err) {
          console.error("Error stringifying CSV:", err)
          return
        }
        fs.writeFileSync(outputFile, output)
        console.log(`CoinTracker CSV written to ${outputFile}`)
      })
    })
    .on("error", (err: unknown) => {
      console.error("Error reading CSV file:", err)
    })
}

// Retrieve input and output file paths from command-line arguments.
const inputFile = process.argv[2]
const outputFile = process.argv[3]

if (!inputFile || !outputFile) {
  console.error("Usage: bun run convert <input.csv> <output.csv>")
  process.exit(1)
}

processCSV(inputFile, outputFile)
