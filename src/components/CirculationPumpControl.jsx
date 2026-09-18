import { useState } from 'react'

export default function CirculationPumpControl({ disabled }) {
  const [override, setOverride] = useState(false)

  return (
    <div className="panel">
      <p className="panel-title">Pompa Sirkulasi (Relay 1)</p>

      <div className="control-row">
        <div>
          <div className="control-title">Status</div>
          <div className="control-sub">
            {disabled ? 'Dihentikan — emergency stop' : 'Otomatis 3 detik tiap siklus pakan'}
          </div>
        </div>
        <label className="toggle">
          <input
            type="checkbox"
            checked={override && !disabled}
            disabled={disabled}
            onChange={() => setOverride((v) => !v)}
          />
          <span className="toggle-track"></span>
          <span className="toggle-thumb"></span>
        </label>
      </div>

      <div className="control-sub" style={{ marginTop: -8 }}>
        Override manual — paksa nyala di luar siklus pakan
      </div>
    </div>
  )
}
