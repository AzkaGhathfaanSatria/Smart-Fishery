export default function EmergencyStopButton({ active, onToggle }) {
  return (
    <button type="button" className="btn-emergency" onClick={onToggle}>
      {active ? '● Emergency Stop Aktif' : 'Emergency Stop'}
    </button>
  )
}
