"use client"
import { useState } from "react"
import "./Classifications.css"
import TaxItemsManagement from "./TaxItemsManagement"
import TaxTypesManagement from "./TaxTypesManagement"
import TaxGroupsManagement from "./TaxGroupsManagement"
import TaxControlAccountManagement from "./TaxAccountControlManagement"

const SetupTaxes = () => {
  const [currentView, setCurrentView] = useState("main")

  const taxCards = [
    {
      id: 1,
      name: "Tax Control Account",
      icon: "💰",
      color: "green",
      view: "tax-control-account",
    },
    {
      id: 2,
      name: "Tax Types",
      icon: "🚢",
      color: "green",
      view: "tax-types",
    },
    {
      id: 3,
      name: "Tax Items",
      icon: "🔗",
      color: "green",
      view: "tax-items",
    },
    {
      id: 4,
      name: "Tax Groups",
      icon: "📋",
      color: "green",
      view: "tax-groups",
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

  // Placeholder for future tax management components
  if (currentView !== "main") {
    if (currentView === "tax-items") {
      return (
        <div>
          <button onClick={handleBackToMain} className="backbutton">
            ← Back to Set Up Taxes
          </button>
          <TaxItemsManagement />
        </div>
      )
    }

    if (currentView === "tax-types") {
      return (
        <div>
          <button onClick={handleBackToMain} className="backbutton">
            ← Back to Set Up Taxes
          </button>
          <TaxTypesManagement />
        </div>
      )
    }

    if (currentView === "tax-groups") {
      return (
        <div>
          <button onClick={handleBackToMain} className="backbutton">
            ← Back to Set Up Taxes
          </button>
          <TaxGroupsManagement />
        </div>
      )
    }
    if (currentView === "tax-control-account") {
      return (
        <div>
            <button onClick={handleBackToMain} className="backbutton">
            ← Back to Set Up Taxes
            </button>
            <TaxControlAccountManagement />
        </div>
        )
    }

    return (
      <div>
        <button onClick={handleBackToMain} className="back-btn">
          ← Back to Set Up Taxes
        </button>
        <div className="classifications-container">
          <div className="classifications-header">
            <h1>{taxCards.find((card) => card.view === currentView)?.name || "Tax Management"}</h1>
          </div>
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Management page for {taxCards.find((card) => card.view === currentView)?.name} coming soon...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="classifications-container">
      <div className="classifications-header">
        <h1>Set Up Taxes</h1>
      </div>
      <div className="classifications-grid">
        {taxCards.map((card) => (
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

export default SetupTaxes
