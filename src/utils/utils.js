export const getReactionDataByID = (reaction_id, supportedReactions)=>{
    let reactionData = {};
    supportedReactions.forEach((reaction)=>{
        if(reaction.id === reaction_id){
            reactionData = reaction;
        }
    });
    return reactionData;
};

export const getReactedReactionsFromContentReactions = (contentReactions) =>{
    const reactedReactionsIds = [];
    const reactedReactionsData = [];
    contentReactions.forEach((reaction)=>{
        if(reactedReactionsIds.indexOf(reaction.reaction_id) < 0){
            reactedReactionsIds.push(reaction.reaction_id);
            reactedReactionsData.push(reaction);
        }
    });
    return reactedReactionsData ;
};

export const getContentsReactionsByReactionID = (reactionID, contentReactions)=>{
    const reactionsArr = [];
    contentReactions.forEach((reaction)=>{
        if(reaction.reaction_id === reactionID){
            reactionsArr.push(reaction);
        }
    });
    return reactionsArr;
};

export const getUserDataByID = (userID, users)=>{
    let userData = {};
    users.forEach((user)=>{
        if(user.id === userID){
            userData = user;
        }
    });
    return userData;
};