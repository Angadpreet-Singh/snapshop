import "./App.css"
import { OrderCart } from "./OrderCart"
import { useEffect, useState } from "react"
import { client } from './sanity'

const App = () => {

  const [userOrders, setUserOrders] = useState([])

  const getAllUserOrders = async () => {
    try {
      const data = await client.fetch(`*[_type=='order' && shopId == '8064eeea-7f6e-44b3-ac18-f8c0070c8e48'] | order(_createdAt)`)
      setUserOrders(data)
    } catch (error) {
      console.log("error : ", error)
    }
  }

  useEffect(() => {
    getAllUserOrders()
  }, [])

  return (
    <div className=".container-fluid">
      <h1>Sham Grocery</h1>
      {userOrders.length === 0 ? <span className="text-style">
        No order has been made yet.
      </span> : userOrders.map((e) => <OrderCart key={e._id} id={e._id} totalPrice={e.totalPrice} orderStatus={e.orderStatus} orderDetails={e.order} date={e._createdAt} />)}
    </div>
  )
}

export default App