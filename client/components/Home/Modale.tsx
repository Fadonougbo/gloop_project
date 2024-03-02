import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import {createPortal} from 'react-dom'
import { SubmitHandler, useForm } from "react-hook-form"
import {z} from 'zod'
import { kyCreate } from "./Home"
import { useStore } from "../../store/store"

export const Modale=()=> {

  /* Shemas de verification */
  const shemas=z.object({
    name:z.string().min(3,{message:'min length 3'}),
    location:z.string().min(1,{message:'min length 1'}),
    price_rang:z.coerce.number().min(1,{message:'min value 1'}).max(5,{message:'max value 5'})
})

type FormDataType=z.infer<typeof shemas>

/* React hook form */
const {handleSubmit,register,formState:{errors}}=useForm<FormDataType>({
    mode:'onTouched',
    resolver:zodResolver(shemas)
})   

/* Donnee pour remplire le formulaire du modale */
const modaleData=useStore((state)=>state.ModaleData)

const setUpdateData=useStore((state)=>state.setUpdateData)

const handleFormSubmit:SubmitHandler<FormDataType>=async (data)=> {

    /* Modification des elements dans la base de donnee */
    const response=await kyCreate.put(`restaurant/${modaleData?.id}`,{
      json:data
    }).json<{status:string,totalElement:string,data:[]}>();
    

    if(response.status==='sucess' && modaleData?.id) {

      /* formatga pour que price_rang soit de type string */
      const {location,name,price_rang}=data;

      const id=modaleData.id

      /* je change les informations de la ligne modifie dans la vue */
      setUpdateData({location,name,price_rang:`${price_rang}`,id})

    }
    
}
  const changeEditMode=useStore((state)=>state.changeEditMode)


  const closeModaleHandle=()=> {
    /* Affiche ou ferme le modale */
    changeEditMode()
    
  }

   
  return  createPortal(
              <div id="modale" >
                <form action="" onSubmit={handleSubmit(handleFormSubmit)} >
                  <section>
                      <div className="cross_container" >
                          <div>
                            <button onClick={closeModaleHandle} >X</button>
                          </div>
                      </div>
                      <div className="input_container" >
                          <input type="text" 
                                placeholder="name" 
                                {...register('name')} 
                                defaultValue={modaleData?.name}
                                className={errors?.name&&'bad_value'}
                          />
                          {errors?.name&&<p className="error_message" >{errors?.name?.message}</p>}
                      </div>
                      <div className="input_container" >
                          <input type="text" 
                                {...register('location')} 
                                placeholder="location"
                                defaultValue={modaleData?.location}
                                className={errors?.location&&'bad_value'}  
                          />
                          {errors.location&&<p className="error_message" >{errors.location.message}</p>}
                      </div>
                      <div className="input_container" >
                          <input  type="number" 
                                  {...register('price_rang')} 
                                  placeholder="rang"
                                  defaultValue={modaleData?parseInt(modaleData.price_rang):0}
                                  className={errors?.price_rang&&'bad_value'}  
                          />
                          {errors?.price_rang&&<p className="error_message" >{errors?.price_rang?.message}</p>}
                      </div>
                      <div id="button_container" >
                          <button>Update</button>
                      </div>
                  </section>
              </form>
                        
              </div>,document.body)
}