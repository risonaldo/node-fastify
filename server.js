import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
// const database = new Database();
const database = new DatabasePostgres();

server.post("/videos", async (request, reply) => {

    const { title, description, duration } = request.body


    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send("video criado com sucesso");


})
server.get('/videos', async (request) => {
    const search = request.query.search
    const video = await database.list(search)

    return video;

})

server.put("/videos/:id",async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    });

    return reply.status(204).send();
})
server.delete("/videos/:id", async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})