import * as fastifyFormbody from "@fastify/formbody";
import * as fastifyPostgres from "@fastify/postgres";
import type { FastifyInstance } from "fastify";


export const pluginRegister=(fastify:FastifyInstance):FastifyInstance=> {
    
    const user=process.env.PG_USER;
    const password=process.env.PG_PASSWORD;
    const database=process.env.PG_DATABASE;

    fastify.register(fastifyFormbody);
    fastify.register(fastifyPostgres,{user,password,database})

    return fastify
}