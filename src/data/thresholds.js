// Threshold mengikuti konstanta di firmware (sketch-2_new.ino)
export const phZones = [
  { from: 0, to: 6, color: '#C9482E', label: 'Kritis' },
  { from: 6, to: 6.5, color: '#C98A2E', label: 'Waspada' },
  { from: 6.5, to: 8.5, color: '#2E9E6B', label: 'Normal' },
  { from: 8.5, to: 9, color: '#C98A2E', label: 'Waspada' },
  { from: 9, to: 14, color: '#C9482E', label: 'Kritis' },
]

export const tempZones = [
  { from: 15, to: 24, color: '#C9482E', label: 'Kritis' },
  { from: 24, to: 25, color: '#C98A2E', label: 'Waspada' },
  { from: 25, to: 32, color: '#2E9E6B', label: 'Normal' },
  { from: 32, to: 33, color: '#C98A2E', label: 'Waspada' },
  { from: 33, to: 40, color: '#C9482E', label: 'Kritis' },
]

export const turbidityZones = [
  { from: 0, to: 40, color: '#2E9E6B', label: 'Normal' },
  { from: 40, to: 50, color: '#C98A2E', label: 'Waspada' },
  { from: 50, to: 100, color: '#C9482E', label: 'Kritis' },
]

export const levelZones = [
  { from: 0, to: 15, color: '#C9482E', label: 'Kritis' },
  { from: 15, to: 20, color: '#C98A2E', label: 'Waspada' },
  { from: 20, to: 100, color: '#2E9E6B', label: 'Normal' },
]

export const defaultThresholds = {
  phMin: 6.5,
  phMax: 8.5,
  tempMin: 25,
  tempMax: 32,
  turbidityMax: 50,
  levelMin: 20,
}

export const defaultSchedule = ['07:00', '12:00', '17:00']

export const defaultMqtt = {
  broker: 'broker.hivemq.com',
  port: 8884,
  topicPrefix: 'poseidon/kolamA1',
}
