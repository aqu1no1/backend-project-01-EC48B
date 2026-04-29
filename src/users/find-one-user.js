import connect from '../db/connect.js';

async function findOneUser(id) {
    if (!id) throw new Error('Campo obrigatório ausente: id');

    try {
        const db = await connect();
        const collection = db.collection('users');

        const user = await collection.findOne(
            { _id: id },
            { projection: { password: 0 } }
        );

        if (!user) {
            console.warn(`Nenhum usuário encontrado com id: ${id}`);
            return null;
        }

        console.log(`Usuário encontrado: ${user.name}`);
        return user;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error.message);
        throw error;
    }
}

export default findOneUser;