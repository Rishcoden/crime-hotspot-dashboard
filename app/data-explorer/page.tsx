"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Calendar, FileBarChart, Filter, LayoutGrid, Save, Search, TableIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { hotspotPredictions, incidents } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DataExplorerPage() {
  const [view, setView] = useState("table")
  const [searchQuery, setSearchQuery] = useState("")
  const [incidentTypeFilter, setIncidentTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Apply filters to incidents data
  const filteredIncidents = incidents.filter((incident) => {
    // Apply search filter
    if (
      searchQuery &&
      !incident.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !incident.type.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Apply type filter
    if (incidentTypeFilter !== "all" && incident.type !== incidentTypeFilter) {
      return false
    }

    // Apply status filter
    if (statusFilter !== "all" && incident.status !== statusFilter) {
      return false
    }

    return true
  })

  // Get unique incident types and statuses for filter options
  const incidentTypes = ["all", ...new Set(incidents.map((incident) => incident.type))]
  const statuses = ["all", ...new Set(incidents.map((incident) => incident.status))]

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Explorer</h1>
          <p className="text-muted-foreground">Explore, filter, and analyze crime data</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col gap-6"
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Data Browser</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={view === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("table")}
                  className="flex items-center gap-1"
                >
                  <TableIcon className="h-4 w-4" />
                  <span>Table</span>
                </Button>
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("grid")}
                  className="flex items-center gap-1"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span>Grid</span>
                </Button>
                <Button
                  variant={view === "stats" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("stats")}
                  className="flex items-center gap-1"
                >
                  <BarChart className="h-4 w-4" />
                  <span>Stats</span>
                </Button>
              </div>
            </div>
            <CardDescription>Browse and filter crime data records</CardDescription>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search location or type..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={incidentTypeFilter} onValueChange={setIncidentTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Incident Type" />
                </SelectTrigger>
                <SelectContent>
                  {incidentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "All Statuses" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" title="More Filters">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {view === "table" && (
              <div className="rounded-md border">
                <Table>
                  <TableCaption>
                    Showing {filteredIncidents.length} of {incidents.length} incidents
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIncidents.length > 0 ? (
                      filteredIncidents.map((incident) => (
                        <TableRow key={incident.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{incident.id}</TableCell>
                          <TableCell>{incident.type}</TableCell>
                          <TableCell>{incident.location}</TableCell>
                          <TableCell>{incident.date}</TableCell>
                          <TableCell>{incident.time}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                incident.status === "Resolved"
                                  ? "outline"
                                  : incident.status === "Investigating"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {incident.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No results found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

            {view === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {filteredIncidents.length > 0 ? (
                  filteredIncidents.map((incident) => (
                    <Card key={incident.id} className="cursor-pointer hover:bg-muted/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">
                              #{incident.id} {incident.type}
                            </h3>
                            <p className="text-sm text-muted-foreground">{incident.location}</p>
                          </div>
                          <Badge
                            variant={
                              incident.status === "Resolved"
                                ? "outline"
                                : incident.status === "Investigating"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {incident.status}
                          </Badge>
                        </div>
                        <div className="flex gap-3 mt-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{incident.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{incident.time}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 border rounded-lg">
                    No results found. Try adjusting your filters.
                  </div>
                )}
              </div>
            )}

            {view === "stats" && (
              <div className="mt-2">
                <Tabs defaultValue="summary">
                  <TabsList>
                    <TabsTrigger value="summary" className="flex items-center gap-1">
                      <FileBarChart className="h-4 w-4" />
                      <span>Summary</span>
                    </TabsTrigger>
                    <TabsTrigger value="distribution" className="flex items-center gap-1">
                      <BarChart className="h-4 w-4" />
                      <span>Distribution</span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="summary" className="p-4 border rounded-lg mt-4">
                    <h3 className="text-lg font-medium mb-4">Data Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-background p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Total Records</p>
                        <p className="text-xl font-bold">{incidents.length}</p>
                      </div>

                      <div className="bg-background p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Filtered Records</p>
                        <p className="text-xl font-bold">{filteredIncidents.length}</p>
                      </div>

                      <div className="bg-background p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Resolved Cases</p>
                        <p className="text-xl font-bold">{incidents.filter((i) => i.status === "Resolved").length}</p>
                      </div>

                      <div className="bg-background p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Pending Cases</p>
                        <p className="text-xl font-bold">{incidents.filter((i) => i.status === "Pending").length}</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mt-6 mb-4">Type Distribution</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {incidentTypes
                        .filter((t) => t !== "all")
                        .map((type) => (
                          <div key={type} className="bg-background p-4 rounded-lg border">
                            <p className="text-sm text-muted-foreground">{type}</p>
                            <p className="text-xl font-bold">{incidents.filter((i) => i.type === type).length}</p>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="distribution" className="p-4 border rounded-lg mt-4">
                    <div className="h-[350px] flex items-center justify-center">
                      <div className="text-center p-6 border border-dashed rounded-lg border-muted-foreground/50 bg-muted/30 w-full h-full flex flex-col items-center justify-center">
                        <p className="mb-2">Statistical distribution visualization would be displayed here</p>
                        <p className="text-sm text-muted-foreground">
                          Shows breakdown of incidents by time, location, and type
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hotspot Prediction Data</CardTitle>
            <CardDescription>Raw data from the prediction model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableCaption>Model prediction data for {hotspotPredictions.length} locations</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Latitude</TableHead>
                    <TableHead>Longitude</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Probability</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hotspotPredictions.map((hotspot) => (
                    <TableRow key={hotspot.id}>
                      <TableCell className="font-medium">{hotspot.id}</TableCell>
                      <TableCell>{hotspot.latitude}</TableCell>
                      <TableCell>{hotspot.longitude}</TableCell>
                      <TableCell>
                        {hotspot.isHotspot ? (
                          <Badge variant="destructive">Hotspot</Badge>
                        ) : (
                          <Badge variant="outline">Safe</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{(hotspot.probability * 100).toFixed(2)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

