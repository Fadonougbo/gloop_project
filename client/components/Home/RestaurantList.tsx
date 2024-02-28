import React, { useEffect, useState } from "react"
import { Table } from "./Table";

export type RestaurantDataType={
    id:string,
    name:string,
    location:string,
    price_rang:string
}

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