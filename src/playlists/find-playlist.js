import connect from '../db/connect.js';

async function findPlaylists(filtro = {}) {
    try {
        const db = await connect();
        const collection = db.collection('playlists');

        const playlists = await collection.find(filtro).toArray();
        console.log(`${playlists.length} playlist(s) encontrada(s)`);
        return playlists;
    } catch (error) {
        console.error('Erro ao buscar playlists:', error.message);
        throw error;
    }
}

export default findPlaylists;