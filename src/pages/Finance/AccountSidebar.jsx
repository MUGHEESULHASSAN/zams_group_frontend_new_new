"use client"

import { useState } from "react"
import "./AccountSidebar.css"

const AccountSidebar = () => {
  const [expandedItems, setExpandedItems] = useState({
    asset: false,
    currentAsset: false,
    cashAndCashEquivalents: false,
    accountsReceivable: false,
    inventory: false,
    prepaidExpenses: false,
    otherCurrentAssets: false,
    nonCurrentAssets: false,
    propertyPlantEquipment: false,
    intangibleAssets: false,
    longTermInvestments: false,
    otherNonCurrentAssets: false,
    liability: false,
    currentLiabilities: false,
    accountsPayable: false,
    shortTermBorrowings: false,
    accruedExpenses: false,
    taxesPayable: false,
    otherCurrentLiabilities: false,
    nonCurrentLiabilities: false,
    longTermDebt: false,
    deferredTaxLiabilities: false,
    employeeBenefits: false,
    otherNonCurrentLiabilities: false,
    equity: false,
    shareCapital: false,
    reserves: false,
    retainedEarnings: false,
    otherEquity: false,
    revenue: false,
    operatingRevenue: false,
    salesRevenue: false,
    serviceRevenue: false,
    otherIncome: false,
    financialIncome: false,
    miscellaneousIncome: false,
    costOfGoodsSold: false,
    directCosts: false,
    rawMaterialsCost: false,
    directLabor: false,
    directExpenses: false,
    manufacturingOverheads: false,
    operatingExpenses: false,
    sellingExpenses: false,
    administrativeExpenses: false,
    otherAccounts: false,
    financialExpenses: false,
    extraordinaryItems: false,
    taxExpenses: false,
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
      code: "1000",
      children: {
        currentAsset: {
          name: "CURRENT ASSET",
          code: "1100",
          children: {
            cashAndCashEquivalents: {
              name: "CASH AND CASH EQUIVALENTS",
              code: "1110",
              children: {
                cashInHand: { name: "CASH IN HAND", code: "1111" },
                cashAtBank: { name: "CASH AT BANK", code: "1112" },
                shortTermInvestments: { name: "SHORT TERM INVESTMENTS", code: "1113" },
              },
            },
            accountsReceivable: {
              name: "ACCOUNTS RECEIVABLE",
              code: "1120",
              children: {
                tradeDebtors: { name: "TRADE DEBTORS", code: "1121" },
                allowanceForDoubtfulDebts: { name: "ALLOWANCE FOR DOUBTFUL DEBTS", code: "1122" },
                advancesToSuppliers: { name: "ADVANCES TO SUPPLIERS", code: "1123" },
                advancesToEmployees: { name: "ADVANCES TO EMPLOYEES", code: "1124" },
                otherReceivables: { name: "OTHER RECEIVABLES", code: "1125" },
              },
            },
            inventory: {
              name: "INVENTORY",
              code: "1130",
              children: {
                rawMaterials: { name: "RAW MATERIALS", code: "1131" },
                workInProgress: { name: "WORK IN PROGRESS", code: "1132" },
                finishedGoods: { name: "FINISHED GOODS", code: "1133" },
                tradingStock: { name: "TRADING STOCK", code: "1134" },
                consumableStores: { name: "CONSUMABLE STORES", code: "1135" },
              },
            },
            prepaidExpenses: {
              name: "PREPAID EXPENSES",
              code: "1140",
              children: {
                prepaidRent: { name: "PREPAID RENT", code: "1141" },
                prepaidInsurance: { name: "PREPAID INSURANCE", code: "1142" },
                prepaidUtilities: { name: "PREPAID UTILITIES", code: "1143" },
                otherPrepaidExpenses: { name: "OTHER PREPAID EXPENSES", code: "1144" },
              },
            },
            otherCurrentAssets: {
              name: "OTHER CURRENT ASSETS",
              code: "1150",
              children: {
                taxRefundsDue: { name: "TAX REFUNDS DUE", code: "1151" },
                accrualReceivables: { name: "ACCRUAL RECEIVABLES", code: "1152" },
                miscCurrentAssets: { name: "MISCELLANEOUS CURRENT ASSETS", code: "1153" },
              },
            },
          },
        },
        nonCurrentAssets: {
          name: "NON-CURRENT ASSETS",
          code: "1200",
          children: {
            propertyPlantEquipment: {
              name: "PROPERTY, PLANT & EQUIPMENT",
              code: "1210",
              children: {
                land: { name: "LAND", code: "1211" },
                buildings: { name: "BUILDINGS", code: "1212" },
                plantAndMachinery: { name: "PLANT AND MACHINERY", code: "1213" },
                furnitureAndFixtures: { name: "FURNITURE AND FIXTURES", code: "1214" },
                officeEquipment: { name: "OFFICE EQUIPMENT", code: "1215" },
                motorVehicles: { name: "MOTOR VEHICLES", code: "1216" },
                accumulatedDepreciation: { name: "ACCUMULATED DEPRECIATION", code: "1217" },
              },
            },
            intangibleAssets: {
              name: "INTANGIBLE ASSETS",
              code: "1220",
              children: {
                goodwill: { name: "GOODWILL", code: "1221" },
                patents: { name: "PATENTS", code: "1222" },
                trademarks: { name: "TRADEMARKS", code: "1223" },
                software: { name: "SOFTWARE", code: "1224" },
                accumulatedAmortization: { name: "ACCUMULATED AMORTIZATION", code: "1225" },
              },
            },
            longTermInvestments: {
              name: "LONG TERM INVESTMENTS",
              code: "1230",
              children: {
                investmentInSubsidiaries: { name: "INVESTMENT IN SUBSIDIARIES", code: "1231" },
                investmentInAssociates: { name: "INVESTMENT IN ASSOCIATES", code: "1232" },
                longTermSecurities: { name: "LONG TERM SECURITIES", code: "1233" },
              },
            },
            otherNonCurrentAssets: {
              name: "OTHER NON-CURRENT ASSETS",
              code: "1240",
              children: {
                longTermLoansAndAdvances: { name: "LONG TERM LOANS AND ADVANCES", code: "1241" },
                deferredTaxAssets: { name: "DEFERRED TAX ASSETS", code: "1242" },
                capitalWorkInProgress: { name: "CAPITAL WORK IN PROGRESS", code: "1243" },
              },
            },
          },
        },
      },
    },
    liability: {
      name: "LIABILITY",
      code: "2000",
      children: {
        currentLiabilities: {
          name: "CURRENT LIABILITIES",
          code: "2100",
          children: {
            accountsPayable: {
              name: "ACCOUNTS PAYABLE",
              code: "2110",
              children: {
                tradeCreditors: { name: "TRADE CREDITORS", code: "2111" },
                billsPayable: { name: "BILLS PAYABLE", code: "2112" },
                accrualPayables: { name: "ACCRUAL PAYABLES", code: "2113" },
                advancesFromCustomers: { name: "ADVANCES FROM CUSTOMERS", code: "2114" },
              },
            },
            shortTermBorrowings: {
              name: "SHORT TERM BORROWINGS",
              code: "2120",
              children: {
                bankOverdraft: { name: "BANK OVERDRAFT", code: "2121" },
                shortTermLoans: { name: "SHORT TERM LOANS", code: "2122" },
                currentPortionLongTermDebt: { name: "CURRENT PORTION OF LONG TERM DEBT", code: "2123" },
              },
            },
            accruedExpenses: {
              name: "ACCRUED EXPENSES",
              code: "2130",
              children: {
                salariesAndWagesPayable: { name: "SALARIES AND WAGES PAYABLE", code: "2131" },
                interestPayable: { name: "INTEREST PAYABLE", code: "2132" },
                utilitiesPayable: { name: "UTILITIES PAYABLE", code: "2133" },
                rentPayable: { name: "RENT PAYABLE", code: "2134" },
              },
            },
            taxesPayable: {
              name: "TAXES PAYABLE",
              code: "2140",
              children: {
                incomeTaxPayable: { name: "INCOME TAX PAYABLE", code: "2141" },
                salesTaxPayable: { name: "SALES TAX PAYABLE", code: "2142" },
                withholdingTaxPayable: { name: "WITHHOLDING TAX PAYABLE", code: "2143" },
                providentFundPayable: { name: "PROVIDENT FUND PAYABLE", code: "2144" },
              },
            },
            otherCurrentLiabilities: {
              name: "OTHER CURRENT LIABILITIES",
              code: "2150",
              children: {
                dividendsPayable: { name: "DIVIDENDS PAYABLE", code: "2151" },
                provisionsForWarranties: { name: "PROVISIONS FOR WARRANTIES", code: "2152" },
                miscCurrentLiabilities: { name: "MISCELLANEOUS CURRENT LIABILITIES", code: "2153" },
              },
            },
          },
        },
        nonCurrentLiabilities: {
          name: "NON-CURRENT LIABILITIES",
          code: "2200",
          children: {
            longTermDebt: {
              name: "LONG TERM DEBT",
              code: "2210",
              children: {
                longTermBankLoans: { name: "LONG TERM BANK LOANS", code: "2211" },
                bonds: { name: "BONDS", code: "2212" },
                mortgagePayable: { name: "MORTGAGE PAYABLE", code: "2213" },
              },
            },
            deferredTaxLiabilities: {
              name: "DEFERRED TAX LIABILITIES",
              code: "2220",
              children: {
                deferredTaxLiability: { name: "DEFERRED TAX LIABILITY", code: "2221" },
              },
            },
            employeeBenefits: {
              name: "EMPLOYEE BENEFITS",
              code: "2230",
              children: {
                gratuityPayable: { name: "GRATUITY PAYABLE", code: "2231" },
                pensionObligations: { name: "PENSION OBLIGATIONS", code: "2232" },
              },
            },
            otherNonCurrentLiabilities: {
              name: "OTHER NON-CURRENT LIABILITIES",
              code: "2240",
              children: {
                longTermProvisions: { name: "LONG TERM PROVISIONS", code: "2241" },
                miscNonCurrentLiabilities: { name: "MISCELLANEOUS NON-CURRENT LIABILITIES", code: "2242" },
              },
            },
          },
        },
      },
    },
    equity: {
      name: "EQUITY",
      code: "3000",
      children: {
        shareCapital: {
          name: "SHARE CAPITAL",
          code: "3100",
          children: {
            authorizedCapital: { name: "AUTHORIZED CAPITAL", code: "3101" },
            issuedCapital: { name: "ISSUED CAPITAL", code: "3102" },
            paidUpCapital: { name: "PAID UP CAPITAL", code: "3103" },
          },
        },
        reserves: {
          name: "RESERVES",
          code: "3200",
          children: {
            capitalReserves: { name: "CAPITAL RESERVES", code: "3201" },
            revenueReserves: { name: "REVENUE RESERVES", code: "3202" },
            generalReserves: { name: "GENERAL RESERVES", code: "3203" },
          },
        },
        retainedEarnings: {
          name: "RETAINED EARNINGS",
          code: "3300",
          children: {
            unappropriatedProfit: { name: "UNAPPROPRIATED PROFIT", code: "3301" },
            accumulatedLosses: { name: "ACCUMULATED LOSSES", code: "3302" },
          },
        },
        otherEquity: {
          name: "OTHER EQUITY",
          code: "3400",
          children: {
            treasuryShares: { name: "TREASURY SHARES", code: "3401" },
            foreignCurrencyTranslation: { name: "FOREIGN CURRENCY TRANSLATION RESERVE", code: "3402" },
          },
        },
      },
    },
    revenue: {
      name: "REVENUE",
      code: "4000",
      children: {
        operatingRevenue: {
          name: "OPERATING REVENUE",
          code: "4100",
          children: {
            salesRevenue: {
              name: "SALES REVENUE",
              code: "4110",
              children: {
                localSales: { name: "LOCAL SALES", code: "4111" },
                exportSales: { name: "EXPORT SALES", code: "4112" },
                salesReturns: { name: "SALES RETURNS", code: "4113" },
                salesDiscounts: { name: "SALES DISCOUNTS", code: "4114" },
              },
            },
            serviceRevenue: {
              name: "SERVICE REVENUE",
              code: "4120",
              children: {
                consultingRevenue: { name: "CONSULTING REVENUE", code: "4121" },
                maintenanceRevenue: { name: "MAINTENANCE REVENUE", code: "4122" },
                commissionIncome: { name: "COMMISSION INCOME", code: "4123" },
              },
            },
          },
        },
        otherIncome: {
          name: "OTHER INCOME",
          code: "4200",
          children: {
            financialIncome: {
              name: "FINANCIAL INCOME",
              code: "4210",
              children: {
                interestIncome: { name: "INTEREST INCOME", code: "4211" },
                dividendIncome: { name: "DIVIDEND INCOME", code: "4212" },
                gainOnInvestments: { name: "GAIN ON INVESTMENTS", code: "4213" },
              },
            },
            miscellaneousIncome: {
              name: "MISCELLANEOUS INCOME",
              code: "4220",
              children: {
                rentalIncome: { name: "RENTAL INCOME", code: "4221" },
                gainOnAssetDisposal: { name: "GAIN ON ASSET DISPOSAL", code: "4222" },
                foreignExchangeGain: { name: "FOREIGN EXCHANGE GAIN", code: "4223" },
                otherMiscIncome: { name: "OTHER MISCELLANEOUS INCOME", code: "4224" },
              },
            },
          },
        },
      },
    },
    costOfGoodsSold: {
      name: "COST OF GOODS SOLD",
      code: "5000",
      children: {
        directCosts: {
          name: "DIRECT COSTS",
          code: "5100",
          children: {
            rawMaterialsCost: {
              name: "RAW MATERIALS COST",
              code: "5110",
              children: {
                openingRawMaterials: { name: "OPENING RAW MATERIALS", code: "5111" },
                purchasesRawMaterials: { name: "PURCHASES - RAW MATERIALS", code: "5112" },
                closingRawMaterials: { name: "CLOSING RAW MATERIALS", code: "5113" },
              },
            },
            directLabor: {
              name: "DIRECT LABOR",
              code: "5120",
              children: {
                wagesProduction: { name: "WAGES - PRODUCTION", code: "5121" },
                overtimeProduction: { name: "OVERTIME - PRODUCTION", code: "5122" },
                bonusesProduction: { name: "BONUSES - PRODUCTION", code: "5123" },
              },
            },
            directExpenses: {
              name: "DIRECT EXPENSES",
              code: "5130",
              children: {
                powerAndFuel: { name: "POWER AND FUEL", code: "5131" },
                factorySupplies: { name: "FACTORY SUPPLIES", code: "5132" },
                maintenanceFactory: { name: "MAINTENANCE - FACTORY", code: "5133" },
              },
            },
          },
        },
        manufacturingOverheads: {
          name: "MANUFACTURING OVERHEADS",
          code: "5200",
          children: {
            indirectMaterials: { name: "INDIRECT MATERIALS", code: "5201" },
            indirectLabor: { name: "INDIRECT LABOR", code: "5202" },
            factoryRent: { name: "FACTORY RENT", code: "5203" },
            factoryInsurance: { name: "FACTORY INSURANCE", code: "5204" },
            depreciationFactory: { name: "DEPRECIATION - FACTORY", code: "5205" },
          },
        },
      },
    },
    operatingExpenses: {
      name: "OPERATING EXPENSES",
      code: "6000",
      children: {
        sellingExpenses: {
          name: "SELLING EXPENSES",
          code: "6100",
          children: {
            advertisingExpenses: { name: "ADVERTISING EXPENSES", code: "6101" },
            salesCommissions: { name: "SALES COMMISSIONS", code: "6102" },
            deliveryExpenses: { name: "DELIVERY EXPENSES", code: "6103" },
            salesPromotions: { name: "SALES PROMOTIONS", code: "6104" },
            marketingExpenses: { name: "MARKETING EXPENSES", code: "6105" },
          },
        },
        administrativeExpenses: {
          name: "ADMINISTRATIVE EXPENSES",
          code: "6200",
          children: {
            salariesAdmin: { name: "SALARIES - ADMINISTRATIVE", code: "6201" },
            officeRent: { name: "OFFICE RENT", code: "6202" },
            officeSupplies: { name: "OFFICE SUPPLIES", code: "6203" },
            utilitiesOffice: { name: "UTILITIES - OFFICE", code: "6204" },
            insuranceOffice: { name: "INSURANCE - OFFICE", code: "6205" },
            depreciationOffice: { name: "DEPRECIATION - OFFICE", code: "6206" },
            professionalFees: { name: "PROFESSIONAL FEES", code: "6207" },
            auditFees: { name: "AUDIT FEES", code: "6208" },
            legalFees: { name: "LEGAL FEES", code: "6209" },
            bankCharges: { name: "BANK CHARGES", code: "6210" },
          },
        },
      },
    },
    otherAccounts: {
      name: "OTHER ACCOUNTS",
      code: "7000",
      children: {
        financialExpenses: {
          name: "FINANCIAL EXPENSES",
          code: "7100",
          children: {
            interestExpense: { name: "INTEREST EXPENSE", code: "7101" },
            bankChargesFinancial: { name: "BANK CHARGES - FINANCIAL", code: "7102" },
            foreignExchangeLoss: { name: "FOREIGN EXCHANGE LOSS", code: "7103" },
            lossOnInvestments: { name: "LOSS ON INVESTMENTS", code: "7104" },
          },
        },
        extraordinaryItems: {
          name: "EXTRAORDINARY ITEMS",
          code: "7200",
          children: {
            extraordinaryIncome: { name: "EXTRAORDINARY INCOME", code: "7201" },
            extraordinaryExpenses: { name: "EXTRAORDINARY EXPENSES", code: "7202" },
            priorPeriodAdjustments: { name: "PRIOR PERIOD ADJUSTMENTS", code: "7203" },
          },
        },
        taxExpenses: {
          name: "TAX EXPENSES",
          code: "7300",
          children: {
            currentTaxExpense: { name: "CURRENT TAX EXPENSE", code: "7301" },
            deferredTaxExpense: { name: "DEFERRED TAX EXPENSE", code: "7302" },
            penaltiesAndFines: { name: "PENALTIES AND FINES", code: "7303" },
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
      {renderTreeItem("costOfGoodsSold", accountData.costOfGoodsSold)}
      {renderTreeItem("operatingExpenses", accountData.operatingExpenses)}
      {renderTreeItem("otherAccounts", accountData.otherAccounts)}
    </div>
  )
}

export default AccountSidebar
