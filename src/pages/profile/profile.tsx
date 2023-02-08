import React, {useEffect} from 'react';
import StyleProfile from "./profile.module.css"
import {UserProfile} from "./user-profile/user-profile";
import {ProfileNav} from "../../components/ProfileNav/ProfileNav";

export const Profile = () => {

    return (
        <div className={`${StyleProfile.main}`}>
            <ProfileNav/>
            <UserProfile/>
        </div>

    )
}