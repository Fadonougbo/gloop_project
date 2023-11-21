// Import the framework and instantiate it
import Fastify from 'fastify';
const fastify = Fastify();
// Declare a route
fastify.get('/', async function handler(request, reply) {
    return { hello: 'world' };
});
// Run the server!
try {
    await fastify.listen({ port: 8000 });
}
catch (err) {
    fastify.log.error(err);
    if (err instanceof Error) {
        console.log(err.message);
    }
    process.exit(1);
}
