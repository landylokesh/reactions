import {rootReducerConstants} from "../constants/rootReducerConstants";

export const rootReducer = (state, action) => {
    switch (action.type){
        case rootReducerConstants.SET_INITIAL_STATE:
            return {
                ...state,
                contentReactions : action.data.contentReactions,
                supportedReactions : action.data.supportedReactions,
                users : action.data.users
            };
        case rootReducerConstants.SET_CONTENT_REACTIONS:
            const reactionData = state.contentReactions.find(cReaction=>(cReaction.user_id === action.data.contentReaction.user_id));
            console.log(reactionData);
            console.log(state, action.data);
            if(reactionData){
                return {
                    ...state,
                    contentReactions: state.contentReactions.map(cReaction =>{
                        if(cReaction.user_id === reactionData.user_id && cReaction.content_id === reactionData.content_id){
                            console.log('Yup, its changing');
                            cReaction.reaction_id = action.data.contentReaction.reaction_id;
                        }
                        return cReaction;
                    })
                }
            }else {
                return {
                    ...state,
                    contentReactions: [...state.contentReactions, action.data.contentReaction]
                };
            }
        case rootReducerConstants.DELETE_REACTION:
            return {
                ...state,
                contentReactions:  state.contentReactions.filter(cReaction => cReaction.id!== action.data.id)
            };
        default :
            return state;
    }
};


