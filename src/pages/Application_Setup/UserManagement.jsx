"use client"
import { useState } from "react"
import "./UserManagement.css"

const UserManagement = ({ onBack }) => {
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedRole, setSelectedRole] = useState(null)
    const [activeTab, setActiveTab] = useState("Detail")
    const [expandedNodes, setExpandedNodes] = useState({})
    const [showAddResponsibilityModal, setShowAddResponsibilityModal] = useState(false)
    const [responsibilityFormData, setResponsibilityFormData] = useState({
        responsibilityName: "",
        title: "",
        sortOrder: "",
        selectForm: "",
        menuIcon: null,
    })
    const formOptions = [
        "Account Ledger",
        "Accounting Periods",
        "Accounting Preferences",
        "Accounts Closing - Retained Earning Entry",
        "Accounts Closing Balances",
        "Accounts Upload",
        "Budget Analysis",
        "Chart of Accounts",
        "Financial Reports",
        "General Journal",
    ]

    const [filteredFormOptions, setFilteredFormOptions] = useState(formOptions)
    const [formSearchTerm, setFormSearchTerm] = useState("")
    const [showAddMenuModal, setShowAddMenuModal] = useState(false)
    const [menuFormData, setMenuFormData] = useState({
        menuName: "",
        menuTitle: "",
        sortOrder: "",
        mennuPage: "",
        menuIcon: null,
    })
    const menuPages = [
        "Account Ledger",
        "Accounting Periods",
        "Accounting Preferences",
        "Accounts Closing - Retained Earning Entry",
        "Accounts Closing Balances",
        "Accounts Upload",
        "Budget Analysis",
        "Chart of Accounts",
        "Financial Reports",
        "General Journal",
    ]
    const [showAddRolesModal, setShowAddRolesModal] = useState(false)
    const [roleFormData, setRoleFormData] = useState({
        roleTitle: "",
        description: "",
        roleCenter: "",
        customizationRight: false,
        adminFlag: false,
        icon: null,
        batchNo: "",
    })
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        loginAccess: true,
        adminFlag: false,
        approveAdmin: false,
        effectiveFromDate: "06-SEP-2025",
    })


    const sampleUsers = [
        { id: 1, name: "ADMIN - Copied", selected: false },
        { id: 2, name: "MT007", selected: true },
        { id: 3, name: "DEV001 - Copied", selected: false },
        { id: 4, name: "ADMIN", selected: false },
        { id: 5, name: "DEV001", selected: false },
        { id: 6, name: "MT003", selected: false },
        { id: 7, name: "MT008", selected: false },
    ]

    const rolesHierarchy = {
        ADMINISTRATION: {
            "Application Setup": {},
            "LOVs Setup": {
                "List of Values": {},
                "Users List of Values": {},
                "Expense Category": {},
                "Cost Category": {},
            },
            "Manage Roles/Responsibilities": {
                Responsibilities: {},
                Menus: {},
            },
            Modules: {},
        },
    }

    const sampleMenus = [
        { id: 1, title: "Salesman Wise Daily Sale Report", selected: true, sortOrder: 1 },
        { id: 2, title: "Salesman Wise Cash Ledger", selected: false, sortOrder: 2 },
        { id: 3, title: "Home", selected: false, sortOrder: 3 },
        { id: 4, title: "Saleman Wise Daily Sale Order", selected: false, sortOrder: 4 },
    ]

    const tabs = ["Detail", "Assign Subsidiary", "Assign Locations", "Assign Departments", "Assign Classes"]

    const toggleNode = (nodePath) => {
        setExpandedNodes((prev) => ({
            ...prev,
            [nodePath]: !prev[nodePath],
        }))
    }

    const handleRoleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setRoleFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleResponsibilityInputChange = (e) => {
        const { name, value } = e.target
        setResponsibilityFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleFormSearch = (e) => {
        const searchTerm = e.target.value
        setFormSearchTerm(searchTerm)
        const filtered = formOptions.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredFormOptions(filtered)
    }

    const handleFormSelect = (option) => {
        setResponsibilityFormData((prev) => ({
            ...prev,
            selectForm: option,
        }))
        setFormSearchTerm("")
        setFilteredFormOptions(formOptions)
    }

    const handleFileChange = (e) => {
        setRoleFormData((prev) => ({
            ...prev,
            icon: e.target.files[0],
        }))
    }

    const handleMenuIconChange = (e) => {
        setResponsibilityFormData((prev) => ({
            ...prev,
            menuIcon: e.target.files[0],
        }))
    }

    const handleCreateRole = () => {
        console.log("Creating role:", roleFormData)
        setShowAddRolesModal(false)
        setRoleFormData({
            roleTitle: "",
            description: "",
            roleCenter: "",
            customizationRight: false,
            adminFlag: false,
            icon: null,
            batchNo: "",
        })
    }

    const handleCreateResponsibility = () => {
        console.log("Creating responsibility:", responsibilityFormData)
        setShowAddResponsibilityModal(false)
        setResponsibilityFormData({
            responsibilityName: "",
            title: "",
            sortOrder: "",
            selectForm: "",
            menuIcon: null,
        })
    }

    const renderRoleTree = (nodes, parentPath = "") => {
        return Object.entries(nodes).map(([key, children]) => {
            const currentPath = parentPath ? `${parentPath}.${key}` : key
            const hasChildren = Object.keys(children).length > 0
            const isExpanded = expandedNodes[currentPath]

            return (
                <div key={currentPath} className="role-tree-node">
                    <div className="role-node-header" onClick={() => hasChildren && toggleNode(currentPath)}>
                        {hasChildren && <span className="expand-icon">{isExpanded ? "▼" : "▶"}</span>}
                        <span className="folder-icon">📁</span>
                        <span className="node-label">{key}</span>
                    </div>
                    {hasChildren && isExpanded && <div className="role-children">{renderRoleTree(children, currentPath)}</div>}
                </div>
            )
        })
    }

    const handleMenuFormChange = (e) => {
        const { name, value } = e.target
        setMenuFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const handleCreateMenu = () => {
        console.log("Creating menu:", menuFormData)
        setShowAddMenuModal(false)
        setMenuFormData({
            menuName: "",
            menuTitle: "",
            sortOrder: "",
            mennuPage: "",
            menuIcon: null,
        })
    }

    return (
        <div>
            <button onClick={onBack} className="backbutton">
                ← Back to Manage Users
            </button>
            <div className="user-management-container">
                {/* Users Section */}
                <div className="users-section">
                    <div className="section-header">
                        <h2>USERS</h2>
                        <button className="create-btn" onClick={() => setShowCreateModal(true)}>+ Create</button>
                    </div>
                    <div className="search-section">
                        <div className="search-container">
                            <input type="text" placeholder="Search: All Text Columns" className="search-input" />
                            <button className="go-btn">Go</button>
                        </div>
                    </div>
                    <div className="users-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sampleUsers.map((user) => (
                                    <tr key={user.id} className="user-name">
                                        <td>
                                            <div className="username">
                                                <button className="edit-btn">✏️</button>
                                                {user.name}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="table-footer">
                            <span>1 rows selected</span>
                            <span>Total 7</span>
                        </div>
                    </div>
                </div>

                {/* Roles Section */}
                <div className="roles-section">
                    <div className="section-header">
                        <h2>Roles</h2>
                        <button className="print-btn">🖨️ Print PDF</button>
                    </div>
                    <div className="roles-tree">{renderRoleTree(rolesHierarchy)}</div>
                </div>

                {/* Detail Section */}
                <div className="detail-section">
                    <div className="detail-tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`tab ${activeTab === tab ? "active" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="detail-actions">
                        <button className="actionbutton" onClick={() => setShowAddRolesModal(true)}>+ Add Roles</button>
                        <button className="actionbutton" onClick={() => setShowAddResponsibilityModal(true)}>+ Add Responsibility</button>
                        <button className="actionbutton" onClick={() => setShowAddMenuModal(true)}>+ Add Menu</button>
                    </div>

                    <div className="detail-content">
                        <div className="detail-search">
                            <input type="text" placeholder="Search: All Text Columns" className="search-input" />
                            <button className="go-btn">Go</button>
                            <button className="actions-btn">Actions ▼</button>
                            <button className="reset-btn">🔄 Reset</button>
                        </div>

                        <div className="detail-toolbar">
                            <button className="edit-btn">Edit</button>
                            <button className="save-btn">Save</button>
                            <button className="add-row-btn">Add Row</button>
                        </div>

                        <div className="menus-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>☐</th>
                                        <th>≡</th>
                                        <th>Title</th>
                                        <th>Sort Order ↕</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sampleMenus.map((menu) => (
                                        <tr key={menu.id}>
                                            <td>
                                                <input type="checkbox" checked={menu.selected} readOnly />
                                            </td>
                                            <td>≡</td>
                                            <td>{menu.title}</td>
                                            <td>{menu.sortOrder}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="table-footer">
                                <span>1 rows selected</span>
                                <span>Total 7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add System User</h2>
                            <button className="modal-close" onClick={() => setShowCreateModal(false)}>
                                ✕
                            </button>
                        </div>

                        <div className="modal-body">
                            <h3>Create User</h3>

                            <div className="form-group">
                                <label>User Name</label>
                                <input
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                                <span className="required-text">Required</span>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="xxx@gmail.com"
                                    className="form-input"
                                />
                                <span className="required-text">Required</span>
                            </div>

                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="checkbox-group">
                                <div className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        name="loginAccess"
                                        checked={formData.loginAccess}
                                        onChange={handleInputChange}
                                        id="loginAccess"
                                    />
                                    <label htmlFor="loginAccess">Login Access</label>
                                </div>

                                <div className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        name="adminFlag"
                                        checked={formData.adminFlag}
                                        onChange={handleInputChange}
                                        id="adminFlag"
                                    />
                                    <label htmlFor="adminFlag">Admin Flag</label>
                                </div>

                                <div className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        name="approveAdmin"
                                        checked={formData.approveAdmin}
                                        onChange={handleInputChange}
                                        id="approveAdmin"
                                    />
                                    <label htmlFor="approveAdmin">Approve Admin</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Effective From Date</label>
                                <div className="date-input-group">
                                    <input
                                        type="date"
                                        name="effectiveFromDate"
                                        value={formData.effectiveFromDate}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                    <span className="calendar-icon">📅</span>
                                </div>
                                <span className="required-text">Required</span>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setShowCreateModal(false)}>
                                Cancel
                            </button>
                            <button className="create-btn" onClick={handleCreateUser}>
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showAddRolesModal && (
                <div className="modal-overlay">
                    <div className="modal-content add-roles-modal">
                        <div className="modal-header">
                            <h2>Add/Edit Roles</h2>
                            <button className="close-btn" onClick={() => setShowAddRolesModal(false)}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="roleTitle">Role Title</label>
                                <input
                                    type="text"
                                    id="roleTitle"
                                    name="roleTitle"
                                    value={roleFormData.roleTitle}
                                    onChange={handleRoleInputChange}
                                    className="form-input"
                                />
                                <span className="required-text">Required</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={roleFormData.description}
                                    onChange={handleRoleInputChange}
                                    className="form-textarea"
                                    rows="3"
                                />
                                <span className="required-text">Required</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="roleCenter">Role Center</label>
                                <select
                                    id="roleCenter"
                                    name="roleCenter"
                                    value={roleFormData.roleCenter}
                                    onChange={handleRoleInputChange}
                                    className="form-select"
                                >
                                    <option value="">Select Role Center</option>
                                    <option value="admin">Administration</option>
                                    <option value="sales">Sales</option>
                                    <option value="finance">Finance</option>
                                </select>
                                <span className="required-text">Required</span>
                            </div>

                            <div className="checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="customizationRight"
                                        checked={roleFormData.customizationRight}
                                        onChange={handleRoleInputChange}
                                    />
                                    Customization Right
                                </label>

                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="adminFlag"
                                        checked={roleFormData.adminFlag}
                                        onChange={handleRoleInputChange}
                                    />
                                    Admin Flag
                                </label>
                            </div>

                            <div className="form-group">
                                <label>Icon</label>
                                <div className="file-upload-area">
                                    <input
                                        type="file"
                                        id="iconFile"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        style={{ display: "none" }}
                                    />
                                    <label htmlFor="iconFile" className="file-upload-btn">
                                        📁 Choose File
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="batchNo">Batch No</label>
                                <input
                                    type="text"
                                    id="batchNo"
                                    name="batchNo"
                                    value={roleFormData.batchNo}
                                    onChange={handleRoleInputChange}
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setShowAddRolesModal(false)}>
                                ← Back
                            </button>
                            <button className="create-btn" onClick={handleCreateRole}>
                                📄 Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showAddResponsibilityModal && (
                <div className="modal-overlay">
                    <div className="modal-content add-responsibility-modal">
                        <div className="modal-header">
                            <h2>Add/Edit Responsibility</h2>
                            <button className="close-btn" onClick={() => setShowAddResponsibilityModal(false)}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="responsibilityName">Responsibility Name</label>
                                <input
                                    type="text"
                                    id="responsibilityName"
                                    name="responsibilityName"
                                    value={responsibilityFormData.responsibilityName}
                                    onChange={handleResponsibilityInputChange}
                                    className="form-input"
                                />
                                <span className="required-text">Required</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={responsibilityFormData.title}
                                    onChange={handleResponsibilityInputChange}
                                    className="form-input"
                                />
                                <span className="required-text">Required</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="sortOrder">Sort Order</label>
                                <input
                                    type="number"
                                    id="sortOrder"
                                    name="sortOrder"
                                    value={responsibilityFormData.sortOrder}
                                    onChange={handleResponsibilityInputChange}
                                    className="form-input"
                                />
                                <span className="required-text">Required</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="selectForm">Select Form</label>
                                <div className="custom-dropdown">
                                    <div className="dropdown-search">
                                        <input
                                            type="text"
                                            placeholder="🔍 Search forms..."
                                            value={formSearchTerm}
                                            onChange={handleFormSearch}
                                            className="dropdown-search-input"
                                        />
                                    </div>
                                    <div className="dropdown-options">
                                        {filteredFormOptions.map((option, index) => (
                                            <div key={index} className="dropdown-option" onClick={() => handleFormSelect(option)}>
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {responsibilityFormData.selectForm && (
                                    <div className="selected-form">Selected: {responsibilityFormData.selectForm}</div>
                                )}
                                <span className="required-text">Required</span>
                            </div>

                            <div className="form-group">
                                <label>Menu Icon</label>
                                <div className="file-upload-area">
                                    <input
                                        type="file"
                                        id="menuIconFile"
                                        onChange={handleMenuIconChange}
                                        accept="image/*"
                                        style={{ display: "none" }}
                                    />
                                    <label htmlFor="menuIconFile" className="file-upload-btn">
                                        📁 Choose File
                                    </label>
                                    {responsibilityFormData.menuIcon && (
                                        <span className="file-name">{responsibilityFormData.menuIcon.name}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setShowAddResponsibilityModal(false)}>
                                ← Back
                            </button>
                            <button className="create-btn" onClick={handleCreateResponsibility}>
                                📄 Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showAddMenuModal && (
                <div className="modal-overlay">
                    <div className="modal-content add-menu-modal">
                        <div className="modal-header">
                            <h2>Add/Edit Menu</h2>
                            <button className="close-btn" onClick={() => setShowAddMenuModal(false)}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="menuName">Menu Name</label>
                                <input
                                    type="text"
                                    id="menuName"
                                    name="menuName"
                                    value={menuFormData.menuName}
                                    onChange={handleMenuFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="menuTitle">Menu Title</label>
                                <input
                                    type="text"
                                    id="menuTitle"
                                    name="menuTitle"
                                    value={menuFormData.menuTitle}
                                    onChange={handleMenuFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sortOrder">Sort Order</label>
                                <input
                                    type="number"
                                    id="sortOrder"
                                    name="sortOrder"
                                    value={menuFormData.sortOrder}
                                    onChange={handleMenuFormChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="menuPage">Menu Page</label>
                                <select
                                    id="menuPage"
                                    name="menuPage"
                                    value={menuFormData.menuPage}
                                    onChange={handleMenuFormChange}
                                    className="form-select"
                                >
                                    <option value="">Select Menu Page</option>
                                    {menuPages.map((page, index) => (
                                        <option key={index} value={page}>
                                            {page}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Menu Icon</label>
                                <div className="file-upload-area">
                                    <input
                                        type="file"
                                        id="menuIconFile"
                                        onChange={handleMenuIconChange}
                                        accept="image/*"
                                        style={{ display: "none" }}
                                    />
                                    <label htmlFor="menuIconFile" className="file-upload-btn">
                                        📁 Choose File
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setShowAddMenuModal(false)}>
                                ← Back
                            </button>
                            <button className="create-btn" onClick={handleCreateMenu}>
                                📄 Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default UserManagement
