export const modelMetrics = {
  randomForest: {
    accuracy: 0.95,
    precisionClass0: 0.95,
    recallClass0: 0.89,
    f1ScoreClass0: 0.92,
    supportClass0: 64,
    precisionClass1: 0.95,
    recallClass1: 0.98,
    f1ScoreClass1: 0.96,
    supportClass1: 136,
  },
  gradientBoosting: {
    accuracy: 0.955,
    precisionClass0: 0.95,
    recallClass0: 0.91,
    f1ScoreClass0: 0.93,
    supportClass0: 64,
    precisionClass1: 0.96,
    recallClass1: 0.98,
    f1ScoreClass1: 0.97,
    supportClass1: 136,
  },
}

export const hotspotPredictions = [
  { id: 1, latitude: 10.947278, longitude: 76.899178, isHotspot: true, probability: 0.725553 },
  { id: 2, latitude: 10.947278, longitude: 76.915145, isHotspot: true, probability: 0.759176 },
  { id: 3, latitude: 10.947278, longitude: 76.931112, isHotspot: true, probability: 0.868036 },
  { id: 4, latitude: 10.947278, longitude: 76.947078, isHotspot: true, probability: 0.929873 },
  { id: 5, latitude: 10.947278, longitude: 76.963045, isHotspot: true, probability: 0.929873 },
  { id: 6, latitude: 10.963245, longitude: 76.878909, isHotspot: false, probability: 0.356787 },
  { id: 7, latitude: 10.925678, longitude: 76.912345, isHotspot: true, probability: 0.821543 },
  { id: 8, latitude: 10.981234, longitude: 76.945678, isHotspot: true, probability: 0.885432 },
  { id: 9, latitude: 10.979876, longitude: 76.961234, isHotspot: false, probability: 0.412345 },
  { id: 10, latitude: 10.932135, longitude: 76.917654, isHotspot: true, probability: 0.798653 },
]

export const monthlyIncidents = [
  { month: "Jan", incidents: 125, solved: 105 },
  { month: "Feb", incidents: 118, solved: 95 },
  { month: "Mar", incidents: 140, solved: 115 },
  { month: "Apr", incidents: 163, solved: 130 },
  { month: "May", incidents: 152, solved: 135 },
  { month: "Jun", incidents: 141, solved: 120 },
  { month: "Jul", incidents: 155, solved: 132 },
  { month: "Aug", incidents: 167, solved: 145 },
  { month: "Sep", incidents: 178, solved: 150 },
  { month: "Oct", incidents: 165, solved: 142 },
  { month: "Nov", incidents: 142, solved: 125 },
  { month: "Dec", incidents: 135, solved: 118 },
]

export const incidentTypeDistribution = [
  { type: "Robbery", value: 28 },
  { type: "Theft", value: 45 },
  { type: "Assault", value: 19 },
  { type: "Vandalism", value: 24 },
  { type: "Fraud", value: 14 },
  { type: "Other", value: 7 },
]

export const timeDistribution = [
  { time: "00:00-04:00", count: 23 },
  { time: "04:00-08:00", count: 14 },
  { time: "08:00-12:00", count: 18 },
  { time: "12:00-16:00", count: 34 },
  { time: "16:00-20:00", count: 42 },
  { time: "20:00-24:00", count: 38 },
]

export const incidents = [
  { id: 1, type: "Robbery", location: "Gandhi Nagar", date: "2024-02-15", time: "21:45", status: "Resolved" },
  { id: 2, type: "Theft", location: "R.S. Puram", date: "2024-02-18", time: "15:30", status: "Investigating" },
  { id: 3, type: "Assault", location: "Peelamedu", date: "2024-02-22", time: "23:15", status: "Resolved" },
  { id: 4, type: "Vandalism", location: "Saibaba Colony", date: "2024-02-25", time: "02:30", status: "Investigating" },
  { id: 5, type: "Theft", location: "Gandhipuram", date: "2024-03-01", time: "18:45", status: "Pending" },
  { id: 6, type: "Robbery", location: "Race Course", date: "2024-03-05", time: "22:10", status: "Resolved" },
  { id: 7, type: "Fraud", location: "Singanallur", date: "2024-03-07", time: "11:25", status: "Investigating" },
  { id: 8, type: "Assault", location: "Ukkadam", date: "2024-03-10", time: "01:15", status: "Pending" },
  { id: 9, type: "Vandalism", location: "Ganapathy", date: "2024-03-12", time: "04:50", status: "Investigating" },
  { id: 10, type: "Theft", location: "Ramanathapuram", date: "2024-03-15", time: "14:20", status: "Pending" },
]

export const coimbatoreRegions = [
  { id: 1, name: "Gandhipuram", riskLevel: "High" },
  { id: 2, name: "R.S. Puram", riskLevel: "Medium" },
  { id: 3, name: "Peelamedu", riskLevel: "High" },
  { id: 4, name: "Saibaba Colony", riskLevel: "Medium" },
  { id: 5, name: "Singanallur", riskLevel: "Low" },
  { id: 6, name: "Ukkadam", riskLevel: "High" },
  { id: 7, name: "Race Course", riskLevel: "Low" },
  { id: 8, name: "Ganapathy", riskLevel: "Medium" },
  { id: 9, name: "Ramanathapuram", riskLevel: "Medium" },
  { id: 10, name: "Saravanampatti", riskLevel: "Low" },
]

