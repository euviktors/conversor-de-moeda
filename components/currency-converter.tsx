"use client"

import { useState, useEffect } from "react"
import { ArrowLeftRight, ArrowRight } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const CURRENCIES = {
  FIAT: [
    { code: "BRL", name: "Real Brasileiro", symbol: "R$" },
    { code: "USD", name: "Dólar Americano", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "Libra Esterlina", symbol: "£" },
    { code: "JPY", name: "Iene Japonês", symbol: "¥" },
    { code: "CNY", name: "Yuan Chinês", symbol: "¥" },
    { code: "RUB", name: "Rublo Russo", symbol: "₽" },
    { code: "KRW", name: "Won Sul-Coreano", symbol: "₩" },
    { code: "ESP", name: "Euro (Espanha)", symbol: "€" }
  ],
  CRYPTO: [
    { code: "BTC", name: "Bitcoin", symbol: "₿" },
    { code: "ETH", name: "Ethereum", symbol: "Ξ" },
    { code: "USDT", name: "Tether", symbol: "₮" },
    { code: "BNB", name: "Binance Coin", symbol: "BNB" },
    { code: "USD", name: "USD Coin", symbol: "$" },
    { code: "LTC", name: "Litecoin", symbol: "Ł" },
    { code: "XRP", name: "Ripple", symbol: "XRP" },
    { code: "ADA", name: "Cardano", symbol: "₳" },
    { code: "DOT", name: "Polkadot", symbol: "DOT" },
    { code: "DOGE", name: "Dogecoin", symbol: "Ð" }
  ]
}

const MOCK_RATES = {
  BRL: { USD: 0.2, EUR: 0.19, GBP: 0.16, JPY: 28.5, CNY: 1.44, RUB: 18.3, KRW: 260, ESP: 0.19, BTC: 0.0000083, ETH: 0.00012, USDT: 0.2, BNB: 0.00067, LTC: 0.0025, XRP: 0.4, ADA: 0.4, DOT: 0.033, DOGE: 2.5 },
  USD: { BRL: 5.0, EUR: 0.93, GBP: 0.79, JPY: 142.5, CNY: 7.2, RUB: 91.5, KRW: 1300, ESP: 0.93, BTC: 0.000041, ETH: 0.00062, USDT: 1, BNB: 0.0033, LTC: 0.0125, XRP: 2, ADA: 2, DOT: 0.167, DOGE: 12.5 },
  EUR: { BRL: 5.37, USD: 1.07, GBP: 0.85, JPY: 153, CNY: 7.74, RUB: 98.3, KRW: 1397, ESP: 1, BTC: 0.000044, ETH: 0.00066, USDT: 1.07, BNB: 0.0036, LTC: 0.0134, XRP: 2.15, ADA: 2.15, DOT: 0.179, DOGE: 13.4 },
  GBP: { BRL: 6.31, USD: 1.26, EUR: 1.17, JPY: 180, CNY: 9.1, RUB: 115.6, KRW: 1642, ESP: 1.17, BTC: 0.000052, ETH: 0.00078, USDT: 1.26, BNB: 0.0042, LTC: 0.0158, XRP: 2.52, ADA: 2.52, DOT: 0.21, DOGE: 15.8 },
  JPY: { BRL: 0.035, USD: 0.007, EUR: 0.0065, GBP: 0.0056, CNY: 0.051, RUB: 0.64, KRW: 9.12, ESP: 0.0065, BTC: 0.00000029, ETH: 0.0000043, USDT: 0.007, BNB: 0.000023, LTC: 0.000088, XRP: 0.014, ADA: 0.014, DOT: 0.00117, DOGE: 0.088 },
  CNY: { BRL: 0.69, USD: 0.14, EUR: 0.13, GBP: 0.11, JPY: 19.8, RUB: 12.7, KRW: 180.6, ESP: 0.13, BTC: 0.0000058, ETH: 0.000086, USDT: 0.14, BNB: 0.00046, LTC: 0.00174, XRP: 0.278, ADA: 0.278, DOT: 0.0232, DOGE: 1.74 },
  RUB: { BRL: 0.055, USD: 0.011, EUR: 0.01, GBP: 0.0087, JPY: 1.56, CNY: 0.079, KRW: 14.2, ESP: 0.01, BTC: 0.00000045, ETH: 0.0000068, USDT: 0.011, BNB: 0.000036, LTC: 0.000137, XRP: 0.022, ADA: 0.022, DOT: 0.00183, DOGE: 0.137 },
  KRW: { BRL: 0.0038, USD: 0.00077, EUR: 0.00072, GBP: 0.00061, JPY: 0.11, CNY: 0.0055, RUB: 0.07, ESP: 0.00072, BTC: 0.000000032, ETH: 0.00000048, USDT: 0.00077, BNB: 0.0000025, LTC: 0.0000096, XRP: 0.00154, ADA: 0.00154, DOT: 0.000128, DOGE: 0.0096 },
  ESP: { BRL: 5.37, USD: 1.07, EUR: 1, GBP: 0.85, JPY: 153, CNY: 7.74, RUB: 98.3, KRW: 1397, BTC: 0.000044, ETH: 0.00066, USDT: 1.07, BNB: 0.0036, LTC: 0.0134, XRP: 2.15, ADA: 2.15, DOT: 0.179, DOGE: 13.4 },
  BTC: { BRL: 120000, USD: 24000, EUR: 22320, GBP: 19008, JPY: 3420000, CNY: 172800, RUB: 2196000, KRW: 31200000, ESP: 22320, USDT: 24000, BNB: 80, LTC: 300, XRP: 48000, ADA: 48000, DOT: 4000, DOGE: 300000 },
  ETH: { BRL: 8000, USD: 1600, EUR: 1488, GBP: 1267, JPY: 228000, CNY: 11520, RUB: 146400, KRW: 2080000, ESP: 1488, USDT: 1600, BNB: 5.33, LTC: 20, XRP: 3200, ADA: 3200, DOT: 267, DOGE: 20000 },
  USDT: { BRL: 5.0, USD: 1, EUR: 0.93, GBP: 0.79, JPY: 142.5, CNY: 7.2, RUB: 91.5, KRW: 1300, ESP: 0.93, BTC: 0.000041, ETH: 0.00062, BNB: 0.0033, LTC: 0.0125, XRP: 2, ADA: 2, DOT: 0.167, DOGE: 12.5 },
  BNB: { BRL: 1500, USD: 300, EUR: 279, GBP: 237, JPY: 42750, CNY: 2160, RUB: 27450, KRW: 390000, ESP: 279, BTC: 0.0125, ETH: 0.1875, USDT: 300, LTC: 3.75, XRP: 600, ADA: 600, DOT: 50, DOGE: 3750 },
  LTC: { BRL: 400, USD: 80, EUR: 74.4, GBP: 63.36, JPY: 11400, CNY: 576, RUB: 7320, KRW: 104000, ESP: 74.4, BTC: 0.00333, ETH: 0.05, USDT: 80, BNB: 0.267, XRP: 160, ADA: 160, DOT: 13.33, DOGE: 1000 },
  XRP: { BRL: 2.5, USD: 0.5, EUR: 0.465, GBP: 0.396, JPY: 71.25, CNY: 3.6, RUB: 45.75, KRW: 650, ESP: 0.465, BTC: 0.0000208, ETH: 0.0003125, USDT: 0.5, BNB: 0.00167, LTC: 0.00625, ADA: 1, DOT: 0.0833, DOGE: 6.25 },
  ADA: { BRL: 2.5, USD: 0.5, EUR: 0.465, GBP: 0.396, JPY: 71.25, CNY: 3.6, RUB: 45.75, KRW: 650, ESP: 0.465, BTC: 0.0000208, ETH: 0.0003125, USDT: 0.5, BNB: 0.00167, LTC: 0.00625, XRP: 1, DOT: 0.0833, DOGE: 6.25 },
  DOT: { BRL: 30, USD: 6, EUR: 5.58, GBP: 4.75, JPY: 855, CNY: 43.2, RUB: 549, KRW: 7800, ESP: 5.58, BTC: 0.00025, ETH: 0.00375, USDT: 6, BNB: 0.02, LTC: 0.075, XRP: 12, ADA: 12, DOGE: 75 },
  DOGE: { BRL: 0.4, USD: 0.08, EUR: 0.0744, GBP: 0.0633, JPY: 11.4, CNY: 0.576, RUB: 7.32, KRW: 104, ESP: 0.0744, BTC: 0.00000333, ETH: 0.00005, USDT: 0.08, BNB: 0.000267, LTC: 0.001, XRP: 0.16, ADA: 0.16, DOT: 0.0133 }
}

const getCurrencySymbol = (code: string) => {
  const currency = [...CURRENCIES.FIAT, ...CURRENCIES.CRYPTO].find(c => c.code === code);
  return currency ? currency.symbol : '';
};

const convertCurrency = (amount: number, from: string, to: string) => {
  if (from === to) return amount;
  if (MOCK_RATES[from] && MOCK_RATES[from][to]) {
    return amount * MOCK_RATES[from][to];
  }
  if (MOCK_RATES[to] && MOCK_RATES[to][from]) {
    return amount / MOCK_RATES[to][from];
  }
  return 0;
};

const getExchangeRate = (from: string, to: string) => {
  return convertCurrency(1, from, to);
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("BRL")
  const [toCurrency, setToCurrency] = useState("USD")
  const [showCrypto, setShowCrypto] = useState(false)
  const [currentFromPrice, setCurrentFromPrice] = useState<number | null>(null);
  const [currentToPrice, setCurrentToPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrices = () => {
      const fromPrice = getExchangeRate("USD", fromCurrency);
      const toPrice = getExchangeRate("USD", toCurrency);
      setCurrentFromPrice(fromPrice);
      setCurrentToPrice(toPrice);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval);
  }, [fromCurrency, toCurrency]);

  const convertedAmount = amount ? convertCurrency(parseFloat(amount), fromCurrency, toCurrency) : 0

  const getCurrencyOptions = () => {
    if (showCrypto) {
      return [...CURRENCIES.CRYPTO, { code: "BRL", name: "Real Brasileiro", symbol: "R$" }, { code: "USD", name: "Dólar Americano", symbol: "$" }]
    }
    return CURRENCIES.FIAT
  }

  return (
    <Card className="backdrop-blur-sm bg-gray-900/50 border-gray-800">
      <CardContent className="p-6">
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Você envia</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowCrypto(!showCrypto)
                  setFromCurrency("BRL")
                  setToCurrency(showCrypto ? "USD" : "BTC")
                }}
                className="text-violet-400 hover:text-violet-300"
              >
                {showCrypto ? "Mostrar Moedas" : "Mostrar Cripto"}
              </Button>
            </div>
            <div className="flex gap-4">
              <Input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {getCurrencyOptions().map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {currentFromPrice !== null && currentToPrice !== null && (
              <div className="text-sm text-gray-400 mt-2">
                1 {fromCurrency} = {getExchangeRate(fromCurrency, toCurrency).toFixed(6)} {toCurrency}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const temp = fromCurrency
                setFromCurrency(toCurrency)
                setToCurrency(temp)
              }}
              className="text-violet-400 hover:text-violet-300"
            >
              <ArrowLeftRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="grid gap-4">
            <span className="text-sm text-gray-400">Você recebe</span>
            <div className="flex gap-4">
              <Input
                type="text"
                value={amount ? convertedAmount.toFixed(6) : ""}
                readOnly
                className="bg-gray-800 border-gray-700"
              />
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {getCurrencyOptions().map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>
              Taxa de câmbio: 1 {fromCurrency} = {getExchangeRate(fromCurrency, toCurrency).toFixed(6)}{" "}
              {toCurrency}
            </span>
            <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300">
              Atualizar taxa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
            Converter agora
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

