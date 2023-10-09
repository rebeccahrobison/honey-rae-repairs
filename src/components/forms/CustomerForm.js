import { useEffect, useState } from "react"
import "./Form.css"
import { editCustomer, getCustomerByUserId } from "../../services/customerService"
import { editUser, getUserById } from "../../services/userService"
import { useNavigate } from "react-router-dom"

export const CustomerForm = ({ currentUser }) => {
  const [customer, setCustomer] = useState([])
  const [user, setUser] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getCustomerByUserId(currentUser.id).then((data) => {
      setCustomer(data[0])
    })
  }, [currentUser])

  useEffect(() => {
    getUserById(currentUser.id).then(data => {
      setUser(data[0])
      console.log(data[0])
    })
  }, [currentUser])

  const handleInputChange = (event) => {
    if(event.target.name === "fullName") {
      const stateCopy = {...user }
      stateCopy[event.target.name] = event.target.value
      setUser(stateCopy)
    } else {
      const stateCopy = { ...customer }
      stateCopy[event.target.name] = event.target.value
      setCustomer(stateCopy)
    }
  }

  const handleSave = (event) => {
    event.preventDefault()

    const editedCustomer = {
      id: customer.id,
      address: customer.address,
      phoneNumber: customer.phoneNumber,
      userId: customer.userId
    }

    const editedUser = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      isStaff: user.isStaff
    }

    editCustomer(editedCustomer).then(editUser(editedUser)).then(navigate(`/`))
  }

  // console.log(customer)
  // console.log(currentUser)
  return (
    <form className="profile">
      <h2>Update Profile</h2>
      <fieldset>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            name="fullName"
            value={user?.fullName ? user.fullName : ""}
            onChange={handleInputChange}
            required 
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Address:</label>
          <input 
            type="text" 
            name="address"
            value={customer?.address ? customer?.address : ""} 
            onChange={handleInputChange}
            required 
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Phone Number:</label>
          <input 
            type="text" 
            name="phoneNumber"
            value={customer?.phoneNumber ? customer?.phoneNumber : ""} 
            onChange={handleInputChange}
            required 
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-primary" onClick={handleSave}>Save Profile</button>
        </div>
      </fieldset>
    </form>
  )
}