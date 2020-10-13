import React from "react";

export const User = (props)=>{
    const userData = props.userData;
    const name = ()=> {return `${userData.first_name} ${userData.last_name} !`};

    return (
        <div>
            Welcome, {userData ? name() : ""}
        </div>
    )
};