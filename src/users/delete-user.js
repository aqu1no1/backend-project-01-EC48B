import connect from '../db/connect.js';
import { logError, logInfo, logWarn } from '../logger/logger.js';

async function deleteUser(id) {
    if (!id) throw new Error('Campo obrigatório ausente: id');

    try {
        const db = await connect();
        const collection = db.collection('users');
        const result = await collection.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            logWarn('deleteUser', `Nenhum usuário encontrado com id: ${id}`);
            return null;
        }

        logInfo('deleteUser', `Usuário deletado com id: ${id}`);
        return result;
    } catch (error) {
        logError('deleteUser', 'Erro ao deletar usuário', error);
        throw error;
    }
}

export default deleteUser;