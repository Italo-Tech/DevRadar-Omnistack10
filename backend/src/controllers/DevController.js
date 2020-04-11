const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray'); // importando para poder ser reutilizado em outros documentos
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    // Rota de Listar Devs
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    // Rota de Cadastrar Devs
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        // Impedir que usuário repetido seja cadastrado
        let dev = await Dev.findOne({ github_username }); // buscar um usuário pelo username

        if (!dev) { // se o dev buscado n existir...
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            // Filtrar as conexões que estão há no máximo 10km de distância 
            // e que o novo dev tenha pelo menos umas das techs filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }


        return response.json(dev);
    },

    // LIÇÃO DE CASA
    //Criar outros métodos

    // Rota de update - atualizar um único dev
    async update() {
        // nome, avatar, bio, location, techs
    },

    // Rota Delete - deletar
    async destroy(request, response) {
        try {
            await Dev.findOneAndDelete({ _id: request.params.id })

            return res.json({ message: 'User successfully deleted' });
        } catch (err) {
            return response.status(400).json({ error: 'Error deleting project' })
        }
    }
    // async delete(request, response) {
    //     const { id } = request.params
    //     const github_username = request.headers.authorization;

    //     const dev = await connection('dev')
    //         .where('github_username', id)
    //         .select('dev_id')
    //         .first();

    //     if (dev.dev_id != dev_id) {
    //         return response.status(401).json({ error: 'Operation not permitted.' });
    //     }

    //     await connection('devs').where('dev_id', id).delete();

    //     return response.status(204).send();
    // }
};

