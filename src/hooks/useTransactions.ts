import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Transaction, TransactionInput } from '@/types'

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 取引データを取得
  const fetchTransactions = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })
      
      if (error) throw error
      
      setTransactions(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : '取引データの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  // 取引を追加
  const addTransaction = async (transaction: TransactionInput) => {
    try {
      setError(null)
      
      const { data, error } = await supabase
        .from('transactions')
        .insert([transaction])
        .select()
        .single()
      
      if (error) throw error
      
      setTransactions(prev => [data, ...prev])
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '取引の追加に失敗しました'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // 取引を削除
  const deleteTransaction = async (id: string) => {
    try {
      setError(null)
      
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      setTransactions(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '取引の削除に失敗しました'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // 残高を計算
  const calculateBalance = () => {
    return transactions.reduce((balance, transaction) => {
      return transaction.type === 'income' 
        ? balance + transaction.amount 
        : balance - transaction.amount
    }, 0)
  }

  // 月別サマリーを計算
  const getMonthlyTotal = (type: 'income' | 'expense') => {
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
    return transactions
      .filter(t => t.type === type && t.date.startsWith(currentMonth))
      .reduce((total, t) => total + t.amount, 0)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return {
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    refreshTransactions: fetchTransactions,
    balance: calculateBalance(),
    monthlyIncome: getMonthlyTotal('income'),
    monthlyExpense: getMonthlyTotal('expense')
  }
}