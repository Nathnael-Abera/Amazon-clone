
import { useCheckoutContext } from '../../Context/checkoutContext'
import './checkoutProduct.css'

function CheckoutProduct({title,id,rating,price,img,hideButton}) {
    const { dispatch } = useCheckoutContext();
    const remove = () => {
		dispatch({ type: 'REMOVE', item: { id } });
	};
    
  return (
      <div>
           <div className="cartproduct">
           <img src={img} alt="img" />
                  <div className="cartproduct__info">
                      <p className="title">{title}</p>
                      <p className="cartproduct__price">
                          <small>$</small>
                          <strong>{price}</strong>
                      </p>
                      <div className="cartproduct__rating">
                          {Array(rating)
                              .fill()
                              .map(() => {
                                  return <p>⭐</p>;
                              })}
                  </div>
                  {
                     ! hideButton?<button className="cartproduct__button" onClick={remove}>
                          Remove Item
                      </button>:''
                  }

                  </div>
              </div>
   </div>
  )
}

export default CheckoutProduct
