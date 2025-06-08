'use client'

import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'

interface SummaryCardsProps {
  balance: number
  monthlyIncome: number
  monthlyExpense: number
}

export default function SummaryCards({ balance, monthlyIncome, monthlyExpense }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* 残高カード */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">残高</p>
            <p className={`text-2xl font-bold ${
              balance >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ¥{balance.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Wallet className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* 今月の収入カード */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">今月の収入</p>
            <p className="text-2xl font-bold text-green-600">
              ¥{monthlyIncome.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* 今月の支出カード */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">今月の支出</p>
            <p className="text-2xl font-bold text-red-600">
              ¥{monthlyExpense.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <TrendingDown className="h-6 w-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  )
}