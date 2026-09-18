import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import EmergencyStopButton from './components/EmergencyStopButton'
import DashboardPage from './pages/DashboardPage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'
import './App.css'

function App() {
  const [emergencyStop, setEmergencyStop] = useState(false)

  const timeLabel = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <div className="brand">SMART FISHERY — POSEIDON</div>
          <div className="pond-name">Kolam A1</div>
        </div>
        <div className="header-meta">
          <span className="status-dot" />
          <span className="online-label">Online</span>
          <span className="timestamp">{timeLabel}</span>
          <EmergencyStopButton
            active={emergencyStop}
            onToggle={() => setEmergencyStop((v) => !v)}
          />
        </div>
      </header>

      {emergencyStop && (
        <div className="emergency-banner">
          🚨 EMERGENCY STOP AKTIF — Servo pakan, pompa sirkulasi, dan pompa pengisi dihentikan
        </div>
      )}

      <NavBar />

      <Routes>
        <Route path="/" element={<DashboardPage emergencyStop={emergencyStop} />} />
        <Route path="/riwayat" element={<HistoryPage />} />
        <Route path="/pengaturan" element={<SettingsPage />} />
      </Routes>
    </div>
  )
}

export default App
