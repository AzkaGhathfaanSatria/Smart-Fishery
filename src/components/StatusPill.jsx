export default function StatusPill({ label, tone = 'good' }) {
  const toneVar = { good: 'var(--good)', warn: 'var(--warn)', critical: 'var(--critical)' }[tone]

  return (
    <div className="status-item">
      <span className="status-item-dot" style={{ background: toneVar }} />
      <span>{label}</span>
    </div>
  )
}
