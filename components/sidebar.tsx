"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Home, MapPin, PieChart, Settings, AlertTriangle, Database } from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Map View", href: "/map", icon: MapPin },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Model Metrics", href: "/model-metrics", icon: PieChart },
  { name: "Data Explorer", href: "/data-explorer", icon: Database },
  { name: "Incident Reports", href: "/incidents", icon: AlertTriangle },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen bg-card border-r border-border overflow-y-auto transition-all duration-300 ease-in-out">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary">Crime Hotspot Analysis</h1>
        <p className="text-sm text-muted-foreground mt-1">Coimbatore City Police</p>
      </div>
      <nav className="px-4 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm transition-colors relative group",
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-primary-foreground hover:bg-primary/10",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 right-0 top-0 bottom-0 bg-primary rounded-md -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

