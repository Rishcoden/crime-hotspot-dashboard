"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "@/components/ui/chart"
import { ChartTooltip } from "@/components/ui/chart"
import { incidentTypeDistribution, monthlyIncidents, timeDistribution } from "@/lib/data"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")
  const COLORS = ["#22c55e", "#eab308", "#ef4444", "#6366f1", "#ec4899", "#8b5cf6"]

  // Sample temporal data for analysis
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    incidents: Math.floor(Math.random() * 15) + (i > 18 || i < 5 ? 15 : 5),
  }))

  const dailyData = Array.from({ length: 7 }, (_, i) => ({
    day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i],
    incidents: Math.floor(Math.random() * 30) + 20,
    arrests: Math.floor(Math.random() * 20) + 10,
  }))

  const correlationData = [
    { group: "A", unemployment: 5.8, crimeRate: 87 },
    { group: "B", unemployment: 7.2, crimeRate: 92 },
    { group: "C", unemployment: 4.3, crimeRate: 78 },
    { group: "D", unemployment: 8.1, crimeRate: 96 },
    { group: "E", unemployment: 6.5, crimeRate: 88 },
    { group: "F", unemployment: 9.2, crimeRate: 99 },
    { group: "G", unemployment: 3.9, crimeRate: 68 },
    { group: "H", unemployment: 5.2, crimeRate: 76 },
    { group: "I", unemployment: 7.8, crimeRate: 94 },
    { group: "J", unemployment: 6.1, crimeRate: 85 },
  ]

  const yearlyTrend = [
    { year: "2019", incidents: 1520 },
    { year: "2020", incidents: 1325 },
    { year: "2021", incidents: 1480 },
    { year: "2022", incidents: 1650 },
    { year: "2023", incidents: 1720 },
    { year: "2024", incidents: 1592 },
  ]

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">In-depth crime data analysis and pattern visualization</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="5year">Last 5 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs defaultValue="temporal" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5">
            <TabsTrigger value="temporal">Temporal Analysis</TabsTrigger>
            <TabsTrigger value="spatial">Spatial Analysis</TabsTrigger>
            <TabsTrigger value="categorical">Categorical Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
            <TabsTrigger value="correlations">Correlations</TabsTrigger>
          </TabsList>

          <TabsContent value="temporal" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Crime Distribution</CardTitle>
                  <CardDescription>Crime incidents by hour of day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={hourlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" label={{ value: "Hour of Day", position: "insideBottom", offset: -5 }} />
                        <YAxis label={{ value: "Incidents", angle: -90, position: "insideLeft" }} />
                        <ChartTooltip
                          formatter={(value: any) => [`${value} incidents`, "Count"]}
                          labelFormatter={(label) => `Hour: ${label}:00 - ${label}:59`}
                        />
                        <Bar dataKey="incidents" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Daily Crime Distribution</CardTitle>
                  <CardDescription>Crime incidents and arrests by day of week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dailyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip />
                        <Legend />
                        <Bar dataKey="incidents" name="Incidents" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="arrests" name="Arrests" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Crime Trends</CardTitle>
                  <CardDescription>Incident patterns throughout the year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyIncidents}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="incidents"
                          name="Incidents"
                          stroke="#6366f1"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="solved"
                          name="Solved Cases"
                          stroke="#22c55e"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="spatial" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Geographic Heatmap</CardTitle>
                  <CardDescription>Crime density across Coimbatore regions</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center p-6 border border-dashed rounded-lg border-muted-foreground/50 bg-muted/30 w-full h-full flex flex-col items-center justify-center">
                    <p className="mb-2">
                      Geographic heatmap visualization would be displayed here, showing crime density across Coimbatore
                      city regions
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Similar to the map view, but focused on analytical representation of spatial data
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Zone Comparison</CardTitle>
                  <CardDescription>Crime rates by police zones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { zone: "North", incidents: 246, arrests: 198 },
                          { zone: "South", incidents: 328, arrests: 275 },
                          { zone: "East", incidents: 187, arrests: 145 },
                          { zone: "West", incidents: 293, arrests: 240 },
                          { zone: "Central", incidents: 352, arrests: 301 },
                        ]}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="zone" type="category" />
                        <ChartTooltip />
                        <Legend />
                        <Bar dataKey="incidents" name="Incidents" fill="#6366f1" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="arrests" name="Arrests" fill="#22c55e" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distance from Center</CardTitle>
                  <CardDescription>Crime rates relative to city center distance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { distance: "0-2 km", crimeRate: 87 },
                          { distance: "2-4 km", crimeRate: 92 },
                          { distance: "4-6 km", crimeRate: 76 },
                          { distance: "6-8 km", crimeRate: 68 },
                          { distance: "8-10 km", crimeRate: 53 },
                          { distance: "10+ km", crimeRate: 41 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="distance" />
                        <YAxis />
                        <ChartTooltip />
                        <Line
                          type="monotone"
                          dataKey="crimeRate"
                          name="Crime Rate"
                          stroke="#6366f1"
                          strokeWidth={2}
                          dot={{ r: 5 }}
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categorical" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crime Type Distribution</CardTitle>
                  <CardDescription>Breakdown of incidents by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={incidentTypeDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={140}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {incidentTypeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip formatter={(value) => [`${value} incidents`, "Count"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time of Day Analysis</CardTitle>
                  <CardDescription>Crime incidents by time period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip formatter={(value) => [`${value} incidents`, "Count"]} />
                        <Bar dataKey="count" name="Incidents" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Victim Demographics</CardTitle>
                  <CardDescription>Age groups affected by crime</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { age: "0-15", value: 12 },
                            { age: "16-25", value: 38 },
                            { age: "26-40", value: 25 },
                            { age: "41-60", value: 18 },
                            { age: "60+", value: 7 },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="age"
                        >
                          {COLORS.map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <ChartTooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Case Resolution Status</CardTitle>
                  <CardDescription>Current status of reported incidents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { status: "Resolved", value: 142 },
                            { status: "Investigating", value: 78 },
                            { status: "Pending", value: 45 },
                            { status: "Closed Unsolved", value: 23 },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="status"
                        >
                          <Cell fill="#22c55e" />
                          <Cell fill="#6366f1" />
                          <Cell fill="#eab308" />
                          <Cell fill="#ef4444" />
                        </Pie>
                        <ChartTooltip formatter={(value) => [`${value} cases`, "Count"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Year-over-Year Crime Trends</CardTitle>
                  <CardDescription>Total incidents by year (2019-2024)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={yearlyTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <ChartTooltip />
                        <Area
                          type="monotone"
                          dataKey="incidents"
                          name="Incidents"
                          stroke="#6366f1"
                          fill="#6366f1"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Crime Type Evolution</CardTitle>
                  <CardDescription>Changes in crime categories over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { year: "2019", robbery: 68, theft: 85, assault: 45, vandalism: 52, fraud: 35 },
                          { year: "2020", robbery: 72, theft: 78, assault: 51, vandalism: 48, fraud: 42 },
                          { year: "2021", robbery: 65, theft: 82, assault: 49, vandalism: 55, fraud: 48 },
                          { year: "2022", robbery: 70, theft: 86, assault: 52, vandalism: 58, fraud: 55 },
                          { year: "2023", robbery: 75, theft: 92, assault: 55, vandalism: 62, fraud: 60 },
                          { year: "2024", robbery: 72, theft: 88, assault: 50, vandalism: 58, fraud: 57 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <ChartTooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="robbery"
                          stackId="1"
                          stroke="#ef4444"
                          fill="#ef4444"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="theft"
                          stackId="1"
                          stroke="#6366f1"
                          fill="#6366f1"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="assault"
                          stackId="1"
                          stroke="#eab308"
                          fill="#eab308"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="vandalism"
                          stackId="1"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="fraud"
                          stackId="1"
                          stroke="#22c55e"
                          fill="#22c55e"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Patterns</CardTitle>
                  <CardDescription>Quarterly crime trends by year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { quarter: "Q1 2022", incidents: 385 },
                          { quarter: "Q2 2022", incidents: 420 },
                          { quarter: "Q3 2022", incidents: 456 },
                          { quarter: "Q4 2022", incidents: 389 },
                          { quarter: "Q1 2023", incidents: 402 },
                          { quarter: "Q2 2023", incidents: 435 },
                          { quarter: "Q3 2023", incidents: 478 },
                          { quarter: "Q4 2023", incidents: 405 },
                          { quarter: "Q1 2024", incidents: 392 },
                          { quarter: "Q2 2024", incidents: 425 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quarter" />
                        <YAxis />
                        <ChartTooltip />
                        <Line
                          type="monotone"
                          dataKey="incidents"
                          name="Incidents"
                          stroke="#6366f1"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="correlations" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Socioeconomic Correlations</CardTitle>
                  <CardDescription>Unemployment rate vs. crime rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          dataKey="unemployment"
                          name="Unemployment Rate"
                          unit="%"
                          label={{ value: "Unemployment Rate (%)", position: "insideBottom", offset: -5 }}
                        />
                        <YAxis
                          type="number"
                          dataKey="crimeRate"
                          name="Crime Rate"
                          label={{ value: "Crime Rate (per 10,000)", angle: -90, position: "insideLeft" }}
                        />
                        <ZAxis range={[60, 60]} />
                        <ChartTooltip cursor={{ stroke: "#ccc", strokeDasharray: "5 5" }} />
                        <Scatter name="Area Groups" data={correlationData} fill="#6366f1" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Population Density Impact</CardTitle>
                  <CardDescription>Density vs. crime rate by neighborhood</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          dataKey="density"
                          name="Population Density"
                          unit="/km²"
                          label={{ value: "Population Density (per km²)", position: "insideBottom", offset: -5 }}
                        />
                        <YAxis
                          type="number"
                          dataKey="crimeRate"
                          name="Crime Rate"
                          label={{ value: "Crime Rate (per 10,000)", angle: -90, position: "insideLeft" }}
                        />
                        <ZAxis range={[60, 60]} />
                        <ChartTooltip cursor={{ stroke: "#ccc", strokeDasharray: "5 5" }} />
                        <Scatter
                          name="Neighborhoods"
                          data={[
                            { neighborhood: "A", density: 5200, crimeRate: 87 },
                            { neighborhood: "B", density: 8700, crimeRate: 95 },
                            { neighborhood: "C", density: 3500, crimeRate: 68 },
                            { neighborhood: "D", density: 9800, crimeRate: 98 },
                            { neighborhood: "E", density: 6300, crimeRate: 85 },
                            { neighborhood: "F", density: 7500, crimeRate: 92 },
                            { neighborhood: "G", density: 4100, crimeRate: 75 },
                            { neighborhood: "H", density: 8200, crimeRate: 94 },
                            { neighborhood: "I", density: 2900, crimeRate: 62 },
                            { neighborhood: "J", density: 5800, crimeRate: 82 },
                          ]}
                          fill="#6366f1"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Multiple Factor Analysis</CardTitle>
                  <CardDescription>Crime rate correlation with multiple factors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { factor: "Unemployment", correlation: 0.68 },
                          { factor: "Education Level", correlation: -0.72 },
                          { factor: "Poverty Rate", correlation: 0.75 },
                          { factor: "Population Density", correlation: 0.65 },
                          { factor: "Police Presence", correlation: -0.58 },
                          { factor: "Street Lighting", correlation: -0.51 },
                          { factor: "CCTV Coverage", correlation: -0.63 },
                          { factor: "Vacant Buildings", correlation: 0.54 },
                        ]}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[-1, 1]} ticks={[-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1]} />
                        <YAxis dataKey="factor" type="category" width={150} />
                        <ChartTooltip
                          formatter={(value) => [`${value > 0 ? "+" : ""}${value}`, "Correlation Coefficient"]}
                        />
                        <Bar
                          dataKey="correlation"
                          name="Correlation"
                          radius={[0, 4, 4, 0]}
                          fill={(data) => (data.correlation > 0 ? "#ef4444" : "#22c55e")}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

