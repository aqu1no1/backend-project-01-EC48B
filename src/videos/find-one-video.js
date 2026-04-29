import connect from '../db/connect.js';

async function findOneVideo(id) {
    if (!id) throw new Error('Campo obrigatório ausente: id');

    try {
        const db = await connect();
        const collection = db.collection('videos');

        const video = await collection.findOne({ _id: id });

        if (!video) {
            console.warn(`Nenhum vídeo encontrado com id: ${id}`);
            return null;
        }

        console.log(`Vídeo encontrado: ${video.nome}`);
        return video;
    } catch (error) {
        console.error('Erro ao buscar vídeo:', error.message);
        throw error;
    }
}

export default findOneVideo;