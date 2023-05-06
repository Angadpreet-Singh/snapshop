import moment from 'moment';
import { useState } from 'react';
import "./App.css"
import { client } from './sanity';

export const OrderCart = (props) => {

    const { id, totalPrice, orderStatus, orderDetails, date } = props
    const [customerOrderStatus, setCustomerOrderStatus] = useState(orderStatus)

    const handleOrder = () => {
        client.patch(id)
            .set({ orderStatus: !orderStatus })
            .commit()
            .then((updatedBike) => {
                setCustomerOrderStatus(!customerOrderStatus)
                console.log('Order updated')
            })
            .catch((err) => {
                console.error('Something went wrong')
            })
    }

    return (
        <div className="order-container-wrapper card p-3">
            <div>
                {moment(date).format('MMMM Do YYYY')}
            </div>
            <div className="row order-cart-container">
                <div className="col-sm-12 col-lg-4 product-details-section">
                    {orderDetails.map((e) =>
                    (<>
                        <span>{e.productName}{<>&times;{e.count}</>}</span>
                    </>)
                    )}
                </div>

                <div className="col-sm-12 col-lg-4 product-price-section">
                    <div className="product-price">
                        <div>
                            <span className="amount"><span className="Price-currencySymbol">₹</span>{totalPrice}</span>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-lg-4 product-status-section">
                    <div className="product-status">
                        <button className='btn btn-dark' onClick={handleOrder}>{customerOrderStatus ? "PACKED" : "UNDER PROCESS"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
