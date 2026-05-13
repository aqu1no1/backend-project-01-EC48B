import connect from '../db/connect.js';
import bcrypt from 'bcrypt';
import { validateAge } from '../validators/validate-age.js';
import { validateEmail } from '../validators/validate-email.js';
import { logError, logInfo, logWarn } from '../logger/logger.js';

async function updateUser(id, dto) {
    if (!id) throw new Error('Campo obrigatório ausente: id');
    if (!dto || Object.keys(dto).length === 0) throw new Error('Nenhum campo para atualizar');

    if (dto.email !== undefined) validateEmail(dto.email);
    if (dto.age !== undefined) validateAge(dto.age);

    try {
        const db = await connect();
        const collection = db.collection('users');

        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }

        const result = await collection.updateOne(
            { _id: id },
            { $set: { ...dto, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            logWarn('updateUser', `Nenhum usuário encontrado com id: ${id}`);
            return null;
        }

        logInfo('updateUser', `Usuário atualizado com id: ${id}`);
        return result;
    } catch (error) {
        logError('updateUser', 'Erro ao atualizar usuário', error);
        throw error;
    }
}

export default updateUser;