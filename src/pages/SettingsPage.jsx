import { useState } from 'react'
import { defaultThresholds, defaultSchedule, defaultMqtt } from '../data/thresholds'

export default function SettingsPage() {
  const [schedule, setSchedule] = useState(defaultSchedule)
  const [thresholds, setThresholds] = useState(defaultThresholds)
  const [mqtt, setMqtt] = useState(defaultMqtt)
  const [saved, setSaved] = useState(false)

  function updateSchedule(index, value) {
    const next = [...schedule]
    next[index] = value
    setSchedule(next)
    setSaved(false)
  }

  function updateThreshold(key, value) {
    setThresholds((t) => ({ ...t, [key]: value }))
    setSaved(false)
  }

  function updateMqtt(key, value) {
    setMqtt((m) => ({ ...m, [key]: value }))
    setSaved(false)
  }

  function handleSave(e) {
    e.preventDefault()
    setSaved(true)
    // TODO: publish pengaturan ini ke topic konfigurasi MQTT / simpan ke backend
  }

  return (
    <form className="page-body" onSubmit={handleSave}>
      <section className="panel">
        <p className="panel-title">Jadwal Pakan Otomatis</p>
        <div className="filter-row">
          {schedule.map((t, i) => (
            <div className="filter-field" key={i}>
              <label className="control-sub">Jadwal {i + 1}</label>
              <input
                type="time"
                className="input-field"
                value={t}
                onChange={(e) => updateSchedule(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <p className="panel-title">Ambang Batas Kualitas Air</p>
        <div className="settings-grid">
          <div className="filter-field">
            <label className="control-sub">pH minimum</label>
            <input
              type="number"
              step="0.1"
              className="input-field"
              value={thresholds.phMin}
              onChange={(e) => updateThreshold('phMin', parseFloat(e.target.value))}
            />
          </div>
          <div className="filter-field">
            <label className="control-sub">pH maksimum</label>
            <input
              type="number"
              step="0.1"
              className="input-field"
              value={thresholds.phMax}
              onChange={(e) => updateThreshold('phMax', parseFloat(e.target.value))}
            />
          </div>
          <div className="filter-field">
            <label className="control-sub">Suhu minimum (°C)</label>
            <input
              type="number"
              step="0.5"
              className="input-field"
              value={thresholds.tempMin}
              onChange={(e) => updateThreshold('tempMin', parseFloat(e.target.value))}
            />
          </div>
          <div className="filter-field">
            <label className="control-sub">Suhu maksimum (°C)</label>
            <input
              type="number"
              step="0.5"
              className="input-field"
              value={thresholds.tempMax}
              onChange={(e) => updateThreshold('tempMax', parseFloat(e.target.value))}
            />
          </div>
          <div className="filter-field">
            <label className="control-sub">Kekeruhan maksimum (NTU)</label>
            <input
              type="number"
              step="1"
              className="input-field"
              value={thresholds.turbidityMax}
              onChange={(e) => updateThreshold('turbidityMax', parseFloat(e.target.value))}
            />
          </div>
          <div className="filter-field">
            <label className="control-sub">Level air minimum (%)</label>
            <input
              type="number"
              step="1"
              className="input-field"
              value={thresholds.levelMin}
              onChange={(e) => updateThreshold('levelMin', parseFloat(e.target.value))}
            />
          </div>
        </div>
      </section>

      <section className="panel">
        <p className="panel-title">Koneksi MQTT</p>
        <div className="settings-grid">
          <div className="filter-field" style={{ gridColumn: 'span 2' }}>
            <label className="control-sub">Broker host</label>
            <input
              type="text"
              className="input-field"
              value={mqtt.broker}
              onChange={(e) => updateMqtt('broker', e.target.value)}
            />
          </div>
          <div className="filter-field">
            <label className="control-sub">Port (WebSocket)</label>
            <input
              type="number"
              className="input-field"
              value={mqtt.port}
              onChange={(e) => updateMqtt('port', parseInt(e.target.value, 10))}
            />
          </div>
          <div className="filter-field" style={{ gridColumn: 'span 2' }}>
            <label className="control-sub">Topic prefix</label>
            <input
              type="text"
              className="input-field"
              value={mqtt.topicPrefix}
              onChange={(e) => updateMqtt('topicPrefix', e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="settings-actions">
        <button type="submit" className="btn-primary">
          Simpan Pengaturan
        </button>
        {saved && (
          <span className="save-confirm">Tersimpan (lokal — belum terhubung ke perangkat)</span>
        )}
      </div>
    </form>
  )
}
