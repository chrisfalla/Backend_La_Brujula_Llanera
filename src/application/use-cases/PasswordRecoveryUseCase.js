export default class PasswordRecoveryUseCase {
    constructor(passwordRecoveryRepository, userRepository, emailService) {
        this.passwordRecoveryRepository = passwordRecoveryRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    async validateEmail(email) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error("Email not found");
        }

        const existingCode = await this.passwordRecoveryRepository.validateExpirationCode(user.idUser);

        if (existingCode) {
            return { message: "Code still available"};
        } else {
            const updatedCode = await this.passwordRecoveryRepository.updateVerificationCode(user.idUser);
            await this.emailService.sendEmail(
                user.email,
                "Código de Recuperación - La Brújula Llanera",
                `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                    <img src="https://ulgrkkcquytkafmoqwqt.supabase.co/storage/v1/object/sign/brujula-llanera/ejemplo/LogoBrujulaLLanera.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicnVqdWxhLWxsYW5lcmEvZWplbXBsby9Mb2dvQnJ1anVsYUxMYW5lcmEud2VicCIsImlhdCI6MTc0NzcwNjI3NSwiZXhwIjoxNzc5MjQyMjc1fQ.aLazXIoji1j4cclBszzRaOn4KEk43cBpWnYY5-bChvY" 
                         alt="Logo Brújula Llanera" 
                         style="display: block; margin: 0 auto 10px auto; width: 80px; height: auto;" />
                    <h2 style="color: #3b5998; text-align: center;">La Brújula Llanera</h2>
            
                    <p>Hola ${user.names || "usuario"},</p>
                    <p>Hemos recibido una solicitud para recuperar el acceso a tu cuenta.</p>
            
                    <p style="font-size: 18px; margin: 20px 0;">
                        Tu código de verificación es:
                    </p>
            
                    <div style="text-align: center; padding: 15px; background-color: #eef4ff; border: 1px dashed #3b5998; font-size: 24px; font-weight: bold; color: #3b5998;">
                        ${updatedCode.codeValue}
                    </div>
            
                    <p style="margin-top: 20px;">
                        Este código es válido por <strong>1 hora</strong> a partir de la recepción de este correo. Te recomendamos usarlo lo antes posible.
                    </p>
                    
                    <p>Si no solicitaste esta recuperación, simplemente ignora este mensaje.</p>
            
                    <p style="margin-top: 30px;">Gracias por confiar en nosotros.<br><strong>— Equipo de La Brújula Llanera</strong></p>
                </div>
                `
            );            
                     
            return { message: "Code Generated Succesfully"};
        }
    }
}
