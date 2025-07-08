"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { AlertCircle, Bell, HelpCircle, Info, Lock, Shield, User } from "lucide-react"

export default function SettingsPage() {
  const [formState, setFormState] = useState({
    enableNotifications: true,
    enableEmailAlerts: true,
    enableSms: false,
    darkMode: true,
    mapStyle: "satellite",
    defaultPage: "dashboard",
    probabilityThreshold: 70,
    refreshInterval: 30,
  })

  const handleSwitchChange = (field: string) => {
    setFormState({
      ...formState,
      [field]: !formState[field as keyof typeof formState],
    })
  }

  const handleInputChange = (field: string, value: any) => {
    setFormState({
      ...formState,
      [field]: value,
    })
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences and system settings</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interface Settings</CardTitle>
                <CardDescription>Customize your dashboard appearance and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable dark theme for the dashboard</p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={formState.darkMode}
                    onCheckedChange={() => handleSwitchChange("darkMode")}
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="map-style">Default Map Style</Label>
                  <Select value={formState.mapStyle} onValueChange={(value) => handleInputChange("mapStyle", value)}>
                    <SelectTrigger id="map-style">
                      <SelectValue placeholder="Select map style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="streets">Streets</SelectItem>
                      <SelectItem value="satellite">Satellite</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">Choose the default style for map visualizations</p>
                </div>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="default-page">Default Landing Page</Label>
                  <Select
                    value={formState.defaultPage}
                    onValueChange={(value) => handleInputChange("defaultPage", value)}
                  >
                    <SelectTrigger id="default-page">
                      <SelectValue placeholder="Select default page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="map">Map View</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="incidents">Incident Reports</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">Choose which page to show when you first log in</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Settings</CardTitle>
                <CardDescription>Configure how data is processed and displayed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="probability-threshold">Hotspot Probability Threshold</Label>
                    <span className="text-sm">{formState.probabilityThreshold}%</span>
                  </div>
                  <Slider
                    id="probability-threshold"
                    value={[formState.probabilityThreshold]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => handleInputChange("probabilityThreshold", value[0])}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Set the minimum probability to classify a location as a hotspot
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between">
                    <Label htmlFor="refresh-interval">Data Refresh Interval (minutes)</Label>
                    <span className="text-sm">{formState.refreshInterval} min</span>
                  </div>
                  <Slider
                    id="refresh-interval"
                    value={[formState.refreshInterval]}
                    min={5}
                    max={120}
                    step={5}
                    onValueChange={(value) => handleInputChange("refreshInterval", value[0])}
                  />
                  <p className="text-sm text-muted-foreground mt-1">How often to refresh data from the server</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-notifications">Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts about new hotspots and incidents</p>
                  </div>
                  <Switch
                    id="enable-notifications"
                    checked={formState.enableNotifications}
                    onCheckedChange={() => handleSwitchChange("enableNotifications")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-email">Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive important notifications via email</p>
                  </div>
                  <Switch
                    id="enable-email"
                    checked={formState.enableEmailAlerts}
                    onCheckedChange={() => handleSwitchChange("enableEmailAlerts")}
                    disabled={!formState.enableNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-sms">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive urgent notifications via SMS</p>
                  </div>
                  <Switch
                    id="enable-sms"
                    checked={formState.enableSms}
                    onCheckedChange={() => handleSwitchChange("enableSms")}
                    disabled={!formState.enableNotifications}
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input
                    id="notification-email"
                    type="email"
                    placeholder="your.email@example.com"
                    disabled={!formState.enableEmailAlerts || !formState.enableNotifications}
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <Label htmlFor="notification-phone">SMS Number</Label>
                  <Input
                    id="notification-phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    disabled={!formState.enableSms || !formState.enableNotifications}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Categories</CardTitle>
                <CardDescription>Select which types of alerts you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Hotspot Detected</Label>
                    <p className="text-sm text-muted-foreground">Alert when a new crime hotspot is identified</p>
                  </div>
                  <Switch checked={true} disabled={!formState.enableNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Incident Reports</Label>
                    <p className="text-sm text-muted-foreground">Alert when new incidents are reported</p>
                  </div>
                  <Switch checked={true} disabled={!formState.enableNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Updates</Label>
                    <p className="text-sm text-muted-foreground">Alert about system maintenance and updates</p>
                  </div>
                  <Switch checked={false} disabled={!formState.enableNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                  </div>
                  <Switch checked={true} disabled={!formState.enableNotifications} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" placeholder="John Doe" defaultValue="Officer John Smith" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    defaultValue="j.smith@coimbatore-police.gov.in"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue="crime-analysis">
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crime-analysis">Crime Analysis Unit</SelectItem>
                      <SelectItem value="patrol">Patrol Division</SelectItem>
                      <SelectItem value="investigation">Investigation Bureau</SelectItem>
                      <SelectItem value="administration">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="analyst">
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="analyst">Crime Analyst</SelectItem>
                      <SelectItem value="officer">Police Officer</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>

                <div className="pt-2">
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>Configure 2FA</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>Manage your active sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Windows 11 • Chrome • Coimbatore</p>
                        <p className="text-xs text-muted-foreground mt-1">Started: Today, 10:23 AM</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Mobile Session</p>
                        <p className="text-sm text-muted-foreground">Android • Chrome • Coimbatore</p>
                        <p className="text-xs text-muted-foreground mt-1">Started: Yesterday, 4:17 PM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Sign Out All Devices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>Get help with using the crime hotspot prediction system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4 flex gap-4">
                  <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Documentation</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Access comprehensive documentation about how to use the system, interpret data, and understand
                      predictions.
                    </p>
                    <Button variant="link" className="px-0 h-auto mt-2">
                      View Documentation
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4 flex gap-4">
                  <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Frequently Asked Questions</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Find answers to common questions about the crime hotspot prediction system.
                    </p>
                    <Button variant="link" className="px-0 h-auto mt-2">
                      View FAQs
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4 flex gap-4">
                  <User className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Contact Support</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Need additional help? Contact our support team for assistance.
                    </p>
                    <Button variant="link" className="px-0 h-auto mt-2">
                      Contact Support
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4 flex gap-4">
                  <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">System Information</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      View information about the current system version and updates.
                    </p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Version:</span> 2.4.1
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Last Updated:</span> March 15, 2024
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Model Version:</span> GradientBoost v3.2
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

