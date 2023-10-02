import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCheckoutContext } from '../../Context/checkoutContext'
import './payment.css'
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../axios';
import { database } from '../../firebase'; 



function Payment() {
    const { basket, user,dispatch } = useCheckoutContext();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [clientSecret,setClientSecret]=useState(true)
    const navigat=useNavigate()
    const stripe = useStripe();
    const elements = useElements();
 
     const value = basket?.reduce((amount, item) => {
			return item.price + amount;
		}, 0);
  
    function formatCurrency( value) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency:'USD'}).format(value);
    }
    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `payments/create?total=${value * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])
       
    // console.log(clientSecret)
    
    const handelChange = (e) => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message:'');
      }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (error) {
            return error
        }
        setProcessing(true)
        const payload = await stripe.confirmCardPayment(clientSecret, { payment_method: { card: elements.getElement(CardElement) } })
            .then(({ paymentIntent }) => {
                database.collection('users')
                    .doc(user?.uid)
                    .collection('orders').doc(paymentIntent.id)
                    .set({
                        basket: basket,
                        amount: paymentIntent.amount,
                        created:paymentIntent.created,
                })

                setSucceeded(true)
                setError(null)
                setProcessing(false)
                
                dispatch({
                    type:'EMPTY_BASKET'
                })
                navigat('/orders')
        })
        
      };
  return (
      <div className='payment'>
          <div className='payment__container'>
              <h1>
                  Checkout(<Link to='/checkout'>{basket.length } items</Link>)
              </h1>
          </div>
          <div className="payment__section">
              <div className="payment__title">
                 <p>Delivery Address</p> 
              </div>
              <div className="payment__address">
                  <p>{user?.email}</p>
                  <p>123 React Lane</p>
                  <p>Addis Abeba , Ethiopia</p>
              </div>
          </div>
          <div className="payment__section">
          <div className="payment__title">
                <p>Review items and delivery</p> 
              </div>
              <div className="payment__address">
                  {basket?.map((item) => {
                      const { id, title, img, price, rating } = item
                         return (  < CheckoutProduct
                  img={img} id={id} title={title} rating={rating} price={price} />)
                
})}
              </div>
          </div>
          <div className="payment__section">
                <div className="payment__title">
                        <p>Payment Method</p>
                    </div>
                    <div className="payment__address">
                  <form onSubmit={handleSubmit}>
                      <CardElement onChange={handelChange}/>
                     
                      <div className="payment__priceContainer">
                          Order Total :{formatCurrency(value)}
                      </div>
                            <button type="submit" disabled={processing || disabled|| succeeded} className='payment__buyNow'>
                          <span>{ processing?'Processing':'Buy Now'}</span>
                      </button>
                      {error && <div>
                          {error}
                      </div>}
                     
                    </form>
                    </div>
          </div>
   
    </div>
  )
}

export default Payment
