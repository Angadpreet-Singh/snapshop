import "./App.css"
import { OrderCart } from "./OrderCart"
import { useEffect, useState } from "react"
import { client } from './sanity'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from "./store/shop"
const App = () => {

  const [userOrders, setUserOrders] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const shopId = useSelector((state) => state.shop.currentShop.shopId)
  const shopName = useSelector((state) => state.shop.currentShop.shopName)

  if (!shopId) {
    navigate("/login")
  }

  const getAllUserOrders = async () => {
    try {
      const data = await client.fetch(`*[_type=='order' && shopId == '${shopId}'] | order(_createdAt desc)`)
      setUserOrders(data)
    } catch (error) {
      console.log("error : ", error)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    getAllUserOrders()
  })

  return (
    <div className=".container-fluid">
      <div style={{ display: "flex", justifyContent: 'space-between', padding: "1rem" }}>
        <h1 style={{ display: "inline" }}>{shopName}</h1>
        <button className='btn btn-dark' onClick={handleLogout} >LOGOUT</button>
      </div>
      {userOrders.length === 0 ? <span className="text-style">
        No order has been made yet.
      </span> : userOrders.map((e) => <OrderCart key={e._id} id={e._id} totalPrice={e.totalPrice} orderStatus={e.orderStatus} orderDetails={e.order} date={e._createdAt} />)}
    </div>
  )
}

export default App