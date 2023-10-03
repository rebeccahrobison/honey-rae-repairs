import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome"
import { CustomerNav } from "../components/nav/CustomerNav"

export const CusomterViews = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <>
            <CustomerNav />
            <Outlet/>
          </>
        }
      >
        <Route index element={<Welcome />} />
      </Route>
    </Routes>
    )
}