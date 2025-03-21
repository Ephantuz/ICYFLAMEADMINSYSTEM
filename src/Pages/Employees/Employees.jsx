import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Employees.css";
import { BsPencilSquare } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("Employee");
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const roles = ["Manager", "Supervisor", "Accountant", "Employee"];

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            console.log("Fetching employees...");
            const res = await axios.get("https://icyflameltd-admin-app.vercel.app/api/v1/team");
            console.log("Fetch successful. Data:", res.data);

            setEmployees(res.data);
        } catch (err) {
            console.error("Fetch employees error:", err);
            toast.error("Failed to fetch employees");

            if (err.response) {
                console.error("Error Response:", err.response.data);
                console.error("Status:", err.response.status);
            }
        } finally {
            setLoading(false);
        }
    };

    const clearForm = () => {
        setName("");
        setEmail("");
        setPhone("");
        setRole("Employee");
        setIsEditMode(false);
        setEditingEmployeeId(null);
    };

    const handleSave = async () => {
        if (!name || !email || !phone || !role) {
            toast.error("Please fill all fields");
            return;
        }

        const employeeData = { name, email, phone, role };

        try {
            if (isEditMode) {
                console.log(`Updating employee ID: ${editingEmployeeId}`, employeeData);
                const res = await axios.put(`https://icyflameltd-admin-app.vercel.app/api/v1/team/${editingEmployeeId}`, employeeData);
                console.log("Update success:", res.data);
                toast.success("Employee updated successfully");
            } else {
                console.log("Creating new employee:", employeeData);
                const res = await axios.post("https://icyflameltd-admin-app.vercel.app/api/v1/team", employeeData);
                console.log("Create success:", res.data);
                toast.success("Employee added successfully");
            }

            fetchEmployees();
            setDialogOpen(false);
            clearForm();
        } catch (err) {
            console.error("Save employee error:", err);

            if (err.response) {
                console.error("Error Response:", err.response.data);
                console.error("Status:", err.response.status);
                toast.error(`Failed to save employee: ${err.response.data.message || err.message}`);
            } else {
                toast.error("Failed to save employee");
            }
        }
    };

    const handleEdit = (employee) => {
        console.log("Editing employee:", employee);

        setName(employee.name);
        setEmail(employee.email);
        setPhone(employee.phone);
        setRole(employee.role);
        setIsEditMode(true);
        setEditingEmployeeId(employee._id);
        setDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;

        try {
            console.log("Deleting employee ID:", id);
            const res = await axios.delete(`https://icyflameltd-admin-app.vercel.app/api/v1/team/${id}`);
            console.log("Delete success:", res.data);
            toast.success("Employee deleted successfully");

            fetchEmployees();
        } catch (err) {
            console.error("Delete employee error:", err);

            if (err.response) {
                console.error("Error Response:", err.response.data);
                console.error("Status:", err.response.status);
                toast.error(`Failed to delete employee: ${err.response.data.message || err.message}`);
            } else {
                toast.error("Failed to delete employee");
            }
        }
    };

    return (
        <div className="employees-container">
            <div className="employees-header">
                <h2>Employees</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        clearForm();
                        setDialogOpen(true);
                    }}
                >
                    Add Employee
                </button>
            </div>

            <table className="employees-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp, index) => (
                        <tr key={emp._id}>
                            <td>{index + 1}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.phone}</td>
                            <td>{emp.role}</td>
                            <td className="actions">
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleEdit(emp)}
                                >
                                    <BsPencilSquare size={16} />
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(emp._id)}
                                >
                                    <MdDeleteSweep size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {employees.length === 0 && !loading && (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center", padding: "12px" }}>
                                No employees found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {dialogOpen && (
                <div className="dialog-overlay" onClick={() => setDialogOpen(false)}>
                    <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                        <div className="dialog-header">
                            <h3>{isEditMode ? "Edit Employee" : "Add Employee"}</h3>
                        </div>

                        <div className="dialog-form">
                            <input
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                {roles.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>

                            <div className="dialog-buttons">
                                <button className="btn btn-primary" onClick={handleSave}>
                                    {isEditMode ? "Update" : "Create"}
                                </button>
                                <button className="btn" onClick={() => setDialogOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
