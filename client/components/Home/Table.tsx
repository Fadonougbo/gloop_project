import React, { useEffect } from "react"
import type { DataType } from "./RestaurantList";
import { TableRow } from "./TableRow";
import { kyCreate } from "./Home";
import { useStore } from "../../store/store";


const getData=async ()=> {
    const data=await kyCreate.get('restaurants').json<DataType>()
      return data;
  }


export const Table=()=> {

    const apiData=useStore((state)=>state.apiData)

    const setApiData=useStore((state)=>state.setApiType)


    useEffect(()=> {

        getData().then((res)=>{
            setApiData(res.data) 
        })

    },[])


    const tableRows=apiData.map((data)=> {
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
                    {
                        tableRows
                    }
                </tbody>
            </table>

    )
}