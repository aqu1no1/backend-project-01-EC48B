import connect from '../db/connect.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

async function insertUser({ name, email, password, age }) {
    if (!name) throw new Error('Campo obrigatório ausente: name');
    if (!email) throw new Error('Campo obrigatório ausente: email');
    if (!password) throw new Error('Campo obrigatório ausente: password');
    if (!age) throw new Error('Campo obrigatório ausente: age');

    try {
        const db = await connect();
        const collection = db.collection('users');

        const jaExiste = await collection.findOne({ email });
        if (jaExiste) throw new Error('Email já cadastrado');

        const passwordHash = await bcrypt.hash(password, 10);

        const user = {
            _id: uuidv4(),
            name,
            email,
            password: passwordHash,
            age,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(user);
        console.log(`Usuário inserido com id: ${result.insertedId}`);
        return result;
    } catch (error) {
        console.error('Erro ao inserir usuário:', error.message);
        throw error;
    }
}

export default insertUser;