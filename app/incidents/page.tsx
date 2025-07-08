"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowUpDown,
  Calendar,
  ChevronDown,
  Clock,
  FileDown,
  Filter,
  LayoutGrid,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Tag,
  TableIcon,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { incidents } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function IncidentsPage() {
  const [view, setView] = useState("table")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Get unique incident types and statuses
  const incidentTypes = ["all", ...new Set(incidents.map((incident) => incident.type))]
  const statuses = ["all", ...new Set(incidents.map((incident) => incident.status))]

  // Filter incidents based on search and filters
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
    if (filterType !== "all" && incident.type !== filterType) {
      return false
    }

    // Apply status filter
    if (filterStatus !== "all" && incident.status !== filterStatus) {
      return false
    }

    return true
  })

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Incident Reports</h1>
          <p className="text-muted-foreground">Manage and analyze incident records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <FileDown className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span>New Incident</span>
          </Button>
        </div>
      </motion.div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Incidents</CardTitle>
              <CardDescription>View and manage incident reports</CardDescription>
            </div>
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
            </div>
          </div>

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

            <Select value={filterType} onValueChange={setFilterType}>
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

            <Select value={filterStatus} onValueChange={setFilterStatus}>
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
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
                        Type
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
                        Location
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
                        Date
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIncidents.length > 0 ? (
                    filteredIncidents.map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell className="font-medium">#{incident.id}</TableCell>
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
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Edit incident</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Print report</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete incident</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No incidents found. Try adjusting your filters.
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
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-base">Case #{incident.id}</h3>
                          <div className="flex items-center gap-1 text-sm mt-1">
                            <Tag className="h-3.5 w-3.5" />
                            <span>{incident.type}</span>
                          </div>
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

                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{incident.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{incident.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{incident.time}</span>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <span>Actions</span>
                              <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit incident</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Print report</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete incident</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-10 border rounded-lg">
                  No incidents found. Try adjusting your filters.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Incident Distribution</CardTitle>
            <CardDescription>Breakdown by incident type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidentTypes
                .filter((type) => type !== "all")
                .map((type) => {
                  const count = incidents.filter((i) => i.type === type).length
                  const percentage = Math.round((count / incidents.length) * 100)

                  return (
                    <div key={type} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <div className="font-medium">{type}</div>
                        <div>{percentage}%</div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolution Rate</CardTitle>
            <CardDescription>Case resolution statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold">
                {Math.round((incidents.filter((i) => i.status === "Resolved").length / incidents.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Resolution Rate</div>
            </div>

            <div className="space-y-4">
              {statuses
                .filter((status) => status !== "all")
                .map((status) => {
                  const count = incidents.filter((i) => i.status === status).length
                  const percentage = Math.round((count / incidents.length) * 100)

                  return (
                    <div key={status} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <div className="font-medium">{status}</div>
                        <div>{count} incidents</div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            status === "Resolved"
                              ? "bg-green-500"
                              : status === "Investigating"
                                ? "bg-blue-500"
                                : "bg-yellow-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest incident reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidents.slice(0, 5).map((incident) => (
                <div key={incident.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div
                    className={`
                    w-2 h-2 mt-1.5 rounded-full
                    ${
                      incident.status === "Resolved"
                        ? "bg-green-500"
                        : incident.status === "Investigating"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                    }
                  `}
                  />
                  <div>
                    <div className="font-medium">{incident.type}</div>
                    <div className="text-sm text-muted-foreground">{incident.location}</div>
                    <div className="flex gap-3 mt-1">
                      <div className="text-xs text-muted-foreground">{incident.date}</div>
                      <div className="text-xs text-muted-foreground">{incident.time}</div>
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="ghost" size="sm" className="w-full">
                View all incidents
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

