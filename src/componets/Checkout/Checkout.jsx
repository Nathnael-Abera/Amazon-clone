import React from 'react'
import './Checkout.css'
import Subtotal from '../Subtotal/Subtotal'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct'
import { useCheckoutContext } from '../../Context/checkoutContext'
function Checkout() {
  const { basket } = useCheckoutContext()
  // console.log(basket);
  return (
    <div className="checkout">
        <div className="checkout__left">
              <img className="checkout__img"
                  src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" />
              <h3>Hello,</h3>
        <h2 className="checkout__title">Your shopping Basket</h2>
        {basket?.map((item) => {
        const {img,id,title,rating,price}=item
          return(<CheckoutProduct
            img={img} id={id} title={title} rating={rating} price={price}
      />)
        })}
        </div>
      <div className="checkout__right">
      
              <Subtotal />
      </div>
     
      
    </div>
  )
}

export default Checkout
