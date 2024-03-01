import {create} from 'zustand'
import { RestaurantDataType } from '../components/Home/RestaurantList'



type StoreType={
    apiData:RestaurantDataType[]
    setApiType:(data:RestaurantDataType[])=>void
}

export const useStore=create<StoreType>()((set,get)=>({
    apiData:[],
    setApiType(data) {
        
        set({apiData:data})
    }
}))