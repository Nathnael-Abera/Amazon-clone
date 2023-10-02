import React from 'react'
import CurrencyFormat from 'react-currency-format';
import './Subtotal.css'
import { useCheckoutContext } from '../../Context/checkoutContext';
import { useNavigate } from 'react-router-dom';
function Subtotal() {
    const { basket } = useCheckoutContext();
    const navigate = useNavigate();
    const getBasketTotal = (basket) => {
        
        return basket?.reduce((amount, item) => {
			return item.price + amount;
		}, 0);
    }
  return (
    <div >
          <CurrencyFormat
              renderText={(value) => (
                  <div className='subtotal'>
                      <p>
                          Subtotal ({basket.length} items):<strong>{value}</strong>
                      </p>
                      <small className="subtotal__gift">
                          <input type='checkbox'/> This order contains a gift
                      </small>
                      <button className='subtotal__button' onClick={()=>navigate('/payment')}>Proceed to checkout</button>
                  </div>
              )}
              decimalScale={2}
              value={getBasketTotal(basket)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
          />
         
    </div>
  )
}

export default Subtotal
