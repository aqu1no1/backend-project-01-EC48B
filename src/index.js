import connect from "./db/connect.js";
import login from "./login/login.js";

import insertUser from "./users/insert-user.js";
import findOneUser from "./users/find-one-user.js";
import updateUser from "./users/update-user.js";
import deleteUser from "./users/delete-user.js";

import insertVideo from "./videos/insert-video.js";
import findVideos from "./videos/find-video.js";
import updateVideo from "./videos/update-video.js";
import deleteVideo from "./videos/delete-video.js";

import insertFavorite from "./favorites/insert-favorite.js";
import findFavorites from "./favorites/find-favorite.js";
import deleteFavorite from "./favorites/delete-favorite.js";

import insertPlaylist from "./playlists/insert-playlist.js";
import findPlaylists from "./playlists/find-playlist.js";
import updatePlaylist from "./playlists/update-playlist.js";
import deletePlaylist from "./playlists/delete-playlist.js";

import { logError } from "./logger/logger.js";

async function clearDatabase() {
    const db = await connect();
    await db.collection("users").deleteMany({});
    await db.collection("videos").deleteMany({});
    await db.collection("playlists").deleteMany({});
    await db.collection("favoritos").deleteMany({});
    await db.collection("favorites").deleteMany({});
}

async function main() {
    await clearDatabase();

    console.log("CADASTRO");
    await insertUser({
        name: "João Silva",
        email: "joao@email.com",
        password: "senha123",
        age: 25,
    });

    console.log("LOGIN (correto) ");
    const usuario = await login({
        email: "joao@email.com",
        password: "senha123",
    });

    console.log("LOGIN (senha errada)");
    try {
        await login({ email: "joao@email.com", password: "errada" });
    } catch (err) {
        console.log("Login bloqueado:", err.message, "\n");
    }

    console.log("LOGIN (email não existe) ");
    try {
        await login({ email: "naoexiste@email.com", password: "senha123" });
    } catch (err) {
        console.log("Login bloqueado:", err.message, "\n");
    }

    const userId = usuario._id;

    console.log(" GERENCIAR PERFIL ");
    await findOneUser(userId);
    await updateUser(userId, { name: "João Atualizado" });

    console.log(" VÍDEOS ");
    const videoInserido = await insertVideo({
        name: "Meu Primeiro Vídeo",
        url: "https://exemplo.com/video1.mp4",
        category: "Tecnologia",
        duration: 120,
        userId,
    });
    const videoId = videoInserido.insertedId;

    await findVideos();

    await updateVideo(videoId, { name: "Vídeo Editado", like: true });

    console.log("FAVORITOS");
    const video2 = await insertVideo({
        name: "Vídeo para favoritar",
        url: "https://exemplo.com/video2.mp4",
        category: "Games",
        duration: 60,
        userId,
    });
    const video2Id = video2.insertedId;

    await insertFavorite({ userId, videoId: video2Id });

    await findFavorites(userId);

    console.log("PLAYLISTS");
    const pl = await insertPlaylist({ userId, name: "Minha Playlist" });
    const playlistId = pl.insertedId;

    await findPlaylists({ userId });

    await updatePlaylist(playlistId, { adicionarVideo: video2Id });

    console.log("REMOVER DADOS");

    await deleteFavorite({ userId, videoId: video2Id });

    await deletePlaylist(playlistId);

    await deleteVideo(videoId);

    await deleteVideo(video2Id);

    await deleteUser(userId);
}

main().catch((err) => {
    logError("main", "Erro fatal na execução", err);
    process.exit(1);
});
