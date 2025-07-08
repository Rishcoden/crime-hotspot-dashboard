"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { hotspotPredictions, coimbatoreRegions } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, MapPin, Info, FileBarChart, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const MapComponent = dynamic(() => import("@/components/map-component"), {
  loading: () => <p className="text-center p-10">Loading map...</p>,
  ssr: false,
})

export default function MapPage() {
  const [mounted, setMounted] = useState(false)
  const [probabilityThreshold, setProbabilityThreshold] = useState(0.7)
  const [mapStyle, setMapStyle] = useState("satellite")
  const [viewMode, setViewMode] = useState("hotspots")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filteredHotspots = hotspotPredictions.filter(
    hotspot => hotspot.probability >= probabilityThreshold
  )

  return (
    <div className="p-6 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crime Hotspot Map</h1>
          <p className="text-muted-foreground">
            Interactive visualization of predicted crime hotspots in Coimbatore
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Map Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Map Style</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={mapStyle} onValueChange={setMapStyle}>
                <DropdownMenuRadioItem value="streets">Streets</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="satellite">Satellite</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>View Mode</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
                <DropdownMenuRadioItem value="hotspots">Hotspots</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="heatmap">Heatmap</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="regions">Regions</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="flex items-center gap-2">
            <FileBarChart className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full">
              <Tabs defaultValue="map" className="h-full">
                <div className="border-b px-4">
                  <TabsList className="h-10">
                    <TabsTrigger value="map" className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>Map View</span>
                    </TabsTrigger>
                    <TabsTrigger value="table" className="flex items-center gap-1">
                      <FileBarChart className="h-4 w-4" />
                      <span>Table View</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="map" className="h-[calc(100%-41px)] rounded-b-lg overflow-hidden">
                  <MapComponent 
                    hotspots={filteredHotspots} 
                    mapStyle={mapStyle} 
                    viewMode={viewMode}
                  />
                </TabsContent>
                <TabsContent value="table" className="p-4 h-[calc(100%-41px)] overflow-auto">
                  <Table>
                    <TableCaption>List of predicted crime hotspots in Coimbatore.</TableCaption>
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
                      {filteredHotspots.map((hotspot) => (
                        <TableRow key={hotspot.id}>
                          <TableCell className="font-medium">{hotspot.id}</TableCell>
                          <TableCell>{hotspot.latitude}</TableCell>
                          <TableCell>{hotspot.longitude}</TableCell>
                          <TableCell>
                            {hotspot.isHotspot ? (
                              <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                                <AlertTriangle className="h-3 w-3" />
                                <span>Hotspot</span>
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="flex items-center gap-1 w-fit">
                                <Info className="h-3 w-3" />
                                <span>Safe</span>
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">{(hotspot.probability * 100).toFixed(2)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
