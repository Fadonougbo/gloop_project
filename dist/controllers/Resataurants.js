import { DB } from "../class/DB.js";
import { z } from 'zod';
export class Restaurants {
    fastify;
    db;
    shemas;
    constructor(fastify) {
        this.fastify = fastify;
        this.db = new DB(this.fastify);
        this.shemas = z.object({
            name: z.string(),
            location: z.string(),
            price_rang: z.string().or(z.number())
        });
        this.restaurants = this.restaurants.bind(this);
        this.restaurant = this.restaurant.bind(this);
        this.postRestaurant = this.postRestaurant.bind(this);
        this.putRestaurant = this.putRestaurant.bind(this);
        this.deleteRestaurant = this.deleteRestaurant.bind(this);
    }
    async restaurants(req, res) {
        const data = await this.db.getData("SELECT * FROM restaurants");
        let status = 200;
        const response = this.getResponse(data, "Aucun element n'a été trouvé");
        return res.status(status).send(response);
    }
    async restaurant(req, res) {
        const { id } = req.params;
        const restaurant_id = parseInt(id);
        const data = await this.db.getData("SELECT * FROM restaurants WHERE id=$1", [restaurant_id]);
        let status = 200;
        const response = this.getResponse(data, "Ce element n'exist pas");
        return res.status(status).send(response);
    }
    async postRestaurant(req, res) {
        const body = req.body;
        const shemas = this.shemas.required();
        const parseResponse = shemas.safeParse(body);
        const message = "Element non enregistré";
        /**
         * Affiche un message en cas d'erreur de validation
         */
        if (!parseResponse.success) {
            const errorsMessage = parseResponse.error.formErrors.fieldErrors;
            return { message, ...errorsMessage };
        }
        const { location, name, price_rang } = body;
        const data = await this.db.getData("INSERT INTO restaurants (name,location,price_rang) VALUES ($1,$2,$3) RETURNING id ", [name, location, price_rang]);
        const mergeData = { ...body, lastID: data?.rows[0] };
        let status = 200;
        const response = this.getResponse(data, message, [mergeData]);
        return res.status(status).send(response);
    }
    async putRestaurant(req, res) {
        const body = req.body;
        const shemas = this.shemas.partial();
        const parseResponse = shemas.safeParse(body);
        const message = "Element non modifié";
        /**
         * Affiche une message en cas d'erreur de validation
         */
        if (!parseResponse.success) /**
        Affiche une message en cas d'erreur de validation */ {
            const errorsMessage = parseResponse.error.formErrors.fieldErrors;
            return { message, ...errorsMessage };
        }
        const id = req.params.id;
        let setRequest = [];
        let values = [];
        let i = 1;
        for (const [key, value] of Object.entries(parseResponse.data)) {
            const p = `$${i}`;
            setRequest.push(`${key}=${p}`);
            values.push(value);
            i++;
        }
        if (setRequest.length === 0) {
            return { message: 'Aucune donnée entré pour des modifications' };
        }
        const joinSetRequest = setRequest.join(',');
        const data = await this.db.getData(`UPDATE restaurants SET ${joinSetRequest} WHERE id=$${i} `, [...values, id]);
        let status = 200;
        const response = this.getResponse(data, "Element non modifié");
        return res.status(status).send(response);
    }
    async deleteRestaurant(req, res) {
        const data = await this.db.getData("DELETE FROM restaurants WHERE id=$1 ", [req.params.id]);
        let status = 200;
        const response = this.getResponse(data, "Element non supprimé");
        return res.status(status).send(response);
    }
    /**
     * Gere les erreurs lié a la base de donnees si il y en n'a
     *
     */
    getResponse(data, message, bodyData) {
        let response = {};
        if ((data === undefined) || (data.rowCount === 0)) {
            response = {
                status: "error",
                message: message
            };
        }
        else {
            response = {
                status: "sucess",
                totalElement: data.rowCount,
                data: bodyData ?? (data?.rows)
            };
        }
        return response;
    }
}
