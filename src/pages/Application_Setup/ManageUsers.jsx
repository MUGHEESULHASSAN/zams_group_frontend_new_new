"use client"
import { useState } from "react"
import "./Classifications.css"
import UserManagement from "./UserManagement"
import SystemUsers from "./SystemUsers"

const ManageUsers = () => {
  const [currentView, setCurrentView] = useState("main")

  const userCards = [
    {
      id: 1,
      name: "Manage Users",
      icon: "👥",
      color: "green",
      view: "manage-users",
    },
    {
      id: 2,
      name: "System Users",
      icon: "⚙️",
      color: "green",
      view: "system-users",
    },
  ]

  const handleCardClick = (view) => {
    setCurrentView(view)
  }

  const handleBackToMain = () => {
    setCurrentView("main")
  }

  if (currentView === "manage-users") {
    return <UserManagement onBack={handleBackToMain} />
  }

  if (currentView === "system-users") {
    return <SystemUsers onBack={handleBackToMain} />
  } 

  // Placeholder for future user management components
  if (currentView !== "main") {
    return (
      <div>
        <button onClick={handleBackToMain} className="backbutton">
          ← Back to Manage Users
        </button>
        <div className="classifications-container">
          <div className="classifications-header">
            <h1>{userCards.find((card) => card.view === currentView)?.name || "User Management"}</h1>
          </div>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Management page for {userCards.find((card) => card.view === currentView)?.name} coming soon...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="classifications-container">
      <div className="classifications-header">
        <h1>Manage Users</h1>
      </div>
      <div className="classifications-grid">
        {userCards.map((card) => (
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

export default ManageUsers
