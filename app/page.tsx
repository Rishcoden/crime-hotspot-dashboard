"use client"

import { useEffect, useState } from "react"
import { Activity, AlertTriangle, MapPin, Shield, TrendingDown, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/stats-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Legend,
} from "@/components/ui/chart"
import { ChartTooltip } from "@/components/ui/chart"
import { incidentTypeDistribution, monthlyIncidents, timeDistribution } from "@/lib/data"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const COLORS = ["#22c55e", "#eab308", "#ef4444", "#6366f1", "#ec4899", "#8b5cf6"]

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Crime hotspot analysis and prediction for Coimbatore City</p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={item}>
          <StatsCard
            title="Total Hotspots"
            value="5"
            description="Identified high-risk areas"
            icon={MapPin}
            trend={{ value: 12, label: "from last month", positive: false }}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Prediction Accuracy"
            value="95.5%"
            description="Gradient Boosting model"
            icon={Activity}
            trend={{ value: 2.3, label: "from previous model", positive: true }}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Monthly Incidents"
            value="178"
            description="Peak in September"
            icon={AlertTriangle}
            trend={{ value: 7.8, label: "from previous month", positive: false }}
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard
            title="Case Clearance Rate"
            value="84.3%"
            description="Last quarter average"
            icon={Shield}
            trend={{ value: 3.2, label: "from previous quarter", positive: true }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
            <TabsTrigger value="incident-types">Incident Types</TabsTrigger>
            <TabsTrigger value="time-distribution">Time Distribution</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Incident Trends</CardTitle>
                <CardDescription>Incidents reported vs. solved cases over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyIncidents}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip />
                      <Legend />
                      <Bar dataKey="incidents" name="Total Incidents" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="solved" name="Solved Cases" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="incident-types" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Incident Type Distribution</CardTitle>
                <CardDescription>Breakdown of incidents by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex justify-center">
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
          </TabsContent>
          <TabsContent value="time-distribution" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Incident Time Distribution</CardTitle>
                <CardDescription>Analysis of incidents by time of day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
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
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Model Improvements</CardTitle>
            <CardDescription>Comparison between models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Random Forest</p>
                  <p className="text-sm text-muted-foreground">Accuracy: 95.0%</p>
                </div>
                <TrendingUp className="text-green-500 h-5 w-5" />
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "95%" }} />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Gradient Boosting</p>
                  <p className="text-sm text-muted-foreground">Accuracy: 95.5%</p>
                </div>
                <TrendingUp className="text-green-500 h-5 w-5" />
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "95.5%" }} />
              </div>

              <p className="text-sm mt-4">
                Gradient Boosting model shows a slight improvement over Random Forest, with better handling of
                imbalanced data.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prevention Strategy Impact</CardTitle>
            <CardDescription>Effect of implemented measures in high-risk areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Increased Patrol</p>
                  <p className="text-sm text-muted-foreground">Reduction: 27.3%</p>
                </div>
                <TrendingDown className="text-green-500 h-5 w-5" />
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "27.3%" }} />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">CCTV Installation</p>
                  <p className="text-sm text-muted-foreground">Reduction: 32.8%</p>
                </div>
                <TrendingDown className="text-green-500 h-5 w-5" />
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "32.8%" }} />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Community Engagement</p>
                  <p className="text-sm text-muted-foreground">Reduction: 18.5%</p>
                </div>
                <TrendingDown className="text-green-500 h-5 w-5" />
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "18.5%" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

