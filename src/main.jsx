import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Login, Protect, Signup } from "./components/Index.js";
import Allpost from './components/pages/Allpost.jsx'
import Addpost from './components/pages/Addpost.jsx'
import Editpost from './components/pages/Editpost.jsx'
import Post from './components/pages/Post.jsx'
import Home from './components/pages/Home.jsx'
import Mypost from './components/pages/Mypost.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/login",
          element: (
            <Protect authentication={false}>
              <Login />
            </Protect>
          )
        },
        {
          path: "/signup",
          element: (
            <Protect authentication={false}>
              <Signup />
            // </Protect>
          )
        },
        {
          path: "/all-post",
          element: (
            <Protect authentication={true}>
              <Allpost />
            </Protect>
          )
        },
        {
          path: "/add-post",
          element: (
            <Protect authentication>
              <Addpost />
            // </Protect>
          )
        },
        {
          path: "/edit-post/:slug",
          element: (
            <Protect authentication={true}>
              {""}
              <Editpost />
            </Protect>
          )
        },
        {
          path: "/post/:slug",
          element: <Post />
        },
        {
          path: "/my-post/",
          element: <Mypost />
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider >
)
