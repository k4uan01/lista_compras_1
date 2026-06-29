import { useCallback, useEffect, useMemo, useState } from 'react'
import { fromDb, toDbInsert } from '../lib/shoppingItems'
import { supabase } from '../lib/supabase'
import type { Filter, NewItemInput, ShoppingItem } from '../types'

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('todos')
  const [search, setSearch] = useState('')

  const refresh = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from('shopping_items')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
      return
    }

    setError(null)
    setItems(data.map(fromDb))
  }, [])

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      await refresh()
      if (active) setLoading(false)
    }

    void load()

    const channel = supabase
      .channel('shopping_items')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'shopping_items' },
        () => refresh(),
      )
      .subscribe()

    return () => {
      active = false
      void supabase.removeChannel(channel)
    }
  }, [refresh])

  const addItem = useCallback(
    async (input: NewItemInput) => {
      const trimmed = input.name.trim()
      if (!trimmed) return false

      const item: ShoppingItem = {
        id: crypto.randomUUID(),
        name: trimmed,
        quantity: Math.max(1, input.quantity),
        unit: input.unit,
        category: input.category,
        purchased: false,
        createdAt: Date.now(),
      }

      const { error: insertError } = await supabase
        .from('shopping_items')
        .insert(toDbInsert(item))

      if (insertError) {
        setError(insertError.message)
        return false
      }

      await refresh()
      return true
    },
    [refresh],
  )

  const togglePurchased = useCallback(
    async (id: string) => {
      const item = items.find((i) => i.id === id)
      if (!item) return

      const { error: updateError } = await supabase
        .from('shopping_items')
        .update({ purchased: !item.purchased })
        .eq('id', id)

      if (updateError) {
        setError(updateError.message)
        return
      }

      await refresh()
    },
    [items, refresh],
  )

  const removeItem = useCallback(
    async (id: string) => {
      const { error: deleteError } = await supabase
        .from('shopping_items')
        .delete()
        .eq('id', id)

      if (deleteError) {
        setError(deleteError.message)
        return
      }

      await refresh()
    },
    [refresh],
  )

  const clearPurchased = useCallback(async () => {
    const { error: deleteError } = await supabase
      .from('shopping_items')
      .delete()
      .eq('purchased', true)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    await refresh()
  }, [refresh])

  const stats = useMemo(() => {
    const total = items.length
    const purchased = items.filter((i) => i.purchased).length
    const pending = total - purchased
    return { total, purchased, pending }
  }, [items])

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()

    return items
      .filter((item) => {
        if (filter === 'pendentes' && item.purchased) return false
        if (filter === 'comprados' && !item.purchased) return false
        if (query && !item.name.toLowerCase().includes(query)) return false
        return true
      })
      .sort((a, b) => {
        if (a.purchased !== b.purchased) return a.purchased ? 1 : -1
        return b.createdAt - a.createdAt
      })
  }, [items, filter, search])

  return {
    items: filteredItems,
    filter,
    search,
    stats,
    loading,
    error,
    setFilter,
    setSearch,
    addItem,
    togglePurchased,
    removeItem,
    clearPurchased,
  }
}
