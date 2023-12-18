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
    private shemas;
    constructor(fastify: FastifyInstance);
    restaurants(req: FastifyRequest, res: FastifyReply): Promise<never>;
    restaurant(req: FastifyRequestWithParams, res: FastifyReply): Promise<never>;
    postRestaurant(req: FastifyRequestWithParams, res: FastifyReply): Promise<{
        name?: string[] | undefined;
        location?: string[] | undefined;
        price_rang?: string[] | undefined;
        message: string;
    }>;
    putRestaurant(req: FastifyRequestWithParams, res: FastifyReply): Promise<{
        name?: string[] | undefined;
        location?: string[] | undefined;
        price_rang?: string[] | undefined;
        message: string;
    }>;
    deleteRestaurant(req: FastifyRequestWithParams, res: FastifyReply): Promise<never>;
    /**
     * Gere les erreurs lié a la base de donnees si il y en n'a
     *
     */
    private getResponse;
}
export {};
