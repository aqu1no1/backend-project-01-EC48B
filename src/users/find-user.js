import connect from '../db/connect.js';

async function findUsers(filtro = {}) {
    try {
        const db = await connect();
        const collection = db.collection('users');

        const users = await collection.find(filtro, {
            projection: { password: 0 },
        }).toArray();

        console.log(`${users.length} usuário(s) encontrado(s)`);
        return users;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error.message);
        throw error;
    }
}

export default findUsers;