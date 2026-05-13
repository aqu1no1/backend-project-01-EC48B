import connect from '../db/connect.js';
import { logError, logInfo, logWarn } from '../logger/logger.js';

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
            logWarn('findOneUser', `Nenhum usuário encontrado com id: ${id}`);
            return null;
        }

        logInfo('findOneUser', `Usuário encontrado: ${user.name}`);
        return user;
    } catch (error) {
        logError('findOneUser', 'Erro ao buscar usuário', error);
        throw error;
    }
}

export default findOneUser;