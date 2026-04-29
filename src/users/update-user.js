import connect from '../db/connect.js';
import bcrypt from 'bcrypt';

async function updateUser(id, dto) {
    if (!id) throw new Error('Campo obrigatório ausente: id');
    if (!dto || Object.keys(dto).length === 0) throw new Error('Nenhum campo para atualizar');

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
            console.warn(`Nenhum usuário encontrado com id: ${id}`);
            return null;
        }

        console.log(`Usuário atualizado com id: ${id}`);
        return result;
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message);
        throw error;
    }
}

export default updateUser;