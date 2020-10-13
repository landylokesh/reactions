import React, {useContext} from "react";
import {RootContext} from "../App";
import {getReactedReactionsFromContentReactions, getReactionDataByID} from "../utils/utils";
import {ReactionsModal} from "./ReactionsModal";
import Modal from "@material-ui/core/Modal";

export const ReactionsResult = ()=>{

    const rootContext = useContext(RootContext);
    const {contentReactions, supportedReactions} = rootContext.rootState;
    const [modalState, setModalState] = React.useState(false);

    const openReactionsPopup = ()=>{
        setModalState(true);
    };

    const onModalClose = ()=>{
        setModalState(false);
    };

    return (
        <div onClick={openReactionsPopup}>
            {getReactedReactionsFromContentReactions(contentReactions).map((reaction) => (
                <span style={{margin:"-2px"}} key={reaction.reaction_id} >{getReactionDataByID(reaction.reaction_id, supportedReactions).emoji}</span>
            ))}
            {contentReactions.length} People Liked
            <Modal
                open={modalState}
                onClose={onModalClose}
            >
                <div>
                    <ReactionsModal />
                </div>
            </Modal>
        </div>
    );
};