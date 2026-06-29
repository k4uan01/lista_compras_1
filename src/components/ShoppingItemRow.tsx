import { getCategoryMeta } from '../constants'
import type { ShoppingItem } from '../types'

interface ShoppingItemRowProps {
  item: ShoppingItem
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

export function ShoppingItemRow({
  item,
  onToggle,
  onRemove,
}: ShoppingItemRowProps) {
  const category = getCategoryMeta(item.category)

  return (
    <li className={`item-row ${item.purchased ? 'item-row--purchased' : ''}`}>
      <label className="item-row__check">
        <input
          type="checkbox"
          checked={item.purchased}
          onChange={() => onToggle(item.id)}
        />
        <span className="item-row__checkbox" aria-hidden="true" />
      </label>

      <div className="item-row__content">
        <span className="item-row__name">{item.name}</span>
        <span className="item-row__meta">
          <span className="item-row__qty">
            {item.quantity} {item.unit}
          </span>
          <span className="item-row__category">
            {category.emoji} {category.label}
          </span>
        </span>
      </div>

      <button
        type="button"
        className="item-row__remove"
        onClick={() => onRemove(item.id)}
        aria-label={`Remover ${item.name}`}
      >
        ✕
      </button>
    </li>
  )
}
