import React, { FormEvent } from "react"
import {Schema, z} from 'zod'

export const RestaurantForm=()=> {


    const handleSubmit=(e:FormEvent)=> {
        e.preventDefault();
        const form=e.currentTarget as HTMLFormElement 

        const formdata=new FormData(form)
        const data=Object.fromEntries(formdata)
        
        const schemas=z.object({
            name:z.string(),
            location:z.string(),
            price_rang:z.coerce.number().min(1).max(5)
        })

        const res=schemas.safeParse({name:'doe',location:'ok',price_rang:-1})
        console.log(res);
       
        
    }


    return(
            <form action="" onSubmit={handleSubmit} >
                <section>
                    <div className="input_container" >
                        <input type="text" name="name" placeholder="name"  id="" />
                    </div>
                    <div className="input_container" >
                        <input type="text" name="location" placeholder="location"  id="" />
                    </div>
                    <div className="input_container" >
                        <input type="number" name="price_rang" placeholder="rang" min={0} max={5}  id="" />
                    </div>
                    <div id="button_container" >
                        <button>Add</button>
                    </div>
                </section>
            </form>
    )
}