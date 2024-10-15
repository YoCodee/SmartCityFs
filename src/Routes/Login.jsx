import React, { useState, useEffect } from 'react'
import Logo from "/images/Untitled design (17).png"
import { Link } from 'react-router-dom'
import { LoginUser } from '../Features/authSlice'
import {  useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

  useEffect(() => {
    if(user || isSuccess){
      navigate("/")
    }
  }, [user, isSuccess, isError, navigate, dispatch]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }))
    .unwrap()
    .then(() => {
        console.log('Logged in successfully');
    })
    .catch((message) => {
        console.error('Login failed:', message);
    });
    navigate("/")
};



  return (
    <>
    <div class="flex min-h-full flex-col justify-center px-6 py-36 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto w-44" src={Logo} alt="Your Company"/>
    <h2 class="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={Auth} class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input value={email} onChange={(e) => setEmail(e.target.value)}
          id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          
        </div>
        <div class="mt-2">
          <input value={password} onChange={(e) => setPassword(e.target.value)} 
          id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Dont have An Account?
      <Link to="/register"  class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
    </p>
  </div>
</div>
</>
  )
}

export default Login