import React, { useRef, useState } from "react"
import type { MouseEvent } from "react"
import { FilePenLine, Star, Trash2 } from 'lucide-react';
import type { DataType, RestaurantDataType } from "./RestaurantList";
import { kyCreate } from "./Home";
import { useStore } from "../../store/store";


export const TableRow=({id,location,name,price_rang}:RestaurantDataType)=> {

    const parsePriceRange=parseInt(price_rang)
    const arr=(new Array(parsePriceRange)).fill(0)
    
    const stars=arr.map((el,key)=> {
        return <Star fill='#b58348'strokeWidth={0} key={key}  size={28}/>
    })
    
    const rowRef=useRef<HTMLTableRowElement>(null);

    /* Delete data */
    const removeClick=async (e:MouseEvent)=>{
        const isConfirmed=confirm("Delete this restaurant?");

        if(!isConfirmed) {
            e.preventDefault();
            return false;
        }

        const response=await kyCreate.delete(`restaurant/${id}`).json<DataType>();
        if(response.status==='sucess') {
            rowRef.current?.remove()
        }

       
    }

    const changeEditMode=useStore((state)=>state.changeEditMode)

    const editClick=()=> {
        changeEditMode()
    }

    return (
        <tr ref={rowRef} >
            <td>{name}</td>
            <td>{location}</td>
            <td className="" >{stars}</td>
            <td className="action" onClick={editClick}  ><FilePenLine color='#3F51B5' size={40} /> </td>
            <td className="action" onClick={removeClick}  ><Trash2 color='#ac4a3a' size={40} /> </td>
        </tr> 
    )
}