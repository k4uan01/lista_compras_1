import type { Filter } from '../types'

interface FilterBarProps {
  filter: Filter
  search: string
  onFilterChange: (filter: Filter) => void
  onSearchChange: (search: string) => void
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'pendentes', label: 'Pendentes' },
  { value: 'comprados', label: 'Comprados' },
]

export function FilterBar({
  filter,
  search,
  onFilterChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-tabs" role="tablist" aria-label="Filtrar itens">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            role="tab"
            aria-selected={filter === f.value}
            className={`filter-tab ${filter === f.value ? 'filter-tab--active' : ''}`}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="search-box">
        <label className="sr-only" htmlFor="search-items">
          Buscar itens
        </label>
        <input
          id="search-items"
          type="search"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  )
}
