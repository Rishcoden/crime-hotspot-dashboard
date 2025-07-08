"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet.heat"
import type { hotspotPredictions } from "@/lib/data"

// Fix icon paths for Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

interface MapComponentProps {
  hotspots: typeof hotspotPredictions
  mapStyle: string
  viewMode: string
}

export default function MapComponent({ hotspots, mapStyle, viewMode }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      // Center on Coimbatore
      mapRef.current = L.map(mapContainerRef.current).setView([10.9624, 76.9366], 13)

      // Apply the selected map style
      updateMapStyle(mapStyle)
    }

    // Update markers when hotspots or viewMode changes
    updateMapVisualization()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [hotspots, viewMode])

  // Update map style when it changes
  useEffect(() => {
    if (mapRef.current) {
      updateMapStyle(mapStyle)
    }
  }, [mapStyle])

  const updateMapStyle = (style: string) => {
    if (!mapRef.current) return

    // Remove existing tile layer
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        mapRef.current?.removeLayer(layer)
      }
    })

    // Add the selected tile layer
    switch (style) {
      case "satellite":
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
          attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        }).addTo(mapRef.current)
        break
      case "dark":
        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }).addTo(mapRef.current)
        break
      default: // streets
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current)
    }
  }

  const updateMapVisualization = () => {
    if (!mapRef.current) return

    // Clear existing markers/heatmap
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker || (layer as any)._heat) {
        mapRef.current?.removeLayer(layer)
      }
    })

    // Add visualization based on selected view mode
    switch (viewMode) {
      case "heatmap":
        // Create heatmap
        const heatData = hotspots.map((spot) => [
          spot.latitude,
          spot.longitude,
          spot.probability * 10, // Intensity based on probability
        ])

        // @ts-ignore - heat is not in the types
        L.heatLayer(heatData, {
          radius: 25,
          blur: 15,
          maxZoom: 17,
          gradient: { 0.4: "blue", 0.6: "lime", 0.8: "yellow", 1.0: "red" },
        }).addTo(mapRef.current)
        break

      case "regions":
        // For demonstration: Add some polygon regions
        // In a real app, you would use actual GeoJSON data for Coimbatore regions
        const regions = [
          {
            name: "Gandhipuram",
            coords: [
              [10.9624, 76.9366],
              [10.9724, 76.9466],
              [10.9524, 76.9566],
              [10.9424, 76.9466],
            ],
            risk: "High",
          },
          {
            name: "R.S. Puram",
            coords: [
              [10.9824, 76.9666],
              [10.9924, 76.9766],
              [10.9724, 76.9866],
              [10.9624, 76.9766],
            ],
            risk: "Medium",
          },
          {
            name: "Peelamedu",
            coords: [
              [11.0024, 76.9966],
              [11.0124, 77.0066],
              [10.9924, 77.0166],
              [10.9824, 77.0066],
            ],
            risk: "High",
          },
        ]

        regions.forEach((region) => {
          const color = region.risk === "High" ? "#ef4444" : region.risk === "Medium" ? "#eab308" : "#22c55e"

          L.polygon(region.coords, {
            color,
            fillColor: color,
            fillOpacity: 0.3,
            weight: 2,
          })
            .bindPopup(`<b>${region.name}</b><br>${region.risk} Risk Area`)
            .addTo(mapRef.current!)
        })
        break

      default: // hotspots
        // Add circle markers for each hotspot
        hotspots.forEach((spot) => {
          let color
          if (spot.probability >= 0.8)
            color = "#ef4444" // red
          else if (spot.probability >= 0.5)
            color = "#eab308" // yellow
          else color = "#22c55e" // green

          L.circleMarker([spot.latitude, spot.longitude], {
            radius: 8 + spot.probability * 10,
            color,
            fillColor: color,
            fillOpacity: 0.6,
            weight: 2,
          })
            .bindPopup(`
            <b>Hotspot ID: ${spot.id}</b><br>
            Probability: ${(spot.probability * 100).toFixed(2)}%<br>
            Location: [${spot.latitude.toFixed(6)}, ${spot.longitude.toFixed(6)}]
          `)
            .addTo(mapRef.current!)
        })
    }
  }

  return <div ref={mapContainerRef} className="w-full h-full" />
}

