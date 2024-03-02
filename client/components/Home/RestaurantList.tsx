import React, { useEffect, useState } from "react"
import { Table } from "./Table";

export type RestaurantDataType={
    id:string,
    name:string,
    location:string,
    price_rang:string
}

/* Type de l'element issu d'un GET */
export type DataType={
    data:RestaurantDataType[],
    status:string,
    totalElement:number

}


export const RestaurantList=()=> {

    const [isLoading,setIsLoading]=useState(true)


    useEffect(()=> {

        setIsLoading(false);

    },[])


    return (
        <>
        {
            !isLoading?<Table/>:'chargement'
        }
    </>
    )
}