import { describe, it, expect } from "vitest"
import { convertTransaction } from "./convertTransaction"
import { type PulseTransaction } from "./interfaces/PulseTransaction"
import { mock, instance, when } from "ts-mockito"

describe("convertTransaction", () => {
  it("should convert BUY transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("BUY")
    when(txMock["Received Quantity"]).thenReturn("100")
    when(txMock["Received Currency"]).thenReturn("BTC")
    when(txMock["Sent Quantity"]).thenReturn("20000")
    when(txMock["Sent Currency"]).thenReturn("USD")
    when(txMock["Fee Amount"]).thenReturn("100")
    when(txMock["Fee Currency"]).thenReturn("PLS")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("100")
    expect(result["Received Currency"]).toBe("BTC")
    expect(result["Sent Quantity"]).toBe("20000")
    expect(result["Sent Currency"]).toBe("USD")
    expect(result["Fee Amount"]).toBe("100")
    expect(result["Fee Currency"]).toBe("PLS")
    expect(result.Tag).toBe("")
  })

  it("should convert SELL transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("SELL")
    when(txMock["Received Quantity"]).thenReturn("90")
    when(txMock["Received Currency"]).thenReturn("USDT")
    when(txMock["Sent Quantity"]).thenReturn("0.5")
    when(txMock["Sent Currency"]).thenReturn("BTC")
    when(txMock["Fee Amount"]).thenReturn("100")
    when(txMock["Fee Currency"]).thenReturn("PLS")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("90")
    expect(result["Received Currency"]).toBe("USDT")
    expect(result["Sent Quantity"]).toBe("0.5")
    expect(result["Sent Currency"]).toBe("BTC")
    expect(result["Fee Amount"]).toBe("100")
    expect(result["Fee Currency"]).toBe("PLS")
    expect(result.Tag).toBe("")
  })

  it("should convert TRADE transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("TRADE")
    when(txMock["Received Quantity"]).thenReturn("30")
    when(txMock["Received Currency"]).thenReturn("BTC")
    when(txMock["Sent Quantity"]).thenReturn("60000")
    when(txMock["Sent Currency"]).thenReturn("HEX")
    when(txMock["Fee Amount"]).thenReturn("100")
    when(txMock["Fee Currency"]).thenReturn("PLS")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("30")
    expect(result["Received Currency"]).toBe("BTC")
    expect(result["Sent Quantity"]).toBe("60000")
    expect(result["Sent Currency"]).toBe("HEX")
    expect(result["Fee Amount"]).toBe("100")
    expect(result["Fee Currency"]).toBe("PLS")
    expect(result.Tag).toBe("")
  })

  it("should convert TRANSFER transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("TRANSFER")
    when(txMock["Received Quantity"]).thenReturn("120")
    when(txMock["Received Currency"]).thenReturn("USDC")
    when(txMock["Sent Quantity"]).thenReturn("120")
    when(txMock["Sent Currency"]).thenReturn("USDC")
    when(txMock["Fee Amount"]).thenReturn("100")
    when(txMock["Fee Currency"]).thenReturn("PLS")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("120")
    expect(result["Received Currency"]).toBe("USDC")
    expect(result["Sent Quantity"]).toBe("120")
    expect(result["Sent Currency"]).toBe("USDC")
    expect(result["Fee Amount"]).toBe("100")
    expect(result["Fee Currency"]).toBe("PLS")
    expect(result.Tag).toBe("transfer")
  })

  it("should convert SEND transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("SEND")
    when(txMock["Sent Quantity"]).thenReturn("50")
    when(txMock["Sent Currency"]).thenReturn("HEX")
    when(txMock["Fee Amount"]).thenReturn("100")
    when(txMock["Fee Currency"]).thenReturn("PLS")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Sent Quantity"]).toBe("50")
    expect(result["Sent Currency"]).toBe("HEX")
    expect(result["Received Quantity"]).toBe("")
    expect(result["Received Currency"]).toBe("")
    expect(result["Fee Amount"]).toBe("100")
    expect(result["Fee Currency"]).toBe("PLS")
    expect(result.Tag).toBe("")
  })

  it("should convert RECEIVE transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("RECEIVE")
    when(txMock["Received Quantity"]).thenReturn("100")
    when(txMock["Received Currency"]).thenReturn("HEX")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("100")
    expect(result["Received Currency"]).toBe("HEX")
    expect(result["Sent Quantity"]).toBe("")
    expect(result["Sent Currency"]).toBe("")
    expect(result.Tag).toBe("")
  })

  it("should convert UNSTAKE transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("UNSTAKE")
    when(txMock["Received Quantity"]).thenReturn("200")
    when(txMock["Received Currency"]).thenReturn("HEX")
    when(txMock["Fee Amount"]).thenReturn("100")
    when(txMock["Fee Currency"]).thenReturn("PLS")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("200")
    expect(result["Received Currency"]).toBe("HEX")
    expect(result["Fee Amount"]).toBe("100")
    expect(result["Fee Currency"]).toBe("PLS")
    expect(result.Tag).toBe("unstake")
  })

  it("should convert SPAM transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("SPAM")
    when(txMock["Received Quantity"]).thenReturn("10")
    when(txMock["Received Currency"]).thenReturn("HEX")
    when(txMock["Sent Quantity"]).thenReturn("5")
    when(txMock["Sent Currency"]).thenReturn("HEX")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("10")
    expect(result["Received Currency"]).toBe("HEX")
    expect(result["Sent Quantity"]).toBe("5")
    expect(result["Sent Currency"]).toBe("HEX")
    expect(result.Tag).toBe("spam")
  })

  // Then other types...
  it("should convert ADD_LIQUIDITY transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("ADD_LIQUIDITY")
    when(txMock["Received Quantity"]).thenReturn("150")
    when(txMock["Received Currency"]).thenReturn("TOKENA")
    when(txMock["Sent Quantity"]).thenReturn("75")
    when(txMock["Sent Currency"]).thenReturn("TOKENB")
    when(txMock["Fee Amount"]).thenReturn("100")
    when(txMock["Fee Currency"]).thenReturn("PLS")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("150")
    expect(result["Received Currency"]).toBe("TOKENA")
    expect(result["Sent Quantity"]).toBe("75")
    expect(result["Sent Currency"]).toBe("TOKENB")
    expect(result["Fee Amount"]).toBe("100")
    expect(result["Fee Currency"]).toBe("PLS")
    expect(result.Tag).toBe("add_liquidity")
  })

  it("should convert AIRDROP transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("AIRDROP")
    when(txMock["Received Quantity"]).thenReturn("200")
    when(txMock["Received Currency"]).thenReturn("TOKENC")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("200")
    expect(result["Received Currency"]).toBe("TOKENC")
    expect(result.Tag).toBe("airdrop")
  })

  it("should convert BRIDGE transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("BRIDGE")
    when(txMock["Received Quantity"]).thenReturn("300")
    when(txMock["Received Currency"]).thenReturn("TOKEND")
    when(txMock["Fee Amount"]).thenReturn("100")
    when(txMock["Fee Currency"]).thenReturn("PLS")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("300")
    expect(result["Received Currency"]).toBe("TOKEND")
    expect(result["Fee Amount"]).toBe("100")
    expect(result["Fee Currency"]).toBe("PLS")
    expect(result.Tag).toBe("bridge")
  })

  it("should convert INTEREST_PAYMENT transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("INTEREST_PAYMENT")
    when(txMock["Received Quantity"]).thenReturn("5")
    when(txMock["Received Currency"]).thenReturn("ETH")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("5")
    expect(result["Received Currency"]).toBe("ETH")
    expect(result.Tag).toBe("interest_payment")
  })

  it("should convert MINT transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("MINT")
    when(txMock["Received Quantity"]).thenReturn("50")
    when(txMock["Received Currency"]).thenReturn("ABC")
    when(txMock["Fee Amount"]).thenReturn("100")
    when(txMock["Fee Currency"]).thenReturn("PLS")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("50")
    expect(result["Received Currency"]).toBe("ABC")
    expect(result["Fee Amount"]).toBe("100")
    expect(result["Fee Currency"]).toBe("PLS")
    expect(result.Tag).toBe("mint")
  })

  it("should convert REMOVE_LIQUIDITY transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("REMOVE_LIQUIDITY")
    when(txMock["Received Quantity"]).thenReturn("75")
    when(txMock["Received Currency"]).thenReturn("TOKENX")
    when(txMock["Sent Quantity"]).thenReturn("37.5")
    when(txMock["Sent Currency"]).thenReturn("TOKENY")
    when(txMock["Fee Amount"]).thenReturn("100")
    when(txMock["Fee Currency"]).thenReturn("PLS")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("75")
    expect(result["Received Currency"]).toBe("TOKENX")
    expect(result["Sent Quantity"]).toBe("37.5")
    expect(result["Sent Currency"]).toBe("TOKENY")
    expect(result["Fee Amount"]).toBe("100")
    expect(result["Fee Currency"]).toBe("PLS")
    expect(result.Tag).toBe("remove_liquidity")
  })

  it("should convert STAKE transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("STAKE")
    when(txMock["Sent Quantity"]).thenReturn("80")
    when(txMock["Sent Currency"]).thenReturn("XYZ")
    when(txMock["Fee Amount"]).thenReturn("100")
    when(txMock["Fee Currency"]).thenReturn("PLS")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Sent Quantity"]).toBe("80")
    expect(result["Sent Currency"]).toBe("XYZ")
    expect(result["Fee Amount"]).toBe("100")
    expect(result["Fee Currency"]).toBe("PLS")
    expect(result.Tag).toBe("stake")
  })

  it("should convert WRAP transactions correctly", () => {
    const txMock = mock<PulseTransaction>()
    when(txMock.Type).thenReturn("WRAP")
    when(txMock["Received Quantity"]).thenReturn("300")
    when(txMock["Received Currency"]).thenReturn("WETH")
    when(txMock["Sent Quantity"]).thenReturn("300")
    when(txMock["Sent Currency"]).thenReturn("ETH")
    when(txMock["Fee Amount"]).thenReturn("100")
    when(txMock["Fee Currency"]).thenReturn("PLS")

    const tx = instance(txMock)
    const result = convertTransaction(tx)

    expect(result["Received Quantity"]).toBe("300")
    expect(result["Received Currency"]).toBe("WETH")
    expect(result["Sent Quantity"]).toBe("300")
    expect(result["Sent Currency"]).toBe("ETH")
    expect(result["Fee Amount"]).toBe("100")
    expect(result["Fee Currency"]).toBe("PLS")
    expect(result.Tag).toBe("wrap")
  })
})
