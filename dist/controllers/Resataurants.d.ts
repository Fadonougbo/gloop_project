import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
type BodyDataType = {
    name: string;
    location: string;
    price_rang: number;
};
type FastifyRequestWithParams = FastifyRequest<{
    Params: {
        id: string;
    };
    Body: BodyDataType;
}>;
export declare class Restaurants {
    private fastify;
    private db;
    constructor(fastify: FastifyInstance);
    restaurants(req: FastifyRequest, res: FastifyReply): Promise<never>;
    restaurant(req: FastifyRequestWithParams, res: FastifyReply): Promise<never>;
    postRestaurant(req: FastifyRequestWithParams, res: FastifyReply): Promise<never>;
    putRestaurant(req: FastifyRequestWithParams, res: FastifyReply): Promise<never>;
    deleteRestaurant(req: FastifyRequestWithParams, res: FastifyReply): Promise<never>;
    private getResponse;
    private successResponse;
    private errorResponse;
}
export {};
