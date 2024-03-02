import React from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from "react-hook-form";
import {z} from 'zod'
import { kyCreate } from "./Home";
import { useStore } from "../../store/store";

type ResponseType={
    status:string,
    totalElement:number,
    data:[
        {
            name:string,
            location:string,
            price_rang:string
            lastID:{
                id:string
            }
        }
    ]
}

export const RestaurantForm=()=> {

    /* Shemas de validation des datas */
    const shemas=z.object({
        name:z.string().min(3,{message:'min length 3'}),
        location:z.string().min(1,{message:'min length 1'}),
        price_rang:z.coerce.number().min(1,{message:'min value 1'}).max(5,{message:'max value 5'})
    })

    type FormDataType=z.infer<typeof shemas>

    const {handleSubmit,register,formState:{errors}}=useForm<FormDataType>({
        mode:'onTouched',
        resolver:zodResolver(shemas)
    })   

    const addApiData=useStore((state)=>state.addApiData)

    const handleFormSubmit:SubmitHandler<FormDataType>=async (data)=> {

         
        const response=await kyCreate.post('restaurant',{
          json:data
        }).json<ResponseType>();
        
        const {name,lastID:{id},location,price_rang}=response.data[0]
        
        const formateData={name,location,price_rang,id};

        addApiData(formateData)
        
    }
   


    return(
            <form action="" onSubmit={handleSubmit(handleFormSubmit)} >
                <section>
                    <div className="input_container" >
                        <input type="text" 
                               placeholder="name" 
                               {...register('name')} 
                               className={errors?.name&&'bad_value'}
                        />
                        {errors?.name&&<p className="error_message" >{errors?.name?.message}</p>}
                    </div>
                    <div className="input_container" >
                        <input type="text" 
                               {...register('location')} 
                               placeholder="location"
                               className={errors?.location&&'bad_value'}  
                         />
                        {errors.location&&<p className="error_message" >{errors.location.message}</p>}
                    </div>
                    <div className="input_container" >
                        <input  type="number" 
                                {...register('price_rang')} 
                                placeholder="rang"
                                className={errors?.price_rang&&'bad_value'}  
                        />
                        {errors?.price_rang&&<p className="error_message" >{errors?.price_rang?.message}</p>}
                    </div>
                    <div id="button_container" >
                        <button>Add</button>
                    </div>
                </section>
            </form>
    )
}