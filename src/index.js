import connect from './db/connect.js';
import login from './login/login.js';

import insertUser from './users/insert-user.js';
import findOneUser from './users/find-one-user.js';
import updateUser from './users/update-user.js';
import deleteUser from './users/delete-user.js';

import insertVideo from './videos/insert-video.js';
import findVideos from './videos/find-video.js';
import updateVideo from './videos/update-video.js';
import deleteVideo from './videos/delete-video.js';

import insertFavorite from './favorites/insert-favorite.js';
import findFavorites from './favorites/find-favorite.js';
import deleteFavorite from './favorites/delete-favorite.js';

import insertPlaylist from './playlists/insert-playlist.js';
import findPlaylists from './playlists/find-playlist.js';
import updatePlaylist from './playlists/update-playlist.js';
import deletePlaylist from './playlists/delete-playlist.js';

async function clearDatabase() {
    const db = await connect();
    await db.collection('users').deleteMany({});
    await db.collection('videos').deleteMany({});
    await db.collection('playlists').deleteMany({});
    await db.collection('favoritos').deleteMany({});
    await db.collection('favorites').deleteMany({});
}

async function main() {
    await clearDatabase();

    console.log('=== CADASTRO ===');
    await insertUser({
        name: 'João Silva',
        email: 'joao@email.com',
        password: 'senha123',
        age: 25,
    });
    console.log('Usuário cadastrado\n');

    console.log('=== LOGIN (correto) ===');
    const usuario = await login({ email: 'joao@email.com', password: 'senha123' });
    console.log('Login OK - bem vindo,', usuario.name);
    console.log('  id:', usuario._id, '\n');

    console.log('=== LOGIN (senha errada) ===');
    try {
        await login({ email: 'joao@email.com', password: 'errada' });
    } catch (err) {
        console.log('Login bloqueado:', err.message, '\n');
    }

    console.log('=== LOGIN (email não existe) ===');
    try {
        await login({ email: 'naoexiste@email.com', password: 'senha123' });
    } catch (err) {
        console.log('Login bloqueado:', err.message, '\n');
    }

    const userId = usuario._id;

    console.log('=== GERENCIAR PERFIL ===');
    const perfil = await findOneUser(userId);
    console.log('Perfil carregado:', perfil.name, '-', perfil.email);
    await updateUser(userId, { name: 'João Atualizado' });
    console.log('Perfil atualizado\n');

    console.log('=== VÍDEOS ===');
    const videoInserido = await insertVideo({
        name: 'Meu Primeiro Vídeo',
        url: 'https://exemplo.com/video1.mp4',
        category: 'Tecnologia',
        duration: 120,
        userId,
    });
    const videoId = videoInserido.insertedId;
    console.log('Vídeo enviado - id:', videoId);

    const videos = await findVideos();
    console.log('Vídeos encontrados:', videos.length);

    await updateVideo(videoId, { name: 'Vídeo Editado', like: true });
    console.log('Vídeo editado e like adicionado\n');

    console.log('=== FAVORITOS ===');
    const video2 = await insertVideo({
        name: 'Vídeo para favoritar',
        url: 'https://exemplo.com/video2.mp4',
        category: 'Games',
        duration: 60,
        userId,
    });
    const video2Id = video2.insertedId;

    await insertFavorite({ userId, videoId: video2Id });
    console.log('Favoritado');

    const favoritos = await findFavorites(userId);
    console.log('Favoritos:', favoritos.length, '\n');

    console.log('=== PLAYLISTS ===');
    const pl = await insertPlaylist({ userId, name: 'Minha Playlist' });
    const playlistId = pl.insertedId;
    console.log('Playlist criada - id:', playlistId);

    const playlists = await findPlaylists({ userId });
    console.log('Playlists do usuário:', playlists.length);

    await updatePlaylist(playlistId, { adicionarVideo: video2Id });
    console.log('Vídeo adicionado à playlist\n');

    console.log('=== LIMPEZA DOS DADOS ===');

    await deleteFavorite({ userId, videoId: video2Id });
    console.log('Favorito removido');

    await deletePlaylist(playlistId);
    console.log('Playlist removida');

    await deleteVideo(videoId);
    console.log('Vídeo 1 removido');

    await deleteVideo(video2Id);
    console.log('Vídeo 2 removido');

    await deleteUser(userId);
    console.log('Conta removida');
}

main().catch((err) => {
    console.error('Erro:', err.message);
    process.exit(1);
});