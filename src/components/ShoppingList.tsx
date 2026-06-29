import type { ShoppingItem } from '../types'
import { ShoppingItemRow } from './ShoppingItemRow'

interface ShoppingListProps {
  items: ShoppingItem[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

export function ShoppingList({ items, onToggle, onRemove }: ShoppingListProps) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon" aria-hidden="true">
          🛒
        </span>
        <p className="empty-state__title">Nenhum item por aqui</p>
        <p className="empty-state__text">
          Adicione produtos à sua lista ou ajuste os filtros de busca.
        </p>
      </div>
    )
  }

  return (
    <ul className="shopping-list">
      {items.map((item) => (
        <ShoppingItemRow
          key={item.id}
          item={item}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}
