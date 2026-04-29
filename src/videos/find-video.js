import connect from '../db/connect.js';

async function findVideos(filtro = {}) {
    try {
        const db = await connect();
        const collection = db.collection('videos');

        const videos = await collection.find(filtro).toArray();
        console.log(`${videos.length} vídeo(s) encontrado(s)`);
        return videos;
    } catch (error) {
        console.error('Erro ao buscar vídeos:', error.message);
        throw error;
    }
}

export default findVideos;