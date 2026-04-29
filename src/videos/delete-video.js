import connect from '../db/connect.js';

async function deleteVideo(id) {
    if (!id) throw new Error('Campo obrigatório ausente: id');

    try {
        const db = await connect();
        const collection = db.collection('videos');

        const result = await collection.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            console.warn(`Nenhum vídeo encontrado com id: ${id}`);
            return null;
        }

        console.log(`Vídeo deletado com id: ${id}`);
        return result;
    } catch (error) {
        console.error('Erro ao deletar vídeo:', error.message);
        throw error;
    }
}

export default deleteVideo;