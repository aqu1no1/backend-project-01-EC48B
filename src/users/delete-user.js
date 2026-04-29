import connect from '../db/connect.js';

async function deleteUser(id) {
    if (!id) throw new Error('Campo obrigatório ausente: id');

    try {
        const db = await connect();
        const collection = db.collection('users');

        const result = await collection.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            console.warn(`Nenhum usuário encontrado com id: ${id}`);
            return null;
        }

        console.log(`Usuário deletado com id: ${id}`);
        return result;
    } catch (error) {
        console.error('Erro ao deletar usuário:', error.message);
        throw error;
    }
}

export default deleteUser;