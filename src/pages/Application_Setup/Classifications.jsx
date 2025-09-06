"use client"
import { useState } from "react"
import "./Classifications.css"
import RegionManagement from "./RegionManagement"
import ZoneManagement from "./ZoneManagement"
import TerritoryManagement from "./TerritoryManagement"
import AreaManagement from "./AreaManagement"
import RouteManagement from "./RouteManagement"

const Classifications = () => {
  const [currentView, setCurrentView] = useState("main")

  const classificationCards = [
    {
      id: 1,
      name: "Region",
      icon: "🌍",
      color: "blue",
      view: "region",
    },
    {
      id: 2,
      name: "Zone",
      icon: "📦",
      color: "teal",
      view: "zone",
    },
    {
      id: 3,
      name: "Territory",
      icon: "🏠",
      color: "green",
      view: "territory",
    },
    {
      id: 4,
      name: "Area",
      icon: "📊",
      color: "brown",
      view: "area",
    },
    {
      id: 5,
      name: "Route",
      icon: "🛣️",
      color: "orange",
      view: "route",
    },
  ]

  const handleCardClick = (view) => {
    setCurrentView(view)
  }

  const handleBackToMain = () => {
    setCurrentView("main")
  }

  if (currentView === "region") {
    return (
      <div>
        <button onClick={handleBackToMain} className="backbutton">
          ← Back to Classifications
        </button>
        <RegionManagement />
      </div>
    )
  }

  if (currentView === "zone") {
    return (
      <div>
        <button onClick={handleBackToMain} className="backbutton">
          ← Back to Classifications
        </button>
        <ZoneManagement />
      </div>
    )
  }

  if (currentView === "territory") {
    return (
      <div>
        <button onClick={handleBackToMain} className="backbutton">
          ← Back to Classifications
        </button>
        <TerritoryManagement />
      </div>
    )
  }

  if (currentView === "area") {
    return (
      <div>
        <button onClick={handleBackToMain} className="backbutton">
          ← Back to Classifications
        </button>
        <AreaManagement />
      </div>
    )
  }

  if (currentView === "route") {
    return (
      <div>
        <button onClick={handleBackToMain} className="backbutton">
          ← Back to Classifications
        </button>
        <RouteManagement />
      </div>
    )
  }

  return (
    <div className="classifications-container">
      <div className="classifications-header">
        <h1>Classifications</h1>
      </div>
      <div className="classifications-grid">
        {classificationCards.map((card) => (
          <div key={card.id} className="classification-card" onClick={() => handleCardClick(card.view)}>
            <div className={`card-icon ${card.color}`}>
              <span className="icon">{card.icon}</span>
            </div>
            <div className="card-label">{card.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Classifications
