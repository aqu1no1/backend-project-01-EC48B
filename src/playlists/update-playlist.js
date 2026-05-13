import connect from '../db/connect.js';
import { logError, logInfo, logWarn } from '../logger/logger.js';

async function updatePlaylist(id, dto) {
  if (!id) throw new Error('Campo obrigatório ausente: id');
  if (!dto || Object.keys(dto).length === 0) throw new Error('Nenhum campo para atualizar');

  try {
    const db = await connect();
    const collection = db.collection('playlists');

    const update = { $set: { updatedAt: new Date() } };

    if (dto.adicionarVideo) {
      update.$push = { videoId: dto.adicionarVideo };
      delete dto.adicionarVideo;
    }
    if (dto.removerVideo) {
      update.$pull = { videoId: dto.removerVideo };
      delete dto.removerVideo;
    }
    if (Object.keys(dto).length > 0) {
      update.$set = { ...update.$set, ...dto };
    }

    const result = await collection.updateOne({ _id: id }, update);

    if (result.matchedCount === 0) {
      logWarn('updatePlaylist', `Nenhuma playlist encontrada com id: ${id}`);
      return null;
    }

    logInfo('updatePlaylist', `Playlist atualizada com id: ${id}`);
    return result;
  } catch (error) {
    logError('updatePlaylist', 'Erro ao atualizar playlist', error);
    throw error;
  }
}

export default updatePlaylist;