import express from 'express';
import {
  getNavigationItems,
  createNavigationItem,
  updateNavigationItem,
  deleteNavigationItem
} from './navigation.controller.js';
import { auth } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getNavigationItems);


router.use(auth);
router.post('/', createNavigationItem);
router.put('/:id', updateNavigationItem);
router.delete('/:id', deleteNavigationItem);

export default router;