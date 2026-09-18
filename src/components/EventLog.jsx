const events = [
  { time: '17:00', text: 'Pakan diberikan sesuai jadwal RTC (17:00), pompa sirkulasi menyala 3 detik', tone: 'good' },
  { time: '15:42', text: 'Level air turun ke 18%, pompa pengisi (Relay 2) menyala otomatis', tone: 'warn' },
  { time: '14:15', text: 'pH sempat naik ke 8.7, kembali normal dalam 6 menit', tone: 'warn' },
  { time: '12:00', text: 'Pakan diberikan sesuai jadwal RTC (12:00)', tone: 'good' },
  { time: '09:10', text: 'Kekeruhan sempat 48 NTU, mendekati ambang batas 50 NTU', tone: 'warn' },
  { time: '07:00', text: 'Pakan diberikan sesuai jadwal RTC (07:00)', tone: 'good' },
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
