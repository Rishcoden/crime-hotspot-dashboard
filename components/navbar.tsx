"use client"

import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card">
      <div className="relative flex items-center w-72">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="w-full pl-10 h-9 bg-background" />
      </div>

      <div className="flex items-center gap-4">
        <Button size="icon" variant="ghost">
          <Bell className="h-5 w-5" />
        </Button>
        <ModeToggle />
        <Button size="sm" variant="outline" className="gap-2">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </Button>
      </div>
    </header>
  )
}

