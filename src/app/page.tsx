'use client'

import { useTransactions } from '@/hooks/useTransactions'
import SummaryCards from '@/components/SummaryCards'
import TransactionForm from '@/components/TransactionForm'
import TransactionList from '@/components/TransactionList'

export default function Home() {
  const {
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    balance,
    monthlyIncome,
    monthlyExpense
  } = useTransactions()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">家計簿アプリ</h1>
          <p className="text-gray-600 mt-1">収入と支出を管理しましょう</p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* エラー表示 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">エラーが発生しました</p>
            <p>{error}</p>
          </div>
        )}

        {/* サマリーカード */}
        <SummaryCards
          balance={balance}
          monthlyIncome={monthlyIncome}
          monthlyExpense={monthlyExpense}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 取引追加フォーム */}
          <div>
            <TransactionForm onSubmit={addTransaction} loading={loading} />
          </div>

          {/* 取引履歴 */}
          <div>
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
              loading={loading}
            />
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; 2024 家計簿アプリ. シンプルで使いやすい家計管理ツール</p>
        </div>
      </footer>
    </div>
  )
}