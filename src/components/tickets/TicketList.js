import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService"
import "./Tickets.css"
import { Ticket } from "./Ticket"
import { FilterBar } from "./FilterBar"

export const TicketList = ({ currentUser }) => {
  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showOpenOnly, setShowOpenOnly] = useState(false)

  const getAndSetTickets = () => {
    getAllTickets().then((ticketsArray) => {
      if (currentUser.isStaff) {
        setAllTickets(ticketsArray)
      } else {
        const customerTickets = ticketsArray.filter(ticket => ticket.userId === currentUser.id)
        setAllTickets(customerTickets)
      }
    })
  }

  // function is what we want to happen, 
  // array changing is when we want it to happen, will rerender when showEmergencyOnly changes
  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
      setFilteredTickets(emergencyTickets)
    } else {
      setFilteredTickets(allTickets)
    }
  }, [showEmergencyOnly, allTickets])

  useEffect(() => {
    const foundTickets = allTickets.filter(ticket =>
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredTickets(foundTickets)
  }, [searchTerm, allTickets])


  useEffect(() => {
    getAndSetTickets()
  }, [currentUser]) // When the dependency array is empty, the useEffect is only watching for the initial render of this component.

  useEffect(() => {
    if(showOpenOnly) {
      const openTickets = allTickets.filter(ticket => ticket.dateCompleted === "")
      setFilteredTickets(openTickets)
    } else {
      setFilteredTickets(allTickets)
    }
  }, [showOpenOnly, allTickets])



  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <FilterBar 
        setShowEmergencyOnly={setShowEmergencyOnly} 
        setShowOpenOnly={setShowOpenOnly}
        setSearchTerm={setSearchTerm}
        currentUser={currentUser}
      />
      <article className="tickets">
        {filteredTickets.map((ticketObj) => {
          return (
            <Ticket
              ticket={ticketObj}
              currentUser={currentUser} 
              getAndSetTickets={getAndSetTickets}
              key={ticketObj.id} />
          )
        })}
      </article>
    </div>
  )
}