import React from "react"
import '../../public/style/home/home.scss';
import { RestaurantList } from "./RestaurantList";
import { RestaurantForm } from "./RestaurantForm";
import ky from "ky";

export const kyCreate=ky.create({prefixUrl:'http://localhost:8001/api/v1'})

export const Home=()=> {

    return(
        <>
            <div id="page_head" >
                <h1>Gloop</h1>
            </div>
            <RestaurantForm/>
            <RestaurantList/>
        </>
    )
}