export class DB {
    fastify;
    constructor(fastify) {
        this.fastify = fastify;
    }
    async getData(query, params = []) {
        const client = await this.fastify.pg.connect();
        try {
            const data = await client.query(query, params);
            return data;
        }
        catch (e) {
            console.log(e);
        }
        finally {
            client.release();
        }
    }
}
