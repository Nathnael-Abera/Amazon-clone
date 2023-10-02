import React from 'react'
import './Products.css'
import { useCheckoutContext } from '../../Context/checkoutContext'

function Products({ title, price, img, rating, id }) {
    const { basket, dispatch } = useCheckoutContext();
    // console.log(basket)
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                price: price,
                rating: rating,
                img:img,
            }
        }
        )
  
    }
  return (
      <div className='product' key={id}>
          <div className='product__info'>
              <p className='product__title'>{title}</p>
              <p className='product__price'>
                  <small>$</small>
                  <strong>{price}</strong>
              </p>

              <div className='product__rating' >
                  {Array(rating)?.fill().map(()=>(<p>⭐</p>))}
              </div>
          </div>
          <img src={img} alt="image" />
          <button className='product__button' onClick={addToBasket}>Add to Basket</button>
     </div>
  )
}

export default Products
