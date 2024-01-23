import type { FastifyInstance } from "fastify";


export class DB {

    private fastify:FastifyInstance
    constructor(fastify:FastifyInstance) {
        this.fastify=fastify;
    }

    public async  getData(query:string,params:(number|string)[]=[]){

        const client=await this.fastify.pg.connect()
        try {
            const data= await client.query(query,params);
            return data
        }catch(e) {
            console.log(e);
        }finally {
            client.release()
        }

    }
}