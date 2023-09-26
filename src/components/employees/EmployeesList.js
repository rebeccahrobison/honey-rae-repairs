import "./Employees.css"
import { getAllEmployees } from "../../services/employeeService"
import { useState, useEffect } from "react"
import { User } from "../../users/User"

export const EmployeesList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getAllEmployees().then(employeeArr => {
            setEmployees(employeeArr)
        })
    }, [])

    return (
        <div className="employees">
            {employees.map(employeeObj => {
                return (
                    <User user={employeeObj.user} />
                )
            })}
        </div>
    )
}