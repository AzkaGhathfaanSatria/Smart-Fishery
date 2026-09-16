import { useState } from 'react'

const schedule = ['07:00', '12:30', '17:30']

export default function FeedingControl() {
  const [auto, setAuto] = useState(true)

  return (
    <div className="panel">
      <p className="panel-title">Pakan Otomatis</p>

      <div className="control-row">
        <div>
          <div className="control-title">Mode otomatis</div>
          <div className="control-sub">
            {auto ? 'Aktif — mengikuti jadwal' : 'Nonaktif — kontrol manual'}
          </div>
        </div>
        <label className="toggle">
          <input type="checkbox" checked={auto} onChange={() => setAuto((v) => !v)} />
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

      <button type="button" className="btn-primary" style={{ marginTop: 18 }}>
        Beri pakan sekarang
      </button>
    </div>
  )
}
