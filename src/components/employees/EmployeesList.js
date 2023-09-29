import "./Employees.css"
import { getAllEmployees } from "../../services/employeeService"
import { useState, useEffect } from "react"
import { User } from "../../users/User"
import { Link } from "react-router-dom"

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
                    <Link to={`/employees/${employeeObj.user.id}`} key={employeeObj.user.id}>
                        <User user={employeeObj.user} key={employeeObj.id}/>
                    </Link>
                )
            })}
        </div>
    )
}

