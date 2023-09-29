import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCustomerByUserId } from "../../services/customerService"
import "./Customers.css"

export const CustomerDetails = () => {
    const [customer, setCustomer] = useState({})
    // key: value pair
    // /customer/3
    // path="/customers/:customerId"
    const { customerId } = useParams() // will return {customerId: 3}

    useEffect(() => {
        getCustomerByUserId(customerId).then(data => {
            const customerObj = data[0]
            setCustomer(customerObj)
        })
    }, [customerId])

    return (
        <section className="customer">
            <header className="customer-header">{customer.user?.fullName}</header>
            <div>
                <span className="customer-info">Email : </span>
                {customer.user?.email}
            </div>
            <div>
                <span className="customer-info">Address : </span>
                {customer.address}
            </div>
            <div>
                <span className="customer-info">Phone Number : </span>
                {customer.phoneNumber}
            </div>
        </section>
    )
}