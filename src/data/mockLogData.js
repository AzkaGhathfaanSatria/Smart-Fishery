const start = new Date()
start.setHours(0, 0, 0, 0)
start.setDate(start.getDate() - 2)

export const logData = []

for (let i = 0; i < 72; i++) {
  const timestamp = new Date(start.getTime() + i * 60 * 60 * 1000)
  const ph = 7.2 + Math.sin(i / 6) * 0.35
  const temp = 27.5 + Math.sin(i / 8 + 1) * 2.2
  const turbiditySpike = i % 17 === 0 ? 25 : 0
  const turbidity = Math.max(0, Math.round(30 + Math.sin(i / 5 + 2) * 15 + turbiditySpike))
  const levelDip = i % 23 === 0 ? 32 : 0
  const level = Math.max(0, Math.min(100, Math.round(72 + Math.sin(i / 10) * 12 - levelDip)))

  logData.push({
    timestamp,
    ph: Math.round(ph * 100) / 100,
    temp: Math.round(temp * 10) / 10,
    turbidity,
    level,
  })
}
