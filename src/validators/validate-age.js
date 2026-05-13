export function validateAge(age) {
    if (typeof age !== 'number' || !Number.isInteger(age) || age <= 0 || age > 120) {
        throw new Error(`Idade inválida: deve ser um número inteiro entre 1 e 120 (recebido: ${age})`);
    }
}