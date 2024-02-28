import React from 'react'
import {createRoot} from 'react-dom/client'
import { Home } from './Home/Home'
import  {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { Show } from './Show/Show'
import { Update } from './Update/Update'


const router=createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/show/:id",
        element:<Show/>

    },
    {
        path:'/update/:id',
        element:<Update/>
    }
],{basename:'/restaurants'})

const root=createRoot(document.getElementById('root') as HTMLElement)

root.render(<RouterProvider router={router} /> )
