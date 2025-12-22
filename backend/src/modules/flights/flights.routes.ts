import { Router } from 'express';
import { searchFlightsController } from './flights.controller';

const router = Router();

router.post('/search', searchFlightsController);

export default router;
