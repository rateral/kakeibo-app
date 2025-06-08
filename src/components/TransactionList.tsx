'use client'

import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Transaction } from '@/types'

interface TransactionListProps {
  transactions: Transaction[]
  onDelete: (id: string) => Promise<void>
  loading?: boolean
}

export default function TransactionList({ transactions, onDelete, loading = false }: TransactionListProps) {
  const handleDelete = async (id: string, description: string) => {
    if (confirm(`「${description}」を削除しますか？`)) {
      try {
        await onDelete(id)
      } catch (error) {
        alert('削除に失敗しました')
      }
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">取引履歴</h2>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">取引履歴</h2>
        <div className="text-center py-8 text-gray-500">
          まだ取引が登録されていません
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">取引履歴</h2>
      
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              {/* アイコン */}
              <div className={`p-2 rounded-full ${
                transaction.type === 'income' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {transaction.type === 'income' ? (
                  <Plus size={16} />
                ) : (
                  <Minus size={16} />
                )}
              </div>
              
              {/* 取引情報 */}
              <div>
                <div className="font-medium text-gray-900">
                  {transaction.description}
                </div>
                <div className="text-sm text-gray-500">
                  {transaction.category} • {format(new Date(transaction.date), 'MM/dd (E)', { locale: ja })}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* 金額 */}
              <div className={`font-semibold ${
                transaction.type === 'income' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}¥{transaction.amount.toLocaleString()}
              </div>
              
              {/* 削除ボタン */}
              <button
                onClick={() => handleDelete(transaction.id, transaction.description)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="削除"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}