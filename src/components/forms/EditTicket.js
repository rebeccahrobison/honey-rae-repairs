import { useNavigate, useParams } from "react-router-dom"
import "./Form.css"
import { useEffect, useState } from "react"
import { editTicket, getTicketById } from "../../services/ticketService"

export const EditTicket = () => {
  const [ticket, setTicket] = useState([])

  const ticketId = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getTicketById(ticketId).then(data => {
      setTicket(data[0])
    })
  }, [ticketId])

  const handleEdit = (event) => {
    event.preventDefault()

    const editedTicket = {
      id: ticket.id,
      userId: ticket.userId,
      description: ticket.description,
      emergency: ticket.emergency,
      dateCompleted: ticket.dateCompleted
    }

    editTicket(editedTicket).then(navigate(`/tickets`))
  }

  return (
    <form>
      <h2>Edit Service Ticket</h2>
      <fieldset>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Brief description of problem"
            value={ticket?.description}
            onChange={(event) => {
              const ticketCopy = { ...ticket }
              ticketCopy.description = event.target.value
              setTicket(ticketCopy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>
            Emergency:
            {
              (ticket.emergency) ? (
              <input
                type="checkbox"
                checked
                onChange={(event) => {
                  const ticketCopy = { ...ticket }
                  ticketCopy.emergency = event.target.checked
                  setTicket(ticketCopy)
                }}
              />
              ) : (
                <input
                type="checkbox"
                  onChange={(event) => {
                  const ticketCopy = { ...ticket }
                  ticketCopy.emergency = event.target.checked
                  setTicket(ticketCopy)
                }}
              />
              )
            }
          </label>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-info" onClick={handleEdit}>Update Ticket</button>
        </div>
      </fieldset>
    </form>
  )
}