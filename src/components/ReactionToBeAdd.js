import React from "react";
import "./../styles/Reactions.css";

export const ReactionToBeAdd =(props)=>{
    const {reaction, reactionUpdateAction} = props;

    return(
        <div
            className={"reactionsToAddListItem"}
            onClick={()=>{reactionUpdateAction({reaction_id : reaction.id})}}
        >
            {reaction.emoji}
        </div>
    )
};