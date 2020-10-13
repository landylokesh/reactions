import React, {useContext, useState} from "react";
import {RootContext} from "../App";
import {Reactions} from "./Reactions";
import {User} from "./User";
import {ReactionsResult} from "./ReactionsResult";

const getCurrentUser = (userDetails)=>{
    const randomUserIndex = Math.floor(Math.random() * Math.floor(userDetails.length));
    return userDetails[randomUserIndex];
};

export const Content = ()=>{
    const rootContext = useContext(RootContext);
    const userDetails = rootContext.rootState.users;
    //Just to know which user is updating.
    const [currentUser] = useState(getCurrentUser(userDetails));



    return(
        <div>
            <User userData={currentUser}/>
            <br></br>
            <ReactionsResult />
            <br></br>
            <Reactions currentUser={currentUser} reactions={rootContext.rootState.supportedReactions}/>
        </div>
    )
};