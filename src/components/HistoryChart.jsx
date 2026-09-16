import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const axisTick = { fontFamily: 'var(--font-mono)', fontSize: 11, fill: 'var(--text-muted)' }

export default function HistoryChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="var(--grid-line)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="time"
          tick={axisTick}
          axisLine={{ stroke: 'var(--panel-border)' }}
          tickLine={false}
        />
        <YAxis
          yAxisId="ph"
          domain={[6, 9]}
          tick={axisTick}
          axisLine={false}
          tickLine={false}
          width={32}
        />
        <YAxis
          yAxisId="temp"
          orientation="right"
          domain={[24, 32]}
          tick={axisTick}
          axisLine={false}
          tickLine={false}
          width={32}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--panel)',
            border: '1px solid var(--panel-border)',
            borderRadius: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
          }}
          labelStyle={{ color: 'var(--text-muted)' }}
        />
        <Legend wrapperStyle={{ fontFamily: 'var(--font-display)', fontSize: 12 }} />
        <Line
          yAxisId="ph"
          type="monotone"
          dataKey="ph"
          name="pH"
          stroke="#1583A3"
          strokeWidth={2}
          dot={false}
        />
        <Line
          yAxisId="temp"
          type="monotone"
          dataKey="temp"
          name="Suhu (°C)"
          stroke="#C98A2E"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
