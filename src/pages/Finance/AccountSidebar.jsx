"use client"

import { useState } from "react"
import "./AccountSidebar.css"

const AccountSidebar = () => {
  const [expandedItems, setExpandedItems] = useState({
    asset: false,
    currentAsset: false,
    fixedAsset: false,
    accountsReceivable: false,
    cashInHand: false,
    bank: false,
    inventoryInHand: false,
    advancesLoan: false,
    taxReceivable: false,
    landBuilding: false,
    plantMachinery: false,
    furnitureFix: false,
    officeEquipment: false,
    vehicles: false,
    liability: false,
    currentLiability: false,
    accountsPayable: false,
    taxPayables: false,
    outwardClearing: false,
    longTermLiability: false,
    equity: false,
    openingBalances: false,
    paidUpCapital: false,
    retainedEarnings: false,
    revenue: false,
    income: false,
    localSale: false,
    exportSale: false,
    otherIncomes: false,
    otherIncome: false,
    expense: false,
    costOfGoodsSold: false,
    inventoryCost: false,
    conversionCost: false,
    financialExpense: false,
    financialExpenses: false,
    factoryOverHeads: false,
    administrativeExpense: false,
    sellingExpense: false,
    depreciationExpenses: false,
    gainLossAccount: false,
    landedCost: false,
  })

  const toggleExpanded = (item) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }))
  }

  const accountData = {
    asset: {
      name: "ASSET",
      children: {
        currentAsset: {
          name: "CURRENT ASSET",
          children: {
            accountsReceivable: {
              name: "ACCOUNTS RECEIVABLE",
              children: {
                interCompanyAsset: { name: "INTER COMPANY ASSET" },
                assetAccount: { name: "ASSET ACCOUNT" },
                cashReceivable: { name: "CASH & CASH RECEIVABLE" },
              },
            },
            cashInHand: {
              name: "CASH IN HAND",
              children: {
                cashInHandMain: { name: "CASH IN HAND MAIN" },
                pettyCash: { name: "PETTY CASH ACCOUNT" },
              },
            },
            selfCash: { name: "SELF CASH" },
            bank: {
              name: "BANK",
              children: {
                inwardClearing: { name: "INWARD CLEARING CHEQUE" },
                meezanBank: { name: "MEEZAN BANK" },
                hblAccount: { name: "HBL ACCOUNT" },
                ublBank: { name: "UBL BANK" },
                alliedBank: { name: "ALLIED BANK" },
                selfBank: { name: "SELF BANK" },
              },
            },
            inventoryInHand: {
              name: "INVENTORY IN HAND",
              children: {
                rawMaterial: { name: "RAW MATERIAL STOCK" },
                wipStock: { name: "W.I.P STOCK" },
                finishedGoods: { name: "FINISHED GOODS STOCK" },
                looseTools: { name: "LOOSE TOOLS" },
              },
            },
            advancesLoan: {
              name: "ADVANCES & LOAN",
              children: {
                securityDeposit: { name: "SECURITY DEPOSIT" },
                advanceToEmployees: { name: "ADVANCE TO EMPLOYEES" },
                loanToEmployees: { name: "LOAN TO EMPLOYEES" },
                vendorAdvances: { name: "VENDOR ADVANCES" },
                longTermLoans: { name: "LONG TERM LOANS" },
              },
            },
            taxReceivable: {
              name: "TAX RECEIVABLE",
              children: {
                whtReceivable: { name: "WHT RECEIVABLE ACCOUNT" },
                withholdingTax: { name: "WITHHOLDING TAX RECEIVABLE" },
                gstPurchases: { name: "GST ON PURCHASES" },
                vatPurchase: { name: "VAT ON PURCHASE" },
              },
            },
          },
        },
        fixedAsset: {
          name: "FIXED ASSET",
          children: {
            landBuilding: {
              name: "LAND & BUILDING",
              children: {
                landBuilding: { name: "LAND & BUILDING" },
                officeProperty: { name: "OFFICE PROPERTY" },
              },
            },
            plantMachinery: {
              name: "PLANT & MACHINERY",
              children: {
                utilityMachinery: { name: "UTILITY MACHINERY" },
                generalMachinery: { name: "GENERAL MACHINERY" },
                electricMachines: { name: "ELECTRIC & OTHERS MACHINES" },
              },
            },
            furnitureFix: {
              name: "FURNITURE & FIXTURE",
              children: {
                officeTables: { name: "OFFICE TABLES" },
                officeChairs: { name: "OFFICE CHAIRS" },
                officeFurniture: { name: "OFFICE FURNITURE" },
              },
            },
            officeEquipment: {
              name: "OFFICE EQUIPMENT",
              children: {
                laptops: { name: "LAPTOPS" },
                computerAcc: { name: "COMPUTER & ACCESSORIES" },
                airConditioner: { name: "AIR CONDITIONER" },
                electricalEquip: { name: "ELECTRICAL EQUIPMENTS" },
              },
            },
            vehicles: {
              name: "VEHICLES",
              children: {
                motorCars: { name: "MOTOR CARS" },
                motorCycles: { name: "MOTOR CYCLES" },
                factoryVehicles: { name: "FACTORY VEHICLES" },
              },
            },
            accumulatedDep: { name: "ACCUMULATED DEPRECIATION" },
          },
        },
      },
    },
    liability: {
      name: "LIABILITY",
      children: {
        currentLiability: {
          name: "CURRENT LIABILITY",
          children: {
            accountsPayable: {
              name: "ACCOUNTS PAYABLE",
              children: {
                unbilledPayable: { name: "UNBILLED PAYABLE" },
                interCompanyPayable: { name: "INTER COMPANY PAYABLE ACCOUNT" },
                employeeReimbursement: { name: "EMPLOYEE REIMBURSEMENT PAYABLE" },
                supplierPayable: { name: "SUPPLIER PAYABLE" },
                advanceReceived: { name: "ADVANCE RECEIVED FROM CUSTOMERS" },
                employeeSalary: { name: "EMPLOYEE SALARY PAYABLE" },
                fohApplied: { name: "FOH APPLIED PAYABLE" },
              },
            },
            taxPayables: {
              name: "TAX PAYABLES",
              children: {
                furtherTaxPayable: { name: "FURTHER TAX PAYABLE" },
                advanceIncomeTax: { name: "ADVANCE INCOME TAX PAYABLE" },
                incomeTaxProfit: { name: "INCOME TAX ON PROFIT OF COMPANY" },
                gstSales: { name: "GST ON SALES" },
                vatSales: { name: "VAT ON SALES" },
                whtPayable: { name: "WHT PAYABLE ACCOUNT" },
              },
            },
            outwardClearing: {
              name: "OUTWARD CLEARING CHEQUES",
              children: {
                outwardClearingCheque: { name: "OUTWARD CLEARING CHEQUE" },
              },
            },
          },
        },
        longTermLiability: {
          name: "LONG TERM LIABILITY",
          children: {
            longTermLiabilities: { name: "LONG TERM LIABILITIES" },
          },
        },
      },
    },
    equity: {
      name: "STOCKHOLDER EQUITY",
      children: {
        openingBalances: {
          name: "OPENING BALANCES EQUITY",
          children: {
            openingStock: { name: "OPENING STOCK" },
            openingSupplierPayables: { name: "OPENING SUPPLIER PAYABLES" },
            openingCustomersReceivable: { name: "OPENING CUSTOMERS RECEIVABLE" },
            openingCash: { name: "OPENING CASH" },
            drawings: { name: "DRAWINGS" },
            openingFixedAssets: { name: "OPENING FIXED ASSETS" },
          },
        },
        paidUpCapital: {
          name: "PAID UP CAPITAL",
          children: {
            openingPaidUpCapital: { name: "OPENING PAID UP CAPITAL" },
            parkingAccount: { name: "PARKING ACCOUNT" },
          },
        },
        retainedEarnings: {
          name: "RETAINED EARNINGS",
          children: {
            retainedEarning: { name: "RETAINED EARNING" },
          },
        },
      },
    },
    revenue: {
      name: "REVENUE",
      children: {
        income: {
          name: "INCOME",
          children: {
            localSale: {
              name: "LOCAL SALE",
              children: {
                localSales: { name: "LOCAL SALES" },
              },
            },
            exportSale: {
              name: "EXPORT SALE",
              children: {
                exportSale: { name: "EXPORT SALE" },
              },
            },
            otherIncomes: {
              name: "OTHER INCOMES",
              children: {
                otherIncome: {
                  name: "OTHER INCOME",
                  children: {
                    rebateIncome: { name: "REBATE INCOME" },
                    servicesIncome: { name: "SERVICES INCOME" },
                    commissionIncome: { name: "COMMISSION INCOME" },
                    investmentIncome: { name: "INVESTMENT INCOME" },
                    purchaseDiscount: { name: "PURCHASE DISCOUNT" },
                  },
                },
              },
            },
          },
        },
      },
    },
    expense: {
      name: "EXPENSE",
      children: {
        costOfGoodsSold: {
          name: "COST OF GOODS SOLD",
          children: {
            inventoryCost: {
              name: "INVENTORY COST",
              children: {
                cgsFinishedMaterial: { name: "CGS - FINISHED MATERIAL" },
                cgsRawMaterial: { name: "CGS - RAW MATERIAL" },
                repairMaintExp: { name: "REPAIR & MAINT EXP (FACTORY)" },
                servicesCost: { name: "SERVICES - COST" },
                depreciationMachinery: { name: "DEPRECIATION OF MACHINERY" },
              },
            },
            conversionCost: {
              name: "CONVERSION COST",
              children: {
                cmtCharges: { name: "CMT CHARGES" },
                processingOverhead: { name: "PROCESSING OVERHEAD" },
                fohAppliedExp: { name: "FOH APPLIED EXP" },
              },
            },
          },
        },
        financialExpense: {
          name: "FINANCIAL EXPENSE",
          children: {
            financialExpenses: {
              name: "FINANCIAL EXPENSES",
              children: {
                whtaxExport: { name: "W.H TAX ON EXPORT" },
                localBankCharges: { name: "LOCAL BANK CHARGES" },
                foreignBankCharges: { name: "FOREIGN BANK CHARGES" },
                whtaxLocal: { name: "W.H.TAX LOCAL" },
                generalSalesTaxExp: { name: "GENERAL SALES TAX EXP" },
              },
            },
          },
        },
        factoryOverHeads: {
          name: "FACTORY OVER HEADS",
          children: {
            localFreight: { name: "LOCAL FREIGHT" },
            discountOnSales: { name: "DISCOUNT ON SALES" },
            factoryRent: { name: "FACTORY RENT" },
            fuelCharges: { name: "FUEL CHARGES" },
            gasExpenses: { name: "GAS EXPENSES" },
            plumber: { name: "PLUMBER" },
            electrician: { name: "ELECTRICIAN" },
          },
        },
        administrativeExpense: {
          name: "ADMINISTRATIVE EXPENSE",
          children: {
            electricityExp: { name: "ELECTRICITY EXP" },
            auditExpenses: { name: "AUDIT EXPENSES" },
            salariesBenefitsExp: { name: "SALARIES & BENEFITS EXP" },
            socialSecurity: { name: "SOCIAL SECURITY" },
            eobi: { name: "EOBI" },
            dailyWagesExp: { name: "DAILY WAGES EXP" },
            postageTelephone: { name: "POSTAGE & TELEPHONE" },
            printingStationeryExp: { name: "PRINTING & STATIONERY EXP" },
            telephoneInternetExp: { name: "TELEPHONE & INTERNET EXP" },
          },
        },
        sellingExpense: {
          name: "SELLING EXPENSE",
          children: {
            freightCrriage: { name: "FREIGHT & CRRIAGE (LOCAL SALE)" },
            loadingUnloading: { name: "LOADING & UNLOADING EXP" },
            advertismentExpense: { name: "ADVERTISMENT EXPENSE" },
          },
        },
        depreciationExpenses: {
          name: "DEPRECIATION EXPENSES",
          children: {
            depreciationExpense: { name: "DEPRECIATION EXPENSE" },
          },
        },
        gainLossAccount: {
          name: "GAIN /LOSS ACCOUNT",
          children: {
            gainLossAssetDisposal: { name: "GAIN / LOSS ON ASSET DISPOSAL" },
            gainLossExchangeRate: { name: "GAIN / LOSS ON EXCHANGE RATE" },
          },
        },
        landedCost: {
          name: "LANDED COST",
          children: {
            seaFreightExp: { name: "SEA FREIGHT EXP" },
            customClearanceExp: { name: "CUSTOM CLEARANCE EXP" },
            deliveryOrderExp: { name: "DELIVERY ORDER EXP" },
            portCharges: { name: "PORT CHARGES" },
            localTransportationCharges: { name: "LOCAL TRANSPORTATION CHARGES" },
            otherExpenses: { name: "OTHER EXPENSES" },
            demurrageCharges: { name: "DEMURRAGE CHARGES" },
          },
        },
      },
    },
  }

  const renderTreeItem = (key, item, level = 0) => {
    if (!item) return null

    const hasChildren = item.children && Object.keys(item.children).length > 0
    const isExpanded = expandedItems[key]

    return (
      <div key={key} className="sidebar-item" style={{ marginLeft: `${level * 20}px` }}>
        <div
          className={`sidebar-item-header ${isExpanded ? "expanded" : ""}`}
          onClick={() => hasChildren && toggleExpanded(key)}
        >
          <span className="expand-icon">{hasChildren ? (isExpanded ? "▼" : "▶") : ""}</span>
          <span className="folder-icon">📁</span>
          <span className="item-text">{item.name}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className="sidebar-children">
            {Object.entries(item.children).map(([childKey, childItem]) =>
              renderTreeItem(childKey, childItem, level + 1),
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="account-sidebar">
      <span className="sidebar-title">Chart of Accounts</span>
      <hr className="divider" />
      {renderTreeItem("asset", accountData.asset)}
      {renderTreeItem("liability", accountData.liability)}
      {renderTreeItem("equity", accountData.equity)}
      {renderTreeItem("revenue", accountData.revenue)}
      {renderTreeItem("expense", accountData.expense)}
    </div>
  )
}

export default AccountSidebar
