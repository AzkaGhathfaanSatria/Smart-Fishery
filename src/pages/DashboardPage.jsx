import Gauge from '../components/Gauge'
import StatusPill from '../components/StatusPill'
import HistoryChart from '../components/HistoryChart'
import FeedingControl from '../components/FeedingControl'
import CirculationPumpControl from '../components/CirculationPumpControl'
import RefillPumpControl from '../components/RefillPumpControl'
import EventLog from '../components/EventLog'
import { historyData } from '../data/mockData'
import { phZones, tempZones, turbidityZones, levelZones } from '../data/thresholds'

export default function DashboardPage({ emergencyStop }) {
  // Data dummy — nanti diganti dengan nilai realtime dari ESP32 lewat MQTT
  const phValue = 7.4
  const tempValue = 28.3
  const turbidityValue = 32
  const waterLevel = 78

  return (
    <div className="page-body">
      <section className="sensor-grid">
        <div className="panel">
          <p className="panel-title">pH Air</p>
          <Gauge
            label="Sensor pH"
            value={phValue}
            min={0}
            max={14}
            unit="pH"
            precision={2}
            zones={phZones}
          />
        </div>

        <div className="panel">
          <p className="panel-title">Suhu Air</p>
          <Gauge
            label="DS18B20"
            value={tempValue}
            min={15}
            max={40}
            unit="°C"
            precision={1}
            zones={tempZones}
          />
        </div>

        <div className="panel">
          <p className="panel-title">Kekeruhan</p>
          <Gauge
            label="Turbidity"
            value={turbidityValue}
            min={0}
            max={100}
            unit="NTU"
            precision={0}
            zones={turbidityZones}
          />
        </div>

        <div className="panel">
          <p className="panel-title">Level Air</p>
          <Gauge
            label="Water Level"
            value={waterLevel}
            min={0}
            max={100}
            unit="%"
            precision={0}
            zones={levelZones}
          />
        </div>
      </section>

      <section className="panel">
        <p className="panel-title">Ringkasan Status</p>
        <div className="status-list">
          <StatusPill label={`pH air normal (${phValue.toFixed(2)})`} tone="good" />
          <StatusPill label={`Suhu air normal (${tempValue.toFixed(1)}°C)`} tone="good" />
          <StatusPill label={`Kekeruhan normal (${turbidityValue} NTU)`} tone="good" />
          <StatusPill label={`Level air normal (${waterLevel}%)`} tone="good" />
          <StatusPill label="Pakan terjadwal berikutnya 17:00" tone="good" />
          <StatusPill
            label={emergencyStop ? 'Buzzer: emergency stop aktif' : 'Buzzer: tidak ada alarm'}
            tone={emergencyStop ? 'critical' : 'good'}
          />
        </div>
      </section>

      <section className="panel">
        <p className="panel-title">Riwayat pH & Suhu — 24 Jam Terakhir</p>
        <HistoryChart data={historyData} />
      </section>

      <section className="grid-row-controls">
        <FeedingControl disabled={emergencyStop} />
        <CirculationPumpControl disabled={emergencyStop} />
        <RefillPumpControl waterLevel={waterLevel} disabled={emergencyStop} />
      </section>

      <EventLog />
    </div>
  )
}
