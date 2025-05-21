export default class IPasswordRecoveryRepository {
    async generateVerificationCode(idUser) { throw new Error('Method not implemented'); }
    async validateVerificationCode(email, code) { throw new Error('Method not implemented'); }
    async updateVerificationCode(idUser) { throw new Error('Method not implemented'); }
    async validateExpirationCode(idUser) { throw new Error('Method not implemented'); }
    async getCodeByUser(idUser){ throw new Error('Method not implemented'); }
}