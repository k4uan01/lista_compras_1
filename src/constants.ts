import type { Category } from './types'

export const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: 'hortifruti', label: 'Hortifruti', emoji: '🥬' },
  { value: 'laticinios', label: 'Laticínios', emoji: '🧀' },
  { value: 'carnes', label: 'Carnes', emoji: '🥩' },
  { value: 'padaria', label: 'Padaria', emoji: '🍞' },
  { value: 'limpeza', label: 'Limpeza', emoji: '🧹' },
  { value: 'bebidas', label: 'Bebidas', emoji: '🥤' },
  { value: 'outros', label: 'Outros', emoji: '📦' },
]

export const UNITS = ['un', 'kg', 'g', 'L', 'ml', 'pct', 'cx']

export function getCategoryMeta(category: Category) {
  return CATEGORIES.find((c) => c.value === category) ?? CATEGORIES[6]
}
