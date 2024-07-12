import profileController from "../controller/profileController";
import { Router } from 'express';
import verifyToken from "../middleware/authMiddleware";

const router = Router();


router.post('/addProfile', verifyToken, profileController.profileCreate);
router.get('/showProfiles',verifyToken, profileController.showAllProfiles);
router.put('/updateProfile/:id', verifyToken, profileController.updateProfile);
router.delete('/deleteProfile/:id', verifyToken, profileController.deleteProfile);

export default router;