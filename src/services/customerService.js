export const getCustomerByUserId = (userId) => {
    return fetch(`http://localhost:8088/customers?userId=${userId}&_expand=user`).then(
        res => res.json()
    )
}

export const editCustomer = (customer) => {
    return fetch(`http://localhost:8088/customers/${customer.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer)
    })
}