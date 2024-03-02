import {create} from 'zustand'
import { RestaurantDataType } from '../components/Home/RestaurantList'



type StoreType={
    apiData:RestaurantDataType[]
    isEditMode:boolean,
    setApiType:(data:RestaurantDataType[])=>void,
    addApiData:(data:RestaurantDataType)=>void,
    changeEditMode:()=>void
}

export const useStore=create<StoreType>()((set,get)=>({
    apiData:[],
    isEditMode:false,
    setApiType(data) {
        set({apiData:data})
    },
    addApiData(data) {
        set({apiData:[data,...get().apiData]})
    },
    changeEditMode() {
        set({isEditMode:!get().isEditMode})
    },
}))