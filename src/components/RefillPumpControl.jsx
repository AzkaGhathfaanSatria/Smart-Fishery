import { useState } from 'react'

export default function RefillPumpControl({ waterLevel, disabled }) {
  const [override, setOverride] = useState(false)
  const autoTriggered = waterLevel < 20

  return (
    <div className="panel">
      <p className="panel-title">Pompa Pengisi (Relay 2)</p>

      <div className="control-row">
        <div>
          <div className="control-title">Status</div>
          <div className="control-sub">
            {disabled
              ? 'Dihentikan — emergency stop'
              : autoTriggered
                ? 'Aktif otomatis — level air < 20%'
                : 'Standby — level air normal'}
          </div>
        </div>
        <label className="toggle">
          <input
            type="checkbox"
            checked={(autoTriggered || override) && !disabled}
            disabled={disabled}
            onChange={() => setOverride((v) => !v)}
          />
          <span className="toggle-track"></span>
          <span className="toggle-thumb"></span>
        </label>
      </div>

      <div className="control-sub" style={{ marginTop: -8 }}>
        Override manual — isi air di luar kondisi otomatis
      </div>
    </div>
  )
}
