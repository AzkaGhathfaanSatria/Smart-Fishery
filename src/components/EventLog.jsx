const events = [
  { time: '17:32', text: 'Filter menyala otomatis setelah jadwal pemeliharaan', tone: 'good' },
  { time: '17:00', text: 'Pakan diberikan sesuai jadwal (17:00)', tone: 'good' },
  { time: '14:15', text: 'pH sempat naik ke 8.7, kembali normal dalam 6 menit', tone: 'warn' },
  { time: '12:30', text: 'Pakan diberikan sesuai jadwal (12:30)', tone: 'good' },
  { time: '09:10', text: 'Suhu air 25.1°C, mendekati batas bawah normal', tone: 'warn' },
]

const toneVar = { good: 'var(--good)', warn: 'var(--warn)', critical: 'var(--critical)' }

export default function EventLog() {
  return (
    <div className="panel">
      <p className="panel-title">Riwayat Aktivitas</p>
      <div className="event-log">
        {events.map((e, i) => (
          <div className="event-item" key={i}>
            <span className="event-time">{e.time}</span>
            <span className="event-dot" style={{ background: toneVar[e.tone] }} />
            <span className="event-text">{e.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
