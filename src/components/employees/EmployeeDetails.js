import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getEmployeeByUserId } from "../../services/employeeService"
import "./Employees.css"
import { getAllEmployeeTickets } from "../../services/ticketService"

export const EmployeeDetails = () => {
    const [employee, setEmployee] = useState({})
    const [allEmployeeTickets, setAllEmployeeTickets] = useState([])
    const { employeeId } = useParams()

    useEffect(() => {
        getEmployeeByUserId(employeeId).then(data => {
            const employeeObj = data[0]
            setEmployee(employeeObj)
        }
        )
    }, [employeeId])

    useEffect(() => {
        getAllEmployeeTickets().then(data => {
            setAllEmployeeTickets(data)
        }) 
    }, [])

    const getEmployeeTicket = (id) => {
        const employeeTickets = allEmployeeTickets.filter(empTicket => empTicket.employeeId === id)
        return employeeTickets
    }

    return (
        <section className="employee">
            <header className="employee-header">{employee.user?.fullName}</header>
            <div>
                <span className="employee-info">Email : </span>
                {employee.user?.email}
            </div>
            <div>
                <span className="employee-info">Specialty : </span>
                {employee.specialty}
            </div>
            <div>
                <span className="employee-info">Rate : </span>
                {employee.rate}
            </div>
            <footer className="employee-footer">Currently working on {getEmployeeTicket(employee.id).length} tickets</footer>
        </section>
    )
}