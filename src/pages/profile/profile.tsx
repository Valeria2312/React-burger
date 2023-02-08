import React, {useEffect} from 'react';
import StyleProfile from "./profile.module.css"
import {useHistory} from "react-router-dom";
import {useAppSelector} from "../../types/typesDataProduct";
import {UserProfile} from "./user-profile/user-profile";
import {ProfileNav} from "../../components/ProfileNav/ProfileNav";

export const Profile = () => {
    const history = useHistory();
    const {user} = useAppSelector(store => store.RegisterUser);

    useEffect(() => {
    if (!user) {
        history.replace({pathname: '/login'});
    }},[])

    return (
        <div className={`${StyleProfile.main}`}>
            <ProfileNav/>
            <UserProfile/>
        </div>

    )
}