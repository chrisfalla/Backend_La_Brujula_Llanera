export default class UpdateUserInfoUseCase{
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async updateUserInfo(idUser, name, email, phone){
        const updatedUser = await this.userRepository.updateUserInfo(idUser, name, email, phone);
        if (!updatedUser) {
            throw new Error("Error updating user information");
        }
        return "User information updated successfully";
    }
}