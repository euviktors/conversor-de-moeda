import { Coins } from 'lucide-react'
import CurrencyConverter from "@/components/currency-converter"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <header className="border-b border-gray-800">
          <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coins className="h-6 w-6 text-gradient-to-r from-violet-500 to-purple-500" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-purple-500">
                ConvertCoin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Cotações
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Criptomoedas
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Sobre
              </a>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-purple-500">
              Conversor de Moedas
            </h1>
            <p className="text-gray-400">
              Converta entre moedas fiduciárias e criptomoedas com taxas em tempo real
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <CurrencyConverter />
          </div>
        </main>

        <footer className="border-t border-gray-800 mt-auto">
          <div className="container mx-auto px-4 py-6 text-center text-gray-400">
            Desenvolvido por Viktor Dev
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

