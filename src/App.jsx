import Gauge from './components/Gauge'
import StatusPill from './components/StatusPill'
import HistoryChart from './components/HistoryChart'
import FeedingControl from './components/FeedingControl'
import FilterControl from './components/FilterControl'
import EventLog from './components/EventLog'
import { historyData } from './data/mockData'
import './App.css'

const phZones = [
  { from: 0, to: 6, color: '#C9482E', label: 'Kritis' },
  { from: 6, to: 6.5, color: '#C98A2E', label: 'Waspada' },
  { from: 6.5, to: 8.5, color: '#2E9E6B', label: 'Normal' },
  { from: 8.5, to: 9, color: '#C98A2E', label: 'Waspada' },
  { from: 9, to: 14, color: '#C9482E', label: 'Kritis' },
]

const tempZones = [
  { from: 15, to: 24, color: '#C9482E', label: 'Kritis' },
  { from: 24, to: 26, color: '#C98A2E', label: 'Waspada' },
  { from: 26, to: 30, color: '#2E9E6B', label: 'Normal' },
  { from: 30, to: 32, color: '#C98A2E', label: 'Waspada' },
  { from: 32, to: 40, color: '#C9482E', label: 'Kritis' },
]

function App() {
  // Data dummy — nanti diganti dengan nilai realtime dari MQTT
  const phValue = 7.4
  const tempValue = 28.3
  const timeLabel = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <div className="brand">SMART FISHERY</div>
          <div className="pond-name">Kolam A1</div>
        </div>
        <div className="header-meta">
          <span className="status-dot" />
          <span className="online-label">Online</span>
          <span className="timestamp">{timeLabel}</span>
        </div>
      </header>

      <section className="grid-row-top">
        <div className="panel">
          <p className="panel-title">Kualitas Air — pH</p>
          <Gauge
            label="pH Air"
            value={phValue}
            min={0}
            max={14}
            unit="pH"
            precision={2}
            zones={phZones}
          />
        </div>

        <div className="panel">
          <p className="panel-title">Kualitas Air — Suhu</p>
          <Gauge
            label="Suhu Air"
            value={tempValue}
            min={15}
            max={40}
            unit="°C"
            precision={1}
            zones={tempZones}
          />
        </div>

        <div className="panel">
          <p className="panel-title">Ringkasan Status</p>
          <div className="status-list">
            <StatusPill label={`pH air normal (${phValue.toFixed(2)})`} tone="good" />
            <StatusPill label={`Suhu air normal (${tempValue.toFixed(1)}°C)`} tone="good" />
            <StatusPill label="Pakan terjadwal berikutnya 17:30" tone="good" />
            <StatusPill label="Filter menyala, aliran normal" tone="good" />
          </div>
        </div>
      </section>

      <section className="panel">
        <p className="panel-title">Riwayat pH & Suhu — 24 Jam Terakhir</p>
        <HistoryChart data={historyData} />
      </section>

      <section className="grid-row-controls">
        <FeedingControl />
        <FilterControl />
      </section>

      <EventLog />
    </div>
  )
}

export default App
