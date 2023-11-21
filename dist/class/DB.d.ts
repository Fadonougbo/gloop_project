import type { FastifyInstance } from "fastify";
export declare class DB {
    private fastify;
    constructor(fastify: FastifyInstance);
    getData(query: string, params?: (number | string)[]): Promise<import("pg").QueryResult<any> | undefined>;
}
