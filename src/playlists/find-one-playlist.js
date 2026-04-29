import connect from '../db/connect.js';

async function findOnePlaylist(id) {
    if (!id) throw new Error('Campo obrigatório ausente: id');

    try {
        const db = await connect();
        const collection = db.collection('playlists');

        const playlist = await collection.findOne({ _id: id });

        if (!playlist) {
            console.warn(`Nenhuma playlist encontrada com id: ${id}`);
            return null;
        }

        console.log(`Playlist encontrada: ${playlist.nomeDaPlaylist}`);
        return playlist;
    } catch (error) {
        console.error('Erro ao buscar playlist:', error.message);
        throw error;
    }
}

export default findOnePlaylist;