import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Pages/Layout/Layout'
import HomePage from './Pages/home/HomePage'
import ServicesPage from './Routes/ServicesPage'
import Login from './Routes/Login'
import Register from './Routes/Register'
import DashboardPage from './Routes/DashboardPage'
import ProfilePage from './Routes/ProfilePage'
import ProductPage from './Routes/ProductPage'
import AddPerbaikanJalan from './Services/PerbiakanJalan/AddPerbaikanJalan'
import Penangkapan from './Services/Penangkapan/Penangkapan'
import Pembuangan from './Services/Pembuangan/Pembuangan'
import Event from './Services/Event/Event'
import Inovasi from './Services/Inovasi/Inovasi'
import Voulenter from './Services/Voulenteer/Voulenter'
import GetPerbaikanJalan from './Routes/GetPages/GetPerbaikanJalan'
import GetPembuangan from './Routes/GetPages/GetPembuangan'
import GetPenangkapan from './Routes/GetPages/GetPenangkapan'
import GetInovasi from './Routes/GetPages/GetInovasi'
import GetEvent from './Routes/GetPages/GetEvent'
import GetRelawan from './Routes/GetPages/GetRelawan'
import AdminPage from './Routes/AdminPages/adminPage'


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children:[
        {
          path: '/',
          element: <HomePage/>
        },

        {
          path: '/login',
          element: <Login/>
        },
        {
          path:'/register',
          element: <Register/>

        },
        {
          path: '/addJalan',
          element: <AddPerbaikanJalan/>
        },
        {
          path: '/addPembuangan',
          element: <Pembuangan/>
        },
        {
          path: '/addPenangkapan',
          element: <Penangkapan/>
        },
        {
          path: '/addEvent',
          element: <Event/>
        },
        {
          path: '/addinovasi',
          element: <Inovasi/>
        },
        {
          path: '/addVoulenter',
          element: <Voulenter/>
        },
        {
          path: '/dashboard',
          element: <DashboardPage/>,
          children: [
            {
              path: 'profile',
              element: <ProfilePage/>
            },
            {
              path:"service",
              element: <ProductPage/>
            },
            {
              path:"getPerbaikanJalan",
              element: <GetPerbaikanJalan/>
            },
            {
              path:"getPembuangan",
              element: <GetPembuangan/>
            },
            {
              path:"getPenangkapan",
              element: <GetPenangkapan/>
            },
            {
              path:"getInovasi",
              element: <GetInovasi/>
            },
            {
              path:"getEvent",
              element: <GetEvent/>
            },
            {
              path:"getRelawan",
              element: <GetRelawan/>
            },
            {
              path: 'services',
              element: <ServicesPage/>
            },
            {
              path:'admin',
              element:<AdminPage/>
            }

            
          ]
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
