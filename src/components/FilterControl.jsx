import { useState } from 'react'

export default function FilterControl() {
  const [running, setRunning] = useState(true)

  return (
    <div className="panel">
      <p className="panel-title">Filter Air</p>

      <div className="control-row">
        <div>
          <div className="control-title">Pompa filter</div>
          <div className="control-sub">{running ? 'Menyala — aliran normal' : 'Mati'}</div>
        </div>
        <label className="toggle">
          <input type="checkbox" checked={running} onChange={() => setRunning((v) => !v)} />
          <span className="toggle-track"></span>
          <span className="toggle-thumb"></span>
        </label>
      </div>

      <div className="metric-pair">
        <div>
          <div className="metric-label">Debit air</div>
          <div className="metric-value">
            4.2 <span>L/menit</span>
          </div>
        </div>
        <div>
          <div className="metric-label">Waktu berjalan</div>
          <div className="metric-value">3j 42m</div>
        </div>
      </div>
    </div>
  )
}
