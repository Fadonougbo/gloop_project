import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { DB } from "../class/DB.js"
import { QueryResult } from "pg"

type BodyDataType={
    name:string,
    location:string,
    price_rang:number
}

type FastifyRequestWithParams=FastifyRequest<{
    Params:{
        id:string
    },
    Body:BodyDataType
}>

export class Restaurants {

    private fastify:FastifyInstance
    private db:DB;
    constructor(fastify:FastifyInstance) {
        this.fastify=fastify;
        this.db=new DB(this.fastify);

        this.successResponse=this.successResponse.bind(this);
        this.restaurants=this.restaurants.bind(this);
        this.restaurant=this.restaurant.bind(this);
        this.postRestaurant=this.postRestaurant.bind(this);
        this.putRestaurant=this.putRestaurant.bind(this)
        this.deleteRestaurant=this.deleteRestaurant.bind(this)

    }

    public async  restaurants(req:FastifyRequest,res:FastifyReply){

        const data=await this.db.getData("SELECT * FROM restaurants");
        let status=200
         
        const response=this.getResponse(data,"Aucun element n'a été trouvé")
        return res.status(status).send(response);

    }

    public async  restaurant(req:FastifyRequestWithParams,res:FastifyReply){

        const {id}=req.params
        const restaurant_id=parseInt(id);
        const data=await this.db.getData("SELECT * FROM restaurants WHERE id=$1",[restaurant_id]);
        let status=200

        const response=this.getResponse(data,"Ce element n'exist pas")
        return res.status(status).send(response);
    }

   async  postRestaurant(req:FastifyRequestWithParams,res:FastifyReply){
    
        const {location,name,price_rang}=req.body
        const data=await this.db.getData("INSERT INTO restaurants(name,location,price_rang) VALUES ($1,$2,$3) ",[name,location,price_rang]);
        let status=200

        const response=this.getResponse(data,"Element non enregistré",[req.body])
        
        return res.status(status).send(response);
    }

   async  putRestaurant(req:FastifyRequestWithParams,res:FastifyReply){
        
        const valideKey=["location","name","price_rang"];
        const body=req.body;
        const id=req.params.id
        
        let setRequest=[];
        let values=[];
       
       let i=1;
       for (const [key,value] of Object.entries(body)) {
        
            const element =valideKey.find((el)=>el===key)
            if(element) {
                const p=`$${i}`;
                setRequest.push(`${key}=${p}`);
                values.push(value)
                i++
             }

       }

        const joinSetRequest=setRequest.join(',')

        const data=await this.db.getData(`UPDATE restaurants SET ${joinSetRequest} WHERE id=$${i} `,[...values,id]);
        let status=200

        const response=this.getResponse(data,"Element non modifié")
        
        return res.status(status).send(response);
    }

    async deleteRestaurant(req:FastifyRequestWithParams,res:FastifyReply){

        const data=await this.db.getData("DELETE FROM restaurants WHERE id=$1 ",[req.params.id]);
        let status=200

        const response=this.getResponse(data,"Element non supprimé")
        
        return res.status(status).send(response);
    }

    private getResponse(data:QueryResult<any>|undefined,message:string,bodyData?:BodyDataType[]) {
        let response={};

        if((data===undefined)||(data.rowCount===0)) {
             response={
                status:"error",
                message:message
            }
         }else {
            response={
                status:"sucess",
                totalElement:data.rowCount,
                data:bodyData??(data?.rows)
            }
         }

         return response
    }

    private successResponse(data:QueryResult<any>,element?:BodyDataType[]) {
        
        const response={
            status:"sucess",
            totalElement:data.rowCount,
            data:element??data?.rows
        }
        
        return response
    }

    private errorResponse(message:string) {


        const response={
            status:"error",
            message:message
        }

        return response;

    }
}