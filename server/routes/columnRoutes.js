import express from 'express';
import { protectedRoute } from '../controllers/authController.js';
import * as columnController from '../controllers/columnController.js';
const router = express.Router();

router.use(protectedRoute); 

router.route('/').get(columnController.getAllColumns)
    .post(columnController.createColumn)

router.route('/:id')
    .get(columnController.getColumn)
    .patch(columnController.updateColumn)
    .delete(columnController.deleteColumn)

router
export default router;