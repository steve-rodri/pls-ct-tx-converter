import { describe, it, expect } from "vitest"
import { formatDate } from "./helpers"

describe("formatDate", () => {
  it("should format a standard UTC date correctly", () => {
    const input = "2024-12-17T00:00:00Z"
    const output = formatDate(input)
    // December 17, 2024 at midnight UTC should be "12/17/2024 00:00:00"
    expect(output).toBe("12/17/2024 00:00:00")
  })

  it("should pad single digit month, day, hour, minute, and second", () => {
    const input = "2024-01-05T03:07:09Z"
    const output = formatDate(input)
    // Expect proper zero padding for single digit month/day/hour/minute/second.
    expect(output).toBe("01/05/2024 03:07:09")
  })

  it("should correctly format a date with non-zero hour, minute, and second", () => {
    const input = "2024-11-23T14:45:30Z"
    const output = formatDate(input)
    expect(output).toBe("11/23/2024 14:45:30")
  })
})
