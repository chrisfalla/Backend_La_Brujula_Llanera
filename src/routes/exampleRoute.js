import { Router } from 'express';
const router = Router();
import { getExample } from '../controllers/exampleController';

router.get('/example', getExample);

export default router;
