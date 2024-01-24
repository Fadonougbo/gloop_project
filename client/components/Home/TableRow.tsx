import React, { } from "react"
import { FilePenLine, Star, Trash2 } from 'lucide-react';
import type { RestaurantDataType } from "./RestaurantList";



export const TableRow=({location,name,price_rang}:RestaurantDataType)=> {

    const parsePriceRange=parseInt(price_rang)
    const arr=(new Array(parsePriceRange)).fill(0)
    
    const stars=arr.map((el,key)=> {
        return <Star fill='#b58348'strokeWidth={0} key={key}  size={28}/>
    })


    return (
        <tr>
            <td>{name}</td>
            <td>{location}</td>
            <td>{stars}</td>
            <td className="action" ><FilePenLine color='#3F51B5' size={40} /> </td>
            <td className="action" ><Trash2 color='#ac4a3a' size={40} /> </td>
        </tr> 
    )
}