import React, {useState} from "react";
import "./../styles/Reactions.css";

export const ReactionToBeAdd =(props)=>{
    const [hover, setHover] = useState(false);
    const {reaction, reactionUpdateAction, currentData} = props;

    const handleReaction = ()=>{
        if(currentData && currentData.reaction_id === reaction.id){
            reactionUpdateAction({id : currentData.id}, "DELETE");
        }else{
            reactionUpdateAction({reaction_id : reaction.id}, "ADD");
        }
    };

    const isReactedOne = ()=>{
        return (currentData && currentData.reaction_id === reaction.id);
    };
    return(
        <div
            className={hover || isReactedOne()? "reactionsToAddListItem reactionsToAddListItemHover" : "reactionsToAddListItem"}
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
            onClick={()=>{handleReaction()}}
        >
            {reaction.emoji}
        </div>
    )
};