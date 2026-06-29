import type { Category, ShoppingItem } from '../types'

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
