import { useState, useEffect } from "react"
import { EmployeeViews } from "./EmployeeViews"
import { CusomterViews } from "./CustomerViews"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    setCurrentUser(honeyUserObject)
  }, [])

  return currentUser.isStaff ? (
    <EmployeeViews currentUser={currentUser} />
  ) : (
    <CusomterViews currentUser={currentUser} /> 
  )

}
