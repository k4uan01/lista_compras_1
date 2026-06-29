interface StatsBarProps {
  total: number
  pending: number
  purchased: number
  onClearPurchased: () => void
}

export function StatsBar({
  total,
  pending,
  purchased,
  onClearPurchased,
}: StatsBarProps) {
  const progress = total > 0 ? Math.round((purchased / total) * 100) : 0

  return (
    <div className="stats-bar">
      <div className="stats-bar__counts">
        <div className="stat">
          <span className="stat__value">{pending}</span>
          <span className="stat__label">Pendentes</span>
        </div>
        <div className="stat">
          <span className="stat__value">{purchased}</span>
          <span className="stat__label">Comprados</span>
        </div>
        <div className="stat">
          <span className="stat__value">{total}</span>
          <span className="stat__label">Total</span>
        </div>
      </div>

      <div className="stats-bar__progress">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${progress}% da lista concluída`}
          />
        </div>
        <span className="progress-label">{progress}% concluído</span>
      </div>

      {purchased > 0 && (
        <button
          type="button"
          className="btn-ghost"
          onClick={onClearPurchased}
        >
          Limpar comprados
        </button>
      )}
    </div>
  )
}
