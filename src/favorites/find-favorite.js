import connect from '../db/connect.js';

async function findFavorites(userId) {
    if (!userId) throw new Error('Campo obrigatório ausente: userId');

    try {
        const db = await connect();
        const collection = db.collection('favoritos');

        const favoritos = await collection.find({ userId }).toArray();

        console.log(`${favoritos.length} favorito(s) encontrado(s)`);
        return favoritos;
    } catch (error) {
        console.error('Erro ao buscar favoritos:', error.message);
        throw error;
    }
}

export default findFavorites;