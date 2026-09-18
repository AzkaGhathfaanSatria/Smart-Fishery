import { useState } from 'react'

const schedule = ['07:00', '12:00', '17:00']

export default function FeedingControl({ disabled }) {
  const [auto, setAuto] = useState(true)

  return (
    <div className="panel">
      <p className="panel-title">Pakan Otomatis</p>

      <div className="control-row">
        <div>
          <div className="control-title">Mode otomatis</div>
          <div className="control-sub">
            {disabled
              ? 'Dihentikan — emergency stop'
              : auto
                ? 'Aktif — mengikuti jadwal RTC'
                : 'Nonaktif — kontrol manual'}
          </div>
        </div>
        <label className="toggle">
          <input
            type="checkbox"
            checked={auto && !disabled}
            disabled={disabled}
            onChange={() => setAuto((v) => !v)}
          />
          <span className="toggle-track"></span>
          <span className="toggle-thumb"></span>
        </label>
      </div>

      <div className="schedule-list">
        {schedule.map((t) => (
          <span className="schedule-chip" key={t}>
            {t}
          </span>
        ))}
      </div>

      <button type="button" className="btn-primary" style={{ marginTop: 18 }} disabled={disabled}>
        Beri pakan sekarang
      </button>
    </div>
  )
}
