import React from 'react'
import {createRoot} from 'react-dom/client'
import { Home } from './Home/Home'
import  {RouterProvider, createBrowserRouter} from 'react-router-dom'


const router=createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    }
],{basename:'/restaurants'})

const root=createRoot(document.getElementById('root') as HTMLElement)

root.render(<RouterProvider router={router} /> )
