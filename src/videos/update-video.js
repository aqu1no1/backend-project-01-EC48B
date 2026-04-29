import connect from '../db/connect.js';

async function updateVideo(id, dto) {
    if (!id) throw new Error('Campo obrigatório ausente: id');
    if (!dto || Object.keys(dto).length === 0) throw new Error('Nenhum campo para atualizar');

    try {
        const db = await connect();
        const collection = db.collection('videos');

        const update = { $set: { updatedAt: new Date() } };

        if (dto.like) {
            update.$inc = { 'count.like': 1 };
            delete dto.like;
        }
        if (dto.dislike) {
            update.$inc = { ...update.$inc, 'count.dislike': 1 };
            delete dto.dislike;
        }

        if (Object.keys(dto).length > 0) {
            update.$set = { ...update.$set, ...dto };
        }

        const result = await collection.updateOne(
            { _id: id },
            update
        );

        if (result.matchedCount === 0) {
            console.warn(`Nenhum vídeo encontrado com id: ${id}`);
            return null;
        }

        console.log(`Vídeo atualizado com id: ${id}`);
        return result;
    } catch (error) {
        console.error('Erro ao atualizar vídeo:', error.message);
        throw error;
    }
}

export default updateVideo;