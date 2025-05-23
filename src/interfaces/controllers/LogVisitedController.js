import AddLogDTO from "../../application/DTOs/AddLogDTO.js";

export default class LogVisitedController {
    constructor(addLogUseCase) {
        this.addLogUseCase = addLogUseCase;
    }

    async addLogVisit(req, res) {
        try {
            const { idDeviceInfoFk, idPlaceFk, idUserFk } = req.body;
            if (!idDeviceInfoFk || !idPlaceFk || !idUserFk) {
                return res.status(400).json({ message: 'Missing required fields.' });
            }
            const logVisitInfo = new AddLogDTO(idDeviceInfoFk, idUserFk, idPlaceFk);

            const wasAdded = await this.addLogUseCase.addLog(logVisitInfo);

            if (wasAdded === false) {
                // Ya existe el log, pero respondemos con 200
                return res.status(200).json({ message: 'Log visit already exists.' });
            }

            // Se agregó correctamente
            return res.status(201).json({ message: 'Log visit added successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error while adding log visit.' });
        }
    }
}