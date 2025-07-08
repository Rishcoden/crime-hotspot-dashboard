import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  Line,
  LineChart,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts"

export {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  AreaChart,
  Line,
  LineChart,
  Scatter,
  ScatterChart,
  ZAxis,
}

interface ChartTooltipProps {
  formatter: (value: any) => [string, string] | string
  labelFormatter?: (label: any) => string
}

export function ChartTooltip({ formatter, labelFormatter }: ChartTooltipProps) {
  return (
    <Tooltip
      formatter={formatter}
      labelFormatter={labelFormatter}
      contentStyle={{ background: "#1e293b", border: "none", color: "#fff" }}
      itemStyle={{ color: "#fff" }}
    />
  )
}

