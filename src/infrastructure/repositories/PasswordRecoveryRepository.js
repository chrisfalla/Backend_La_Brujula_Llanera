import IPasswordRecoveryRepository from "../../domain/repositories/IPasswordRecoveryRepository.js";
import RecoveryPasswordDTO from "../../application/DTOs/RecoveryPasswordDTO.js";

export default class PasswordRecoveryRepository extends IPasswordRecoveryRepository{
    constructor(passwordRecoveryModel){
        super();
        this.passwordRecoveryModel = passwordRecoveryModel;
    }
    async generateVerificationCode(idUser) {
        const codeValue = Math.floor(100000 + Math.random() * 900000);
        const expiresAt = new Date(Date.now() + 3600000); 
        const newPasswordRecovery = await this.passwordRecoveryModel.create({
            idUserFk: idUser,
            codeValue,
            expiresAt,
            createdAt: new Date(),
        });
        return newPasswordRecovery;
    }
    async validateExpirationCode(idUser) {
        const existingRecovery = await this.passwordRecoveryModel.findOne({
            where: { idUserFk: idUser },
        });
    
        if (!existingRecovery) return null;
    
        const now = new Date();
        const isValid = existingRecovery.expiresAt >= now && !existingRecovery.isUsed && existingRecovery.attempts < 5;
        return isValid ? existingRecovery : null;
    }
    async updateVerificationCode(idUser){
        const existingRecovery = await this.passwordRecoveryModel.findOne({
            where: { idUserFk: idUser },
        });
        const codeValue = Math.floor(100000 + Math.random() * 900000);
        const expiresAt = new Date(Date.now() + 3600000); 
        if (!existingRecovery) {
            return await this.generateVerificationCode(idUser);
        }
        if (existingRecovery){
            const now = new Date();
            const isUsed = existingRecovery.isUsed;
            const isExpired = existingRecovery.expiresAt < now;
            if (isUsed || isExpired || existingRecovery.attempts >= 5) {
                await this.passwordRecoveryModel.update(
                    {
                        codeValue,
                        expiresAt,
                        isUsed: false,
                        attempts: 0,
                    },
                    {
                        where: { idUserFk: idUser },
                    }
                );
                const updatedRecovery = await this.passwordRecoveryModel.findOne({
                    where: { idUserFk: idUser },
                });
                return updatedRecovery;
            }
        } 
    }
    async getCodeByUser(idUser){
        const existingRecovery = await this.passwordRecoveryModel.findOne({
            where: { idUserFk: idUser },
        });
        if (!existingRecovery) return null;
        return new RecoveryPasswordDTO(existingRecovery.idPasswordRecovery, existingRecovery.codeValue, existingRecovery.expiresAt, existingRecovery.attempts, existingRecovery.idUserFk, existingRecovery.isUsed);
    }
}