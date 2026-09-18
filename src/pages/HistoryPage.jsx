import { useMemo, useState } from 'react'
import { logData } from '../data/mockLogData'
import { defaultThresholds } from '../data/thresholds'

function formatDate(d) {
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatTime(d) {
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

function toDateInputValue(d) {
  return d.toISOString().slice(0, 10)
}

function isOutOfRange(row) {
  const t = defaultThresholds
  return (
    row.ph < t.phMin ||
    row.ph > t.phMax ||
    row.temp < t.tempMin ||
    row.temp > t.tempMax ||
    row.turbidity > t.turbidityMax ||
    row.level < t.levelMin
  )
}

export default function HistoryPage() {
  const minDate = logData[0].timestamp
  const maxDate = logData[logData.length - 1].timestamp

  const [fromDate, setFromDate] = useState(toDateInputValue(minDate))
  const [toDate, setToDate] = useState(toDateInputValue(maxDate))
  const [onlyAlerts, setOnlyAlerts] = useState(false)

  const filtered = useMemo(() => {
    const from = new Date(`${fromDate}T00:00:00`)
    const to = new Date(`${toDate}T23:59:59`)
    return logData.filter((row) => {
      const inRange = row.timestamp >= from && row.timestamp <= to
      if (!inRange) return false
      return onlyAlerts ? isOutOfRange(row) : true
    })
  }, [fromDate, toDate, onlyAlerts])

  function exportCsv() {
    const header = 'Tanggal,Waktu,pH,Suhu (C),Kekeruhan (NTU),Level Air (%)\n'
    const rows = filtered
      .map((r) =>
        [formatDate(r.timestamp), formatTime(r.timestamp), r.ph, r.temp, r.turbidity, r.level].join(
          ','
        )
      )
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `smart-fishery-log-${fromDate}_${toDate}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page-body">
      <section className="panel">
        <p className="panel-title">Filter Data</p>
        <div className="filter-row">
          <div className="filter-field">
            <label className="control-sub">Dari tanggal</label>
            <input
              type="date"
              className="input-field"
              value={fromDate}
              min={toDateInputValue(minDate)}
              max={toDateInputValue(maxDate)}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="filter-field">
            <label className="control-sub">Sampai tanggal</label>
            <input
              type="date"
              className="input-field"
              value={toDate}
              min={toDateInputValue(minDate)}
              max={toDateInputValue(maxDate)}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={onlyAlerts}
              onChange={() => setOnlyAlerts((v) => !v)}
            />
            Hanya data di luar ambang normal
          </label>
          <button
            type="button"
            className="btn-primary"
            onClick={exportCsv}
            style={{ marginLeft: 'auto' }}
          >
            Export CSV
          </button>
        </div>
      </section>

      <section className="panel">
        <p className="panel-title">Log Data Sensor ({filtered.length} baris)</p>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Waktu</th>
                <th>pH</th>
                <th>Suhu (°C)</th>
                <th>Kekeruhan (NTU)</th>
                <th>Level Air (%)</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={i} className={isOutOfRange(row) ? 'row-alert' : ''}>
                  <td>{formatDate(row.timestamp)}</td>
                  <td className="mono">{formatTime(row.timestamp)}</td>
                  <td className="mono">{row.ph.toFixed(2)}</td>
                  <td className="mono">{row.temp.toFixed(1)}</td>
                  <td className="mono">{row.turbidity}</td>
                  <td className="mono">{row.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="control-sub" style={{ padding: '16px 0' }}>
              Tidak ada data pada rentang ini.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
