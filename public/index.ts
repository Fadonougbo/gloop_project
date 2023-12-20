import Fastify from 'fastify'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Restaurants } from '../controllers/Resataurants.js'
import { pluginRegister } from './pluginRegister.js'


const server = Fastify()

const fastify=pluginRegister(server)

const newRestaurants=new Restaurants(fastify)

/*  fastify.get('/essai',async (req:FastifyRequest,res:FastifyReply)=> {

  const token = await res.generateCsrf()
  return { token }
})
 

fastify.post('/essai',async (req:FastifyRequest,res:FastifyReply)=> {

  console.log(req.cookies);
  return  req.body
}) */


// Get all restaurants

fastify.get('/api/v1/restaurants',newRestaurants.restaurants)

//Get one restaurant

fastify.get('/api/v1/restaurant/:id',newRestaurants.restaurant)

//post reataurant data

fastify.post('/api/v1/restaurant',newRestaurants.postRestaurant)

//put data
fastify.put('/api/v1/restaurant/:id',newRestaurants.putRestaurant)

//delete data
fastify.delete('/api/v1/restaurant/:id',newRestaurants.deleteRestaurant)
// Run the server! 

try {

  const PORT=process.env.PORT
  const port=PORT?parseInt(PORT):8000;

  fastify.listen({ port: port })

} catch (err) {

  fastify.log.error(err)

  if(err instanceof Error) {
    console.log(err.message);
  }
  process.exit(1)
  
}