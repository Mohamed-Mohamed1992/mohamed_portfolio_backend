import { Router } from 'express';
import { ProfileController } from '../controllers/profileController';

const router = Router();

// Full CRUD operations
router.post('/profile', ProfileController.createProfile);      // Create
router.get('/profile', ProfileController.getProfile);          // Read
router.put('/profile', ProfileController.updateProfile);       // Update (full)
router.patch('/profile', ProfileController.patchProfile);      // Update (partial)
router.delete('/profile', ProfileController.deleteProfile);    // Delete

// Additional endpoints
router.get('/profile/public', ProfileController.getPublicProfile);  // Get public data

export default router;