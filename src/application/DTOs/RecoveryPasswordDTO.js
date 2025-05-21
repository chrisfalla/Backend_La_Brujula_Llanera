export default class RecoveryPasswordDTO{
    constructor(idPasswordRecovery, codeValue, expiresAt, attempts, idUserFk, isUsed){
        this.idPasswordRecovery = idPasswordRecovery;
        this.codeValue = codeValue;
        this.expiresAt = expiresAt;
        this.attempts = attempts;
        this.idUserFk = idUserFk;
        this.isUsed = isUsed;
    }
}