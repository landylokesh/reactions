import React, {useContext} from "react";
import {RootContext} from "../App";
import {getReactionDataByID} from "../utils/utils";
import {ReactionToBeAdd} from "./ReactionToBeAdd";
import {setContentReaction} from "./../actions/actions";
import {deleteAReaction} from "../actions/actions";

export const Reactions =(props)=>{
    const rootContext = useContext(RootContext);
    const {contentReactions, supportedReactions} = rootContext.rootState;
    const {currentUser} = props;

    const currentUserReaction = ()=>{
        let currentUserReaction = undefined;
        contentReactions.forEach((reaction)=>{
            if(reaction.user_id === currentUser.id){
                currentUserReaction = reaction;
            }
        });
        return currentUserReaction;
    };

    const reactionUpdateAction = (data)=>{
        const {reaction_id} = data;
        const cUserData = currentUserReaction();
        if(cUserData && cUserData.reaction_id === reaction_id){
            console.log('cUser',cUserData.reaction_id, 'reaction_id', reaction_id);
            deleteAReaction(cUserData.id).then(actionObj=>{
                rootContext.rootStateDispatch(actionObj);
            });
        }else{
            const contReactionData = {
                content_id : 1,
                reaction_id,
                user_id : currentUser.id
            };
            setContentReaction(contReactionData).then(actionObj=>{
                rootContext.rootStateDispatch(actionObj);
            });
        }
    };

    return (
        <div>
            <div className="reactionsToAddListParent">
            {props.reactions.map((value) => (
                <ReactionToBeAdd reaction={value} key={value.id} reactionUpdateAction={reactionUpdateAction}/>
            ))}
            </div>
            <div>
                {currentUserReaction() ? <span style={{margin:"8px"}} >You reacted {getReactionDataByID(currentUserReaction().reaction_id, supportedReactions).emoji}</span> : "You have not reacted."}
            </div>
        </div>
    )
};