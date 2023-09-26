import { getAllEmployees } from "../../services/employeeService"
import { useEffect, useState } from "react"

export const Ticket = ({ ticket }) => { // could use "prop" w/out curly braces, and then change all to prop.ticket.id, for example
    const [employees, setEmployees] = useState([])
    const [assignedEmployee, setAssignedEmployee] = useState({ })

    useEffect (() => {
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

