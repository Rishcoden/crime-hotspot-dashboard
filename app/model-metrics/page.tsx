"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { modelMetrics } from "@/lib/data"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { ChartTooltip } from "@/components/ui/chart"

export default function ModelMetricsPage() {
  const rf = modelMetrics.randomForest
  const gb = modelMetrics.gradientBoosting

  const confusionMatrixRF = [
    { name: "True Negative", value: Math.round(rf.recallClass0 * rf.supportClass0) },
    { name: "False Positive", value: rf.supportClass0 - Math.round(rf.recallClass0 * rf.supportClass0) },
    { name: "False Negative", value: rf.supportClass1 - Math.round(rf.recallClass1 * rf.supportClass1) },
    { name: "True Positive", value: Math.round(rf.recallClass1 * rf.supportClass1) },
  ]

  const confusionMatrixGB = [
    { name: "True Negative", value: Math.round(gb.recallClass0 * gb.supportClass0) },
    { name: "False Positive", value: gb.supportClass0 - Math.round(gb.recallClass0 * gb.supportClass0) },
    { name: "False Negative", value: gb.supportClass1 - Math.round(gb.recallClass1 * gb.supportClass1) },
    { name: "True Positive", value: Math.round(gb.recallClass1 * gb.supportClass1) },
  ]

  const COLORS = ["#22c55e", "#ef4444", "#eab308", "#6366f1"]

  const featureImportance = [
    { feature: "Time of Day", importance: 0.28 },
    { feature: "Day of Week", importance: 0.12 },
    { feature: "Location", importance: 0.23 },
    { feature: "Incident Type", importance: 0.18 },
    { feature: "Weather", importance: 0.07 },
    { feature: "Holiday/Event", importance: 0.09 },
    { feature: "Population Density", importance: 0.03 },
  ].sort((a, b) => b.importance - a.importance)

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Model Metrics</h1>
          <p className="text-muted-foreground">Performance analysis of crime prediction models</p>
        </div>
        <Badge variant="outline" className="px-4 py-1.5 text-base font-semibold">
          Best Model: Gradient Boosting (95.5%)
        </Badge>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="random-forest">Random Forest</TabsTrigger>
            <TabsTrigger value="gradient-boosting">Gradient Boosting</TabsTrigger>
            <TabsTrigger value="feature-importance">Feature Importance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Comparison</CardTitle>
                  <CardDescription>Performance metrics of different models</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="text-sm font-medium">Random Forest</span>
                          <span className="text-xs text-muted-foreground ml-2">Accuracy: {rf.accuracy * 100}%</span>
                        </div>
                        <span className="text-sm font-medium">{rf.accuracy * 100}%</span>
                      </div>
                      <Progress value={rf.accuracy * 100} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="text-sm font-medium">Gradient Boosting</span>
                          <span className="text-xs text-muted-foreground ml-2">Accuracy: {gb.accuracy * 100}%</span>
                        </div>
                        <span className="text-sm font-medium">{gb.accuracy * 100}%</span>
                      </div>
                      <Progress value={gb.accuracy * 100} className="h-2 bg-muted" />
                    </div>

                    <div className="pt-4">
                      <h3 className="text-sm font-medium mb-3">F1 Score Comparison</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Random Forest", class0: rf.f1ScoreClass0, class1: rf.f1ScoreClass1 },
                              { name: "Gradient Boosting", class0: gb.f1ScoreClass0, class1: gb.f1ScoreClass1 },
                            ]}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 1]} />
                            <ChartTooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "F1 Score"]} />
                            <Legend />
                            <Bar dataKey="class0" name="Non-Hotspot (Class 0)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="class1" name="Hotspot (Class 1)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Training History</CardTitle>
                  <CardDescription>Model accuracy and loss over epochs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={Array.from({ length: 10 }, (_, i) => ({
                          epoch: i + 1,
                          rfAccuracy: 0.85 + i * 0.011,
                          gbAccuracy: 0.86 + i * 0.011,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="epoch" label={{ value: "Epoch", position: "insideBottom", offset: -5 }} />
                        <YAxis domain={[0.8, 1]} label={{ value: "Accuracy", angle: -90, position: "insideLeft" }} />
                        <ChartTooltip formatter={(value) => [`${(value * 100).toFixed(2)}%`, "Accuracy"]} />
                        <Legend />
                        <Bar dataKey="rfAccuracy" name="Random Forest" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="gbAccuracy" name="Gradient Boosting" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Model Scoring Time Comparison</CardTitle>
                  <CardDescription>Time taken to generate predictions (milliseconds)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { dataset: "Small (100 points)", rf: 25, gb: 32 },
                          { dataset: "Medium (1,000 points)", rf: 145, gb: 178 },
                          { dataset: "Large (10,000 points)", rf: 980, gb: 1250 },
                          { dataset: "Very Large (100,000 points)", rf: 9200, gb: 11500 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dataset" />
                        <YAxis />
                        <ChartTooltip formatter={(value) => [`${value} ms`, "Scoring Time"]} />
                        <Legend />
                        <Bar dataKey="rf" name="Random Forest" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="gb" name="Gradient Boosting" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="random-forest" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Random Forest Performance</CardTitle>
                  <CardDescription>Key metrics breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Accuracy</p>
                        <p className="text-2xl font-bold">{(rf.accuracy * 100).toFixed(1)}%</p>
                      </div>

                      <div className="bg-background p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">F1 Score (Class 1)</p>
                        <p className="text-2xl font-bold">{(rf.f1ScoreClass1 * 100).toFixed(1)}%</p>
                      </div>

                      <div className="bg-background p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Precision (Class 1)</p>
                        <p className="text-2xl font-bold">{(rf.precisionClass1 * 100).toFixed(1)}%</p>
                      </div>

                      <div className="bg-background p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Recall (Class 1)</p>
                        <p className="text-2xl font-bold">{(rf.recallClass1 * 100).toFixed(1)}%</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-sm font-medium mb-4">Class-wise Performance</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <div>
                              <span className="text-sm font-medium">Class 0 (Non-Hotspot)</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                F1: {(rf.f1ScoreClass0 * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="flex-1">
                              <Progress value={rf.precisionClass0 * 100} className="h-2" />
                            </div>
                            <span className="text-sm min-w-[90px]">
                              Precision: {(rf.precisionClass0 * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex gap-2 items-center mt-1">
                            <div className="flex-1">
                              <Progress value={rf.recallClass0 * 100} className="h-2" />
                            </div>
                            <span className="text-sm min-w-[90px]">Recall: {(rf.recallClass0 * 100).toFixed(1)}%</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <div>
                              <span className="text-sm font-medium">Class 1 (Hotspot)</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                F1: {(rf.f1ScoreClass1 * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="flex-1">
                              <Progress value={rf.precisionClass1 * 100} className="h-2" />
                            </div>
                            <span className="text-sm min-w-[90px]">
                              Precision: {(rf.precisionClass1 * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex gap-2 items-center mt-1">
                            <div className="flex-1">
                              <Progress value={rf.recallClass1 * 100} className="h-2" />
                            </div>
                            <span className="text-sm min-w-[90px]">Recall: {(rf.recallClass1 * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Random Forest Confusion Matrix</CardTitle>
                  <CardDescription>Visualization of prediction results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={confusionMatrixRF}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="name"
                          label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {confusionMatrixRF.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} samples`, ""]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Random Forest Configuration</CardTitle>
                  <CardDescription>Hyperparameters and settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Number of Trees</p>
                      <p className="text-xl font-bold">100</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Max Depth</p>
                      <p className="text-xl font-bold">12</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Min Samples Split</p>
                      <p className="text-xl font-bold">2</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Min Samples Leaf</p>
                      <p className="text-xl font-bold">1</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Max Features</p>
                      <p className="text-xl font-bold">auto</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Bootstrap</p>
                      <p className="text-xl font-bold">True</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Class Weight</p>
                      <p className="text-xl font-bold">balanced</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Random State</p>
                      <p className="text-xl font-bold">42</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="gradient-boosting" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gradient Boosting Performance</CardTitle>
                  <CardDescription>Key metrics breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Accuracy</p>
                        <p className="text-2xl font-bold">{(gb.accuracy * 100).toFixed(1)}%</p>
                      </div>

                      <div className="bg-background p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">F1 Score (Class 1)</p>
                        <p className="text-2xl font-bold">{(gb.f1ScoreClass1 * 100).toFixed(1)}%</p>
                      </div>

                      <div className="bg-background p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Precision (Class 1)</p>
                        <p className="text-2xl font-bold">{(gb.precisionClass1 * 100).toFixed(1)}%</p>
                      </div>

                      <div className="bg-background p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Recall (Class 1)</p>
                        <p className="text-2xl font-bold">{(gb.recallClass1 * 100).toFixed(1)}%</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-sm font-medium mb-4">Class-wise Performance</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <div>
                              <span className="text-sm font-medium">Class 0 (Non-Hotspot)</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                F1: {(gb.f1ScoreClass0 * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="flex-1">
                              <Progress value={gb.precisionClass0 * 100} className="h-2" />
                            </div>
                            <span className="text-sm min-w-[90px]">
                              Precision: {(gb.precisionClass0 * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex gap-2 items-center mt-1">
                            <div className="flex-1">
                              <Progress value={gb.recallClass0 * 100} className="h-2" />
                            </div>
                            <span className="text-sm min-w-[90px]">Recall: {(gb.recallClass0 * 100).toFixed(1)}%</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <div>
                              <span className="text-sm font-medium">Class 1 (Hotspot)</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                F1: {(gb.f1ScoreClass1 * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            <div className="flex-1">
                              <Progress value={gb.precisionClass1 * 100} className="h-2" />
                            </div>
                            <span className="text-sm min-w-[90px]">
                              Precision: {(gb.precisionClass1 * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex gap-2 items-center mt-1">
                            <div className="flex-1">
                              <Progress value={gb.recallClass1 * 100} className="h-2" />
                            </div>
                            <span className="text-sm min-w-[90px]">Recall: {(gb.recallClass1 * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gradient Boosting Confusion Matrix</CardTitle>
                  <CardDescription>Visualization of prediction results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={confusionMatrixGB}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="name"
                          label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {confusionMatrixGB.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} samples`, ""]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Gradient Boosting Configuration</CardTitle>
                  <CardDescription>Hyperparameters and settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Number of Estimators</p>
                      <p className="text-xl font-bold">150</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Learning Rate</p>
                      <p className="text-xl font-bold">0.1</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Max Depth</p>
                      <p className="text-xl font-bold">5</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Min Samples Split</p>
                      <p className="text-xl font-bold">2</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Min Samples Leaf</p>
                      <p className="text-xl font-bold">1</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Max Features</p>
                      <p className="text-xl font-bold">sqrt</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Subsample</p>
                      <p className="text-xl font-bold">0.8</p>
                    </div>

                    <div className="bg-background p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">Random State</p>
                      <p className="text-xl font-bold">42</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feature-importance" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Feature Importance</CardTitle>
                  <CardDescription>Relative importance of prediction features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={featureImportance} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 0.3]} />
                        <YAxis dataKey="feature" type="category" width={150} />
                        <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "Importance"]} />
                        <Bar
                          dataKey="importance"
                          fill="#6366f1"
                          radius={[0, 4, 4, 0]}
                          label={{ position: "right", formatter: (value) => `${(value * 100).toFixed(1)}%` }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Correlation</CardTitle>
                  <CardDescription>Inter-feature relationships</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex items-center justify-center">
                    <div className="text-center p-6 border border-dashed rounded-lg border-muted-foreground/50 bg-muted/30 w-full h-full flex flex-col items-center justify-center">
                      <p className="mb-2">
                        Feature correlation heatmap would be displayed here, showing how different features relate to
                        each other
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This helps identify redundant features and understand data patterns
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prediction Explanation</CardTitle>
                  <CardDescription>SHAP values for individual predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex items-center justify-center">
                    <div className="text-center p-6 border border-dashed rounded-lg border-muted-foreground/50 bg-muted/30 w-full h-full flex flex-col items-center justify-center">
                      <p className="mb-2">SHAP (SHapley Additive exPlanations) visualization would be displayed here</p>
                      <p className="text-sm text-muted-foreground">
                        This explains how each feature contributes to individual predictions
                      </p>
                    </div>
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

