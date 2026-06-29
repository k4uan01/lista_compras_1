import { AddItemForm } from './components/AddItemForm'
import { FilterBar } from './components/FilterBar'
import { ShoppingList } from './components/ShoppingList'
import { StatsBar } from './components/StatsBar'
import { useShoppingList } from './hooks/useShoppingList'
import './App.css'

function App() {
  const {
    items,
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
  } = useShoppingList()

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__badge">Mercado</div>
        <h1>Lista de Compras</h1>
        <p className="app-header__subtitle">
          Organize suas compras, marque o que já pegou e não esqueça nada.
        </p>
      </header>

      <main className="app-main">
        {error && (
          <div className="app-status app-status--error" role="alert">
            Erro ao conectar com o Supabase: {error}
          </div>
        )}

        {loading ? (
          <p className="app-status">Carregando lista...</p>
        ) : (
          <>
        <section className="panel panel--form" aria-label="Adicionar item">
          <AddItemForm onAdd={addItem} />
        </section>

        <section className="panel panel--list" aria-label="Lista de itens">
          <StatsBar
            total={stats.total}
            pending={stats.pending}
            purchased={stats.purchased}
            onClearPurchased={clearPurchased}
          />

          <FilterBar
            filter={filter}
            search={search}
            onFilterChange={setFilter}
            onSearchChange={setSearch}
          />

          <ShoppingList
            items={items}
            onToggle={togglePurchased}
            onRemove={removeItem}
          />
        </section>
          </>
        )}
      </main>

      <footer className="app-footer">
        Dados sincronizados via Supabase na rede interna
      </footer>
    </div>
  )
}

export default App
