import axios from "axios";
import {rootReducerConstants} from "../constants/rootReducerConstants";

const setContentReactionAction =(contentReaction) => ({
    type : rootReducerConstants.SET_CONTENT_REACTIONS,
    data : {contentReaction}
});

const deleteReactionDataAction = (id)=>({
    type : rootReducerConstants.DELETE_REACTION,
    data : {id}
});

const setInitialAction = (contentReactions, users, supportedReactions)=>({
    type : rootReducerConstants.SET_INITIAL_STATE,
    data : {
        contentReactions, users, supportedReactions
    }
});


export const setInitial = ()=>{
    return new Promise(resolve => {
        //for now handling for a single content.
        const getContentReactions = axios.get("https://artful-iudex.herokuapp.com/user_content_reactions?content_id=1");
        const getUsers = axios.get("https://artful-iudex.herokuapp.com/users");
        const getReactions = axios.get("https://artful-iudex.herokuapp.com/reactions");
        axios.all([getContentReactions, getUsers, getReactions]).then(axios.spread((contentReactions, users, reactions)=>{
            resolve(setInitialAction(contentReactions.data, users.data, reactions.data));
        }));
    });
};

export const setContentReaction = (data)=>{
    return new Promise(resolve => {
        axios.post("https://artful-iudex.herokuapp.com/user_content_reactions", {
            "content_id": data.content_id ,
            "reaction_id": data.reaction_id ,
            "user_id": data.user_id
        }).then(resp=>{
            resolve(setContentReactionAction(resp.data));
        });
    });
};

export const deleteAReaction = (id)=>{
    return new Promise(resolve => {
        axios.delete(`https://artful-iudex.herokuapp.com/user_content_reactions/${id}`).then(()=>{
            resolve(deleteReactionDataAction(id))
        })
    })
};