export default class DashBoardController{
    constructor(DashBoardUseCase){
        this.DashBoardUseCase = DashBoardUseCase
    }
    async createDashBoard(req, res){
        try{
            const { images, place, socialMedia, tags, address } = req.body;
            const dashBoard = await this.DashBoardUseCase.execute(images, place, socialMedia, tags, address);
            res.status(200).json(dashBoard)
        }catch (error){
            console.error(error);
            res.status(500).json({ message: 'Error while creating DashBoard.' });
        }
    }
}