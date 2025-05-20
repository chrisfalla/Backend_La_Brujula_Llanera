import IPasswordRecoveryRepository from "../../domain/repositories/IPasswordRecoveryRepository.js";

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
        const isValid = existingRecovery.expiresAt >= now && !existingRecovery.isUsed;
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
            if (isUsed || isExpired) {
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
}