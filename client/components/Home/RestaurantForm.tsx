import React from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from "react-hook-form";
import {z} from 'zod'



export const RestaurantForm=()=> {


    const shemas=z.object({
        name:z.string().min(3,{message:'min length 3'}),
        location:z.string().min(1,{message:'min length 1'}),
        price_rang:z.coerce.number().min(1,{message:'min value 1'}).max(5,{message:'max value 5'})
    })

    type FormDataType=z.infer<typeof shemas>

    const {handleSubmit,register,watch,formState:{errors,touchedFields}}=useForm<FormDataType>({
        mode:'onTouched',
        resolver:zodResolver(shemas)
    }) 

    console.log('x',touchedFields)

    const handleFormSubmit:SubmitHandler<FormDataType>=(e)=> {

       console.log(e)

       /*  const form=e.currentTarget as HTMLFormElement 

        const formdata=new FormData(form)
        const data=Object.fromEntries(formdata)
        
        const schemas=z.object({
            name:z.string(),
            location:z.string(),
            price_rang:z.coerce.number().min(1).max(5)
        })

        const res=schemas.safeParse({name:'doe',location:'ok',price_rang:-1})
        console.log(res); */
       
        
    }

    /* console.log('watch',watch())
    console.log('errors',errors) */
   


    return(
            <form action="" onSubmit={handleSubmit(handleFormSubmit)} >
                <section>
                    <div className="input_container" >
                        <input type="text" 
                               placeholder="name" 
                               {...register('name')} 
                        />
                        {errors?.name&&<p>{errors?.name?.message}</p>}
                    </div>
                    <div className="input_container" >
                        <input type="text" 
                               {...register('location')} 
                               placeholder="location"  
                         />
                        {errors.location&&<p>{errors.location.message}</p>}
                    </div>
                    <div className="input_container" >
                        <input  type="number" 
                                {...register('price_rang')} 
                                placeholder="rang"  
                        />
                        {errors?.price_rang&&<p>{errors?.price_rang?.message}</p>}
                    </div>
                    <div id="button_container" >
                        <button>Add</button>
                    </div>
                </section>
            </form>
    )
}