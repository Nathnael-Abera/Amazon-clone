import React from 'react'
import './order.css'
import CheckoutProduct from '../../CheckoutProduct/CheckoutProduct'
import moment from 'moment';
function Order({ order }) {
 
  
  const value = order.data.amount / 100;

  function formatCurrency( value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency:'USD'}).format(value);
  }
  return (
    <div className='order__container'>
          <div className='order'>
      <h1>order</h1>
        <p>{moment.unix(order.data.created).format('MMMM Do YYYY,h:mma')}</p>
      <p className='order__id'><small>{order.id}</small></p>
      {order.data.basket?.map((item) => {
        const { id, title, img, price, rating } = item
          return (<CheckoutProduct
          id={id}
          title={title}
          img={img}
          price={price}
            rating={rating}
            hideButton
        />)
        
      })}

      <h2 className='order__total'>Order Total: {formatCurrency(value)}</h2>
      
    </div>
    </div>

  )
}

export default Order
