import connect from '../db/connect.js';
import bcrypt from 'bcrypt';
import { validateEmail } from '../validators/validate-email.js';
import { logError, logInfo } from '../logger/logger.js';

async function login({ email, password }) {
    if (!email) throw new Error('Campo obrigatório ausente: email');
    if (!password) throw new Error('Campo obrigatório ausente: password');

    validateEmail(email);

    try {
        const db = await connect();
        const collection = db.collection('users');
        const user = await collection.findOne({ email });

        if (!user) throw new Error('Email ou senha inválidos');

        const senhaCorreta = await bcrypt.compare(password, user.password);
        if (!senhaCorreta) throw new Error('Email ou senha inválidos');

        logInfo('login', `Login realizado: ${user.name}`);
        const { password: _, ...userSemSenha } = user;
        return userSemSenha;
    } catch (error) {
        logError('login', 'Erro ao fazer login', error);
        throw error;
    }
}

export default login;