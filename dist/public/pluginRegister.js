import { fastifyCookie } from "@fastify/cookie";
import * as fastifyFormbody from "@fastify/formbody";
import * as fastifyPostgres from "@fastify/postgres";
export const pluginRegister = (fastify) => {
    const user = process.env.PG_USER;
    const password = process.env.PG_PASSWORD;
    const database = process.env.PG_DATABASE;
    fastify.register(fastifyFormbody);
    fastify.register(fastifyPostgres, { user, password, database });
    fastify.register(fastifyCookie);
    //fastify.register(fastifyCsrfProtection)
    return fastify;
};
