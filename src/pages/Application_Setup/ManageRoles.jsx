"use client"
import { useState } from "react"
import "./Classifications.css"

const ManageRoles = () => {
  const [currentView, setCurrentView] = useState("main")

  const roleCards = [
    {
      id: 1,
      name: "Roles",
      icon: "🎭",
      color: "green",
      view: "roles",
    },
    {
      id: 2,
      name: "Responsibilities",
      icon: "📋",
      color: "green",
      view: "responsibilities",
    },
  ]

  const handleCardClick = (view) => {
    setCurrentView(view)
    // For now, just log the clicked view - you can add specific management components later
    console.log(`Navigating to: ${view}`)
  }

  const handleBackToMain = () => {
    setCurrentView("main")
  }

  // Placeholder for future role management components
  if (currentView !== "main") {
    return (
      <div>
        <button onClick={handleBackToMain} className="back-btn">
          ← Back to Manage Roles
        </button>
        <div className="classifications-container">
          <div className="classifications-header">
            <h1>{roleCards.find((card) => card.view === currentView)?.name || "Role Management"}</h1>
          </div>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Management page for {roleCards.find((card) => card.view === currentView)?.name} coming soon...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="classifications-container">
      <div className="classifications-header">
        <h1>Manage Roles</h1>
      </div>
      <div className="classifications-grid">
        {roleCards.map((card) => (
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

export default ManageRoles
