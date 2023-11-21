/// <reference types="node" />
import type { FastifyReply, FastifyRequest } from "fastify";
export declare const restaurants: (req: FastifyRequest, res: FastifyReply) => FastifyReply<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown>;
