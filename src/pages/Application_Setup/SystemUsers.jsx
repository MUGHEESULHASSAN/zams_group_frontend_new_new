"use client"
import { useState } from "react"
import "./SystemUsers.css"

const SystemUsers = ({ onBack }) => {
    const [selectedUsers, setSelectedUsers] = useState([])
    const [selectedRoles, setSelectedRoles] = useState([])
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
    const [showAddRolesModal, setShowAddRolesModal] = useState(false)
    const [roleFormData, setRoleFormData] = useState({
        roleTitle: "",
        description: "",
        roleCenter: "",
        customizationRight: false,
        adminFlag: false,
        iconFile: null,
        batchNo: "",
    })
    const handleRoleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setRoleFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setRoleFormData((prev) => ({
            ...prev,
            iconFile: file,
        }))
    }
    const handleCreateRole = () => {
        // Handle role creation logic here
        console.log("Creating role:", roleFormData)
        setShowAddRolesModal(false)

        // Reset form
        setRoleFormData({
            roleTitle: "",          
            description: "",
            roleCenter: "",
            customizationRight: false,
            adminFlag: false,
            iconFile: null,
            batchNo: "",
        })
    }
    // Sample system users data
    const [systemUsers] = useState([
        {
            id: 1,
            erpUserName: "MT007",
            emailAddress: "MT007@gmail.com",
            fromDate: "25-APR-2025",
            toDate: "",
            loginAccess: true,
        },
        {
            id: 2,
            erpUserName: "ADMIN",
            emailAddress: "ADMIN@gmail.com",
            fromDate: "01-MAR-2016",
            toDate: "",
            loginAccess: true,
        },
        {
            id: 3,
            erpUserName: "DEV001",
            emailAddress: "waqas@gmail.com",
            fromDate: "13-MAR-2023",
            toDate: "",
            loginAccess: true,
        },
        {
            id: 4,
            erpUserName: "MT003",
            emailAddress: "abbas14357@gmail.com",
            fromDate: "02-JUN-2023",
            toDate: "",
            loginAccess: true,
        },
        {
            id: 5,
            erpUserName: "MT008",
            emailAddress: "MM78@GMAIL.COM",
            fromDate: "18-MAR-2024",
            toDate: "",
            loginAccess: true,
        },
    ])

    // Sample user roles data
    const [userRoles] = useState([
        {
            id: 1,
            role: "ACCOUNTANT",
            effectiveFrom: "25-APR-2025",
            effectiveTo: "",
        },
        {
            id: 2,
            role: "SALE MANAGER APP",
            effectiveFrom: "25-APR-2025",
            effectiveTo: "",
        },
        {
            id: 3,
            role: "ADMINISTRATION",
            effectiveFrom: "25-APR-2025",
            effectiveTo: "",
        },
    ])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleCreateUser = () => {
        // Handle user creation logic here
        console.log("Creating user:", formData)
        setShowCreateModal(false)
        // Reset form
        setFormData({
            userName: "",
            email: "",
            password: "",
            loginAccess: true,
            adminFlag: false,
            approveAdmin: false,
            effectiveFromDate: "06-SEP-2025",
        })
    }

    const handleUserSelect = (userId) => {
        setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
    }

    const handleRoleSelect = (roleId) => {
        setSelectedRoles((prev) => (prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId]))
    }

    return (
        <div className="user-management-container">
            <button onClick={onBack} className="backbutton">
                ← Back to Manage Users
            </button>

            {/* System Users Section */}
            <div className="management-section">
                <div className="section-header">
                    <div className="section-title">
                        <span className="user-icon">👥</span>
                        <h2>System Users</h2>
                    </div>
                    <button className="create-btn" onClick={() => setShowCreateModal(true)}>
                        <span className="plus-icon">+</span>
                        Create
                    </button>
                </div>

                <div className="search-section">
                    <div className="search-controls">
                        <div className="search-dropdown">
                            <button className="dropdown-btn">🔍</button>
                        </div>
                        <input type="text" placeholder="Search: All Text Columns" className="search-input" />
                        <button className="go-btn">Go</button>
                        <div className="actions-dropdown">
                            <button className="dropdown-btn">Actions ▼</button>
                        </div>
                        <button className="reset-btn">🔄 Reset</button>
                    </div>
                </div>

                <div className="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>ERP User Name</th>
                                <th>Email Address</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Login Access</th>
                            </tr>
                        </thead>
                        <tbody>
                            {systemUsers.map((user) => (
                                <tr key={user.id} className={selectedUsers.includes(user.id) ? "selected-row" : ""}>
                                    <td>
                                        <button className="edit-btn">✏️</button>
                                    </td>
                                    <td>{user.erpUserName}</td>
                                    <td>{user.emailAddress}</td>
                                    <td>{user.fromDate}</td>
                                    <td>{user.toDate}</td>
                                    <td>
                                        <input type="checkbox" checked={user.loginAccess} onChange={() => { }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="table-footer">
                    <div className="selection-info">{selectedUsers.length} rows selected</div>
                    <div className="pagination">
                        <span>1 - 7 of 7</span>
                        <div className="pagination-controls">
                            <button>‹</button>
                            <span>1</span>
                            <button>›</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Role Section */}
            <div className="management-section">
                <div className="section-header">
                    <h3>User Role</h3>
                </div>

                <div className="search-section">
                    <div className="search-controls">
                        <div className="search-dropdown">
                            <button className="dropdown-btn">🔍</button>
                        </div>
                        <input type="text" placeholder="Search: All Text Columns" className="search-input" />
                        <button className="go-btn">Go</button>
                        <div className="actions-dropdown">
                            <button className="dropdown-btn">Actions ▼</button>
                        </div>
                        <button className="backbutton" onClick={() => setShowAddRolesModal(true)}>+ Add Role</button>
                        <button className="reset-btn">🔄 Reset</button>
                    </div>
                </div>

                <div className="data-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Role</th>
                                <th>Effective From</th>
                                <th>Effective To</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userRoles.map((role) => (
                                <tr key={role.id} className={selectedRoles.includes(role.id) ? "selected-row" : ""}>
                                    <td>{role.role}</td>
                                    <td>{role.effectiveFrom}</td>
                                    <td>{role.effectiveTo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

        </div>
    )
}

export default SystemUsers
