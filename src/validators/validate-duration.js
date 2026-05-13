export function validateDuration(duration) {
    if (typeof duration !== 'number' || duration <= 0 || !isFinite(duration)) {
        throw new Error(`Duração inválida: deve ser um número positivo em segundos (recebido: ${duration})`);
    }
}
