
import "./App.css"
import { CustomerList } from "./components/customers/CustomersList"
import { EmployeesList } from "./components/employees/EmployeesList"
import { TicketList } from "./components/tickets/TicketList"

export const App = () => {
  return <>
    {/* <TicketList /> */}
    {/* <CustomerList /> */}
    <EmployeesList />
  </>
}
