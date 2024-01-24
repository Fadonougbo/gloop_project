import React, { useEffect, useState } from "react"
import ky from 'ky'
import type { DataType, RestaurantDataType } from "./RestaurantList";
import { TableRow } from "./TableRow";


const kyCreate=ky.create({prefixUrl:'http://localhost:8000/api/v1'})

const getData=async ()=> {
    const data=await kyCreate.get('restaurants').json<DataType>()
      return data;
  }


export const Table=()=> {

    const [state,setState]=useState<RestaurantDataType[]>([])


    useEffect(()=> {

        const data=getData()
        .then((res)=>{
            setState(()=>res.data) 
        })

    },[])


    const tableRows=state.map((data)=> {
        return <TableRow {...data} key={data.id} />
    })


    return (

            <table>
                <thead>
                    <tr>
                        <th>Restaurant</th>
                        <th>Location</th>
                        <th>Ratings</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
{/*                     <tr>
                        <td>Delice</td>
                        <td>Cotonou</td>
                        <td>****</td>
                        <td className="action" ><FilePenLine color='#102706' size={40} /> </td>
                        <td className="action" ><Trash2 color='#ac4a3a' size={40} /> </td>
                    </tr> */}
                    {
                        tableRows
                    }
                </tbody>
            </table>

    )
}