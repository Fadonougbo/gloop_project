import React, { useEffect } from "react"
import { FilePenLine, Trash2 } from 'lucide-react';
import ky from 'ky'

const kyCreate=ky.create({prefixUrl:'http://localhost:8000/api/v1/restaurants'})


export const RestaurantList=()=> {

    useEffect(()=> {

        kyCreate.get('')
        .then(data=>console.log(data))



    },[])

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
                <tr>
                    <td>Delice</td>
                    <td>Cotonou</td>
                    <td>****</td>
                    <td className="action" ><FilePenLine color='#102706' size={40} /> </td>
                    <td className="action" ><Trash2 color='#ac4a3a' size={40} /> </td>
                </tr>
                <tr>
                    <td>Delice</td>
                    <td>Cotonou</td>
                    <td>****</td>
                    <td>edit</td>
                    <td>delete</td>
                </tr>
                <tr>
                    <td>Delice</td>
                    <td>Cotonou</td>
                    <td>****</td>
                    <td>edit</td>
                    <td>delete</td>
                </tr>
                <tr>
                    <td>Delice</td>
                    <td>Cotonou</td>
                    <td>****</td>
                    <td>edit</td>
                    <td>delete</td>
                </tr>
                <tr>
                    <td>Delice</td>
                    <td>Cotonou</td>
                    <td>****</td>
                    <td>edit</td>
                    <td>delete</td>
                </tr>
            </tbody>
        </table>
    )
}