function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 180) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, startAngle)
  const end = polarToCartesian(cx, cy, r, endAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
}

export default function Gauge({ label, value, min, max, unit, precision = 1, zones, size = 176 }) {
  const cx = size / 2
  const cy = size / 2 + 4
  const r = size / 2 - 20

  const valueToAngle = (v) => {
    const clamped = Math.max(min, Math.min(max, v))
    return ((clamped - min) / (max - min)) * 180
  }

  const currentZone =
    zones.find((z) => value >= z.from && value <= z.to) || zones[zones.length - 1]
  const needleTip = polarToCartesian(cx, cy, r - 16, valueToAngle(value))

  return (
    <div className="gauge-wrap">
      <svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
        <path
          d={describeArc(cx, cy, r, 0, 180)}
          fill="none"
          stroke="var(--grid-line)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {zones.map((z, i) => (
          <path
            key={i}
            d={describeArc(cx, cy, r, valueToAngle(z.from), valueToAngle(z.to))}
            fill="none"
            stroke={z.color}
            strokeWidth="10"
            opacity="0.85"
          />
        ))}
        <line
          x1={cx}
          y1={cy}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="var(--text-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="5" fill="var(--text-primary)" />
      </svg>
      <div>
        <span className="gauge-reading">{value.toFixed(precision)}</span>
        <span className="gauge-unit">{unit}</span>
      </div>
      <span
        className="gauge-status"
        style={{ background: `${currentZone.color}22`, color: currentZone.color }}
      >
        {currentZone.label}
      </span>
      <span className="gauge-label">{label}</span>
    </div>
  )
}
