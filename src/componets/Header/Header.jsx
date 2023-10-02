import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import {useCheckoutContext} from '../../Context/checkoutContext'
import { auth } from '../../firebase';

function Header() {
    const { basket,user } = useCheckoutContext();
    const logInOut = () => {
        if (user) {
            auth.signOut();
            }
        }

  return (
      <div className='header'>
          <Link to ='/'>
                    <img className='header__logo' src="https://i0.wp.com/www.dafontfree.co/wp-content/uploads/2021/11/Amazon-Logo-Font-1-scaled.jpg?fit=2560%2C1578&ssl=1" alt='amazon logo' />
              </Link>
          <div className='header__search'>
              <input className='header__searchInput' type="text" />
              <SearchIcon className='header__searchIcon'/>
          </div>
          <div className='header__nav'>
          <Link to={!user?'/login':"/"} className='header_clearlink'>    
              <div className='header__option' onClick={logInOut}>
                  <span className='header__optionOne'>Hello {user?user.email:'Guest'}</span>
                      <span className='header__optionTwo'>{ user?'Sign Out':'Sign In'}</span>
                  </div>
              </Link>
              <Link to={user?'/orders':"/"} className='header_clearlink'> 
              <div className='header__option'>
                  <span className='header__optionOne'>Returns</span>
                  <span className='header__optionTwo'>& Orders</span>
                  </div>
                  </Link>
              <div className='header__option'>
                  <span className='header__optionOne'>Your</span>
                  <span className='header__optionTwo'>Prime</span>
              </div>
              <Link to ='/checkout' className='header_clearlink'>
                    <div className='header__optionBasket'>
                    <ShoppingBasketIcon />
                        <span className='header__optionTwo header__basketCount'>{basket.length}</span>
                    </div>
              </Link>
          </div>
    </div>
  )
}

export default Header
