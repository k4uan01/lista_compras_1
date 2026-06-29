import type { Category, ShoppingItem } from '../types'

export function createItemId(): string {
  if (globalThis.crypto?.randomUUID) {
    try {
      return globalThis.crypto.randomUUID()
    } catch {
      // HTTP em IP da rede local não é "secure context"
    }
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = Math.trunc(Math.random() * 16)
    const value = char === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
}

export interface DbShoppingItem {
  id: string
  name: string
  quantity: number
  unit: string
  category: string
  purchased: boolean
  created_at: number
}

export function fromDb(row: DbShoppingItem): ShoppingItem {
  return {
    id: row.id,
    name: row.name,
    quantity: row.quantity,
    unit: row.unit,
    category: row.category as Category,
    purchased: row.purchased,
    createdAt: row.created_at,
  }
}

export function toDbInsert(item: ShoppingItem): DbShoppingItem {
  return {
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    category: item.category,
    purchased: item.purchased,
    created_at: item.createdAt,
  }
}
