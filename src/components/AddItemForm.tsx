import { type FormEvent, useState } from 'react'
import { CATEGORIES, UNITS } from '../constants'
import type { Category } from '../types'

interface AddItemFormProps {
  onAdd: (input: {
    name: string
    quantity: number
    unit: string
    category: Category
  }) => boolean | Promise<boolean>
}

export function AddItemForm({ onAdd }: AddItemFormProps) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState('un')
  const [category, setCategory] = useState<Category>('outros')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const added = await onAdd({ name, quantity, unit, category })
    if (added) {
      setName('')
      setQuantity(1)
      setUnit('un')
      setCategory('outros')
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-form__main">
        <label className="sr-only" htmlFor="item-name">
          Nome do item
        </label>
        <input
          id="item-name"
          type="text"
          placeholder="O que você precisa comprar?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" disabled={!name.trim()}>
          Adicionar
        </button>
      </div>

      <div className="add-form__details">
        <div className="field-group">
          <label htmlFor="item-qty">Qtd.</label>
          <input
            id="item-qty"
            type="number"
            min={1}
            max={999}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value) || 1)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="item-unit">Unidade</label>
          <select
            id="item-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            {UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group field-group--grow">
          <label htmlFor="item-category">Categoria</label>
          <select
            id="item-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  )
}
