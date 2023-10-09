import { useNavigate } from "react-router-dom"
import { getAllEmployees } from "../../services/employeeService"
import { assignTicket, deleteTicket, updateTicket } from "../../services/ticketService"
import { useEffect, useState } from "react"

export const Ticket = ({ ticket, currentUser, getAndSetTickets }) => { // could use "prop" w/out curly braces, and then change all to prop.ticket.id, for example
    const [employees, setEmployees] = useState([])
    const [assignedEmployee, setAssignedEmployee] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        getAllEmployees().then((employeesArray) => {
            setEmployees(employeesArray)
        })
    }, [])

    useEffect(() => {
        const foundEmployee = employees.find(
            (employee) => employee.id === ticket.employeeTickets[0]?.employeeId
        )
        setAssignedEmployee(foundEmployee)
    }, [employees, ticket])

    const handleClaim = () => {
        const currentEmployee = employees.find(
            (employee) => employee.userId === currentUser.id
        )

        const newEmployeeTicket = {
            employeeId: currentEmployee.id,
            serviceTicketId: ticket.id
        }

        assignTicket(newEmployeeTicket).then(() => {
            getAndSetTickets()
        })
    }

    const handleClose = () => {
        const closedTicket = {
            id: ticket.id,
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date()
        }
        console.log(closedTicket)

        updateTicket(closedTicket).then(() => {
            getAndSetTickets()
        })
    }

    const handleDelete = () => {
        deleteTicket(ticket.id).then(() =>
            getAndSetTickets())
    }

    const handleEdit = () => {
        navigate(`/tickets/edit/${ticket.id}`)
    }

    return (
        <section className="ticket">
            <header className="ticket-info">#{ticket.id}</header>
            <div>{ticket.description}</div>
            <footer>
                <div>
                    <div className="ticket-info">assignee</div>
                    <div>{assignedEmployee ? assignedEmployee.user?.fullName : "None"}</div>
                </div>
                <div>
                    <div className="ticket-info">emergency</div>
                    <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
                <div className="btn-container">
                    {/* If the logged in user is an employee, 
                    and there's no employee tickets associated with the service ticket, 
                    then a button to claim the ticket should display */}
                    {currentUser.isStaff && !assignedEmployee ? (
                        <button className="btn btn-secondary" onClick={handleClaim}>Claim</button>
                    ) : (
                        ""
                    )}
                    {/* If the logged in user is the assigned employee for the ticket,
                    and there is not dateCompleted,
                    then a button to close the ticket should display */}
                    {assignedEmployee?.userId === currentUser.id && !ticket.dateCompleted ? (
                        <button className="btn btn-warning" onClick={handleClose}>Close</button>
                    ) : (
                        ""
                    )}
                    {!(currentUser.isStaff) && (
                        <div className="buttons">
                            <button className="btn btn-info" onClick={handleEdit}>Edit</button>
                            <button className="btn btn-warning" onClick={handleDelete}>Delete</button>
                        </div>
                    )}
                </div>
            </footer>
        </section>
    )
}

// ? is option chaining operator

// another option is to fetch employee by employee id

// import { useEffect, useState } from "react"

// export const Ticket = ({ ticket, name }) => { // could use "prop" w/out curly braces, and then change all to prop.ticket.id, for example
//     const [assignedEmployee, setAssignedEmployee] = useState("")

//     useEffect (() => {
//          if(ticket.employeeTickets.length) {
// getEmployeeById(ticket.employeeTickets[0].employeeId).then((employee) => {  //function would be from employeeService.js
//     setAssignedEmployee(employee)
// })
// }
// getAllEmployees().then((employeesArray) => {
//             setEmployees(employeesArray)
//         })
//     }, [])


//     return (
//         <section className="ticket">
//             <header className="ticket-info">#{ticket.id}</header>
//             <div>{ticket.description}</div>
//             <footer>
//                 <div>
//                     <div className="ticket-info">assignee</div>
//                     <div>{assignedEmployee ? assignedEmployee.user?.fullName : "None"}</div>
//                 </div>
//                 <div>
//                     <div className="ticket-info">emergency</div>
//                     <div>{ticket.emergency ? "yes" : "no"}</div>
//                 </div>
//             </footer>
//         </section>
//     )
// }

