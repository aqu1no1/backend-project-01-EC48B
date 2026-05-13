import connect from '../db/connect.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { validateAge } from '../validators/validate-age.js';
import { validateEmail } from '../validators/validate-email.js';
import { logError, logInfo } from '../logger/logger.js';

async function insertUser({ name, email, password, age }) {
    if (!name) throw new Error('Campo obrigatório ausente: name');
    if (!email) throw new Error('Campo obrigatório ausente: email');
    if (!password) throw new Error('Campo obrigatório ausente: password');
    if (age === undefined || age === null) throw new Error('Campo obrigatório ausente: age');

    validateEmail(email);
    validateAge(age);

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
        logInfo('insertUser', `Usuário inserido com id: ${result.insertedId}`);
        return result;
    } catch (error) {
        logError('insertUser', 'Erro ao inserir usuário', error);
        throw error;
    }
}

export default insertUser;