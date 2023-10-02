
import './App.css'
import Checkout from './componets/Checkout/Checkout'
import Header from './componets/Header/Header'
import Home from './componets/Home/Home'
import { Routes , Route} from 'react-router-dom'
import Login from './componets/Login/Login'
import { useCheckoutContext } from './Context/checkoutContext'
import { useEffect } from 'react'
import { auth } from './firebase'
import Payment from './componets/Payment/Payment'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './componets/Orders/Orders'

function App() {
  const stripePromise = loadStripe('pk_test_51NcWfSHITG1MmXHbLfv3Y1uny5OYuwFg9Donn0F2WgSnTpRl19QmQbB0jvtG21j9ufJmGVcq6bykLCQJFe3l1JDr00HGDbEM7F');
  const { dispatch } = useCheckoutContext()
  useEffect(() => {
    auth.onAuthStateChanged((useris) => {
      if (useris) {
        dispatch({
          type: 'SETUSER',
          user:useris
        })
      }
      else
      {
        dispatch({
          type: 'SETUSER',
          user:null
        })
      }
    })
  },[])
  return (
      <>
        <Routes>
        <Route exact path='/checkout' element={
          <>
            <Header />
            <Checkout />
          </>
           }
        />
        <Route exact path='/login' element={
            <Login/>}
        />
        <Route exact path='/payment' element={
          <>
            <Header />
            <Elements stripe={stripePromise} >
               <Payment />
               </Elements>
          </>
           }
        />
        <Route exact path='/orders' element={
          <>
            <Header />
            <Orders />
           </>
          }
          />
        <Route exact path='/' element={
          <>
            <Header />
            <Home />
           </>
          }
           />
        </Routes>
    </>
   
    
  )
}

export default App
