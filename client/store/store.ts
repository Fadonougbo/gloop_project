import {create} from 'zustand'
import { RestaurantDataType } from '../components/Home/RestaurantList'


type StoreType={
    /* Liste des elements reçu de l'api */
    apiData:RestaurantDataType[]

    /* Si la valeur est true le modale est affiché */
    isEditMode:boolean,

    /* Les donnees  reçu par le modale en cas de modification */
    ModaleData:RestaurantDataType|undefined,

    /* Liste des donnees nouvellements modifiés */
    updateData: RestaurantDataType |undefined

    setApiType:(data:RestaurantDataType[])=>void,
    addApiData:(data:RestaurantDataType)=>void,

    changeEditMode:(data?:RestaurantDataType[])=>void,

    setUpdateData:(data:RestaurantDataType )=> void
}

export const useStore=create<StoreType>()((set,get)=>({
    apiData:[],
    ModaleData:undefined,
    isEditMode:false,
    updateData:undefined,
    setApiType(data) {
        set({apiData:data})
    },
    addApiData(data) {
      
      if(get().apiData && get().apiData.length>0 ) {
            set({apiData:[data,...get().apiData]})
      }else {
        set({apiData:[data]})
      }
        
    },
    changeEditMode(data) {

        set({isEditMode:!get().isEditMode,ModaleData:data?data[0]:undefined })
    },

    setUpdateData(data) {
        set({isEditMode:!get().isEditMode,updateData:data})
    }

}))