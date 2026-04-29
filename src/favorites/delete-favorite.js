import connect from '../db/connect.js';

async function deleteFavorite({ userId, videoId }) {
    if (!userId)  throw new Error('Campo obrigatório ausente: userId');
    if (!videoId) throw new Error('Campo obrigatório ausente: videoId');

    try {
        const db = await connect();
        const collection = db.collection('favoritos');

        const result = await collection.deleteOne({ userId, videoId });

        if (result.deletedCount === 0) {
            console.warn('Favorito não encontrado');
            return null;
        }

        console.log(`Favorito removido: userId=${userId} videoId=${videoId}`);
        return result;
    } catch (error) {
        console.error('Erro ao deletar favorito:', error.message);
        throw error;
    }
}

export default deleteFavorite;