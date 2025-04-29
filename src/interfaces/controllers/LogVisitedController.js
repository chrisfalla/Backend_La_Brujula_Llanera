import { GetMoreVisitedPlaces } from "../../application/use-cases/GetMoreVisitedPlaces.js";

export class LogVisitedController {
    static async getMoreVisitedPlaces(req, res) {
        try {
            const getMoreVisitedPlaces = new GetMoreVisitedPlaces();
            const logVisits = await getMoreVisitedPlaces.execute();

            if (!logVisits || logVisits.length === 0) {
                return res.status(404).json({ message: 'No popular places found.' });
            }

            return res.status(200).json(logVisits);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error while getting the visited places.' });
        }
    }
}
