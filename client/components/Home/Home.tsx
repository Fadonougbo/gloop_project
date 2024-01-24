import React from "react"
import '../../public/style/home/home.scss';
import { RestaurantList } from "./RestaurantList";
import { RestaurantForm } from "./RestaurantForm";

export const Home=()=> {

    console.log();

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