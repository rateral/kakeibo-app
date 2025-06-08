'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { TransactionInput, CATEGORIES } from '@/types'

interface TransactionFormProps {
  onSubmit: (transaction: TransactionInput) => Promise<void>
  loading?: boolean
}

export default function TransactionForm({ onSubmit, loading = false }: TransactionFormProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount || !description || !category) {
      alert('すべての項目を入力してください')
      return
    }

    try {
      await onSubmit({
        amount: parseInt(amount),
        description,
        category,
        type,
        date
      })
      
      // フォームをリセット
      setAmount('')
      setDescription('')
      setCategory('')
    } catch (error) {
      console.error('取引の追加でエラーが発生しました:', error)
    }
  }

  const categories = CATEGORIES[type]

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">取引を追加</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* タイプ選択 */}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => {
              setType('income')
              setCategory('')
            }}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
              type === 'income'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Plus size={20} />
            <span>収入</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setType('expense')
              setCategory('')
            }}
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
              type === 'expense'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Minus size={20} />
            <span>支出</span>
          </button>
        </div>

        {/* 金額入力 */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            金額
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
            min="0"
            required
          />
        </div>

        {/* カテゴリ選択 */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            カテゴリ
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">カテゴリを選択</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* 説明入力 */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            説明
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="取引の詳細を入力"
            required
          />
        </div>

        {/* 日付入力 */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            日付
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '追加中...' : '取引を追加'}
        </button>
      </form>
    </div>
  )
}