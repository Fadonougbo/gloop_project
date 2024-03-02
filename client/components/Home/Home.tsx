import React from "react"
import '../../public/style/home/home.scss';
import { RestaurantList } from "./RestaurantList";
import { RestaurantForm } from "./RestaurantForm";
import ky from "ky";
import { useStore } from "../../store/store";
import { Modale } from "./Modale";

/* Prefixe de base pour les api */
export const kyCreate=ky.create({prefixUrl:'http://localhost:8001/api/v1'})

export const Home=()=> {

    const isEditMode=useStore((state)=>state.isEditMode)

    return(
        <>
            <div id="page_head" >
                <h1>Gloop</h1>
            </div>
            {isEditMode?<Modale/>:null}
            <RestaurantForm/>
            <RestaurantList/>
        </>
    )
}