export interface Transaction {
  id: string
  amount: number
  description: string
  category: string
  type: 'income' | 'expense'
  date: string
  created_at: string
  updated_at: string
}

export type TransactionInput = Omit<Transaction, 'id' | 'created_at' | 'updated_at'>

export const CATEGORIES = {
  income: ['給与', 'ボーナス', 'その他収入'],
  expense: ['食費', '交通費', '光熱費', '通信費', '娯楽費', '医療費', 'その他支出']
} as const