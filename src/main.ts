import { processCSV } from "./processCSV"

function main() {
  // Retrieve input and output file paths from command-line arguments.
  const inputFile = process.argv[2]
  const outputFile = process.argv[3]

  if (!inputFile || !outputFile) {
    console.error("Usage: bun run convert <input.csv> <output.csv>")
    process.exit(1)
  }

  processCSV(inputFile, outputFile)
}

main()
