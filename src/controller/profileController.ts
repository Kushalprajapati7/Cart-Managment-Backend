import { Request, Response } from "express";
import CustomRequest from "../types/customRequest";
import profileServices from "../services/profileServices";

class ProfileController {
    profileCreate = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = (req as CustomRequest).userId;
            const profileData = req.body;
            profileData.userId = userId;        
            const newProfile = await profileServices.createProfile(profileData)
            res.status(201).json(newProfile);
        }
        catch (error: any) {
            res.status(500).json({ message: error.message })
        }

    }

    showAllProfiles = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = (req as CustomRequest).userId;
            const profiles = await profileServices.showAllProfiles();
            // const userProfile = profiles.filter((user: any) => user.userId == userId);
            res.status(200).json(profiles);
        }
        catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    updateProfile = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = (req as CustomRequest).userId;
            const profileId = req.params.id;
            const profileData = req.body;
            const profile = await profileServices.showProfileById(profileId);

            if (!profile) {
                res.status(404).json({ message: "Profile not found" })
            }
            const updatedProfile = await profileServices.updateProfile(profileId, profileData);
            res.status(200).json({ message: "Profile Upadted Successfully ", updatedProfile });

        } catch (error: any) {
            res.status(500).json({ message: error.message })

        }
    }

    deleteProfile = async (req: Request, res: Response): Promise<void> => {
        try {
            const profileId = req.params.id;
            const profile = await profileServices.showProfileById(profileId);

            if (!profile) {
                res.status(404).json({ message: "Profile not found" })
            }
            await profileServices.deleteProfile(profileId)
            res.status(200).json({ message: "Profile Deleted Successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message })

        }
    }

}
export default new ProfileController();