export type Category =
  | 'hortifruti'
  | 'laticinios'
  | 'carnes'
  | 'padaria'
  | 'limpeza'
  | 'bebidas'
  | 'outros'

export type Filter = 'todos' | 'pendentes' | 'comprados'

export interface ShoppingItem {
  id: string
  name: string
  quantity: number
  unit: string
  category: Category
  purchased: boolean
  createdAt: number
}

export interface NewItemInput {
  name: string
  quantity: number
  unit: string
  category: Category
}
