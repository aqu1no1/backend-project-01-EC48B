import connect from '../db/connect.js';

async function deletePlaylist(id) {
    if (!id) throw new Error('Campo obrigatório ausente: id');

    try {
        const db = await connect();
        const collection = db.collection('playlists');

        const result = await collection.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            console.warn(`Nenhuma playlist encontrada com id: ${id}`);
            return null;
        }

        console.log(`Playlist deletada com id: ${id}`);
        return result;
    } catch (error) {
        console.error('Erro ao deletar playlist:', error.message);
        throw error;
    }
}

export default deletePlaylist;