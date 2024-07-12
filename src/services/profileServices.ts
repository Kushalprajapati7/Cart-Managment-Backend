import Profile from "../models/profileModel";
import { IProfile } from "../interfaces/profileInterface";


class ProfileService {
    createProfile = async(profile :IProfile):Promise<IProfile> =>{
        const newProfile = new Profile(profile);
        return await newProfile.save();
    }

    showAllProfiles = async():Promise<IProfile[]>=>{
        const profiles = await Profile.find().populate('userId', 'username');
        return profiles;
    }

    deleteProfile = async(profileid:string):Promise<void> =>{
         await Profile.findByIdAndDelete(profileid)
    }

    updateProfile = async(profileId:string,profile:IProfile):Promise<IProfile|null> =>{
        const updatedProfile= await Profile.findByIdAndUpdate(profileId,profile,{new:true})
        return updatedProfile;
    }

    showProfileById = async(profileId:string):Promise<IProfile|null>=>{
        const profile = await Profile.findById(profileId);
        return profile;
    }

    findProfileByEmail = async(email:string):Promise<IProfile|null> =>{
        const profile = await Profile.findOne({email});
        return profile;
    }

}

export default new ProfileService();
