import connect from '../db/connect.js';
import bcrypt from 'bcrypt';

async function login({ email, password }) {
    if (!email) throw new Error('Campo obrigatório ausente: email');
    if (!password) throw new Error('Campo obrigatório ausente: password');

    try {
        const db = await connect();
        const collection = db.collection('users');

        const user = await collection.findOne({ email });
        if (!user) throw new Error('Email ou senha inválidos');

        const senhaCorreta = await bcrypt.compare(password, user.password);
        if (!senhaCorreta) throw new Error('Email ou senha inválidos');

        console.log(`Login realizado: ${user.name}`);
        const { password: _, ...userSemSenha } = user;
        return userSemSenha;
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
        throw error;
    }
}

export default login;