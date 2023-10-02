import React, { useState } from 'react'
import './Login.css'
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredintial)=> {
        if (userCredintial) {
            navigate('/')
        }
            })
        .catch((error=>alert(error.message)))
    }
    const register = (e) => {
        e.preventDefault()
                   
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredintial)=> {
                    if (userCredintial) {
                        navigate('/')
                    }
                })
                .catch((error=>alert(error.message)))
           
    }
  return (
      <div className="login">
          <Link to = '/'>
              <img
                className="login__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="amazon-logo"
            />
          </Link>
           
            <div className="login__container">
                <h1> Sign-in</h1>
                <form>
                <h5>E-mail </h5>
                <input
                      type="text"
                      value={email}
                      onChange={(e)=>{setEmail(e.target.value)}}
                />
                <h5>Password </h5>
                <input
                    type="password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <button
                    className="login__signInButton"
                    type="submit"
                    onClick={signIn}
                >
                    sign in
                </button>
                </form>
                <p>
                By signing in you agree to the Amazon FAKE CLONE conditions of use
                sale.Please see our Privacy Notice,our cookies Notice and our
                Interest-Based Ads Notice.
                </p>
                <button className="login__registerButton"  onClick={register}>
                Create Your Amazon Account
                </button>
            </div>
            </div>
  )
}

export default Login
