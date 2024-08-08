import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Store/store.js'
import { ToastContainer } from 'react-toastify'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./Pages/Home.jsx"
import EditDoc from "./Pages/EditDoc.jsx"
import SignUpPage from './Pages/SignUpPage.jsx'
import Doc from './Pages/Doc.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import AddDoc from './Pages/AddDoc.jsx'
import { Protected } from './Components/Index.js'



const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children:[
      {
        path:"/",
        element: (
          <Protected authentication={false}>
            <SignUpPage />
          </Protected>
        )
      },
      {
        path:"/login",
        element: (
          <Protected authentication={false}>
            <LoginPage />
          </Protected>
        )
      },
      {
        path:"/signup",
        element: (
          <Protected authentication={false}>
            <SignUpPage />
          </Protected>
        )
      },
      {
        path:"/home",
        element: (
          <Protected authentication={true}>
            <Home />
          </Protected>
        )
      },
      {
        path:"/edit-blog/:id",
        element: (
          <Protected authentication={true}>
            <EditDoc />
          </Protected>
        )
      },
      {
        path:"/blogs/:id",
        element: (
          <Protected authentication={true}>
            <Doc />
          </Protected>
        )
      },
      {
        path:"/add-blogs",
        element: (
          <Protected authentication={true}>
            <AddDoc />
          </Protected>
        )
      },
    ]

    
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router} />
     <ToastContainer />
    </Provider>
  </React.StrictMode>,
)
