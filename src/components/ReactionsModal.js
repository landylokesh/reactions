import React, {useContext, useEffect, useRef} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {ReactionsModalTabPanel} from "./ReactionsModalTabPanel";
import {RootContext} from "../App";
import {
    getContentsReactionsByReactionID,
    getReactedReactionsFromContentReactions,
    getReactionDataByID
} from "../utils/utils";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const ReactionsModal = ()=>{

    const classes = useStyles();
    const getModalStyle = ()=> {
        const top = (window.innerHeight/2) - (modalElement.current ? modalElement.current.offsetHeight/2 : 0);
        const left = (window.innerWidth/2) -  ( modalElement.current ? modalElement.current.offsetWidth/2 : 0);

        return {
            top: `${top}px`,
            left: `${left}px`,
        };
    };

    const modalElement = useRef(null);
    const [tabValue, setTabValue] = React.useState(0);
    const [modalStyle, setModalStyle] = React.useState(getModalStyle());
    const rootContext = useContext(RootContext);
    const {contentReactions, supportedReactions, users} = rootContext.rootState;

    const handleChange = (event, newTabValue)=>{
        setTabValue(newTabValue);
    };

    const reactionsTabs = ()=>{
        return getReactedReactionsFromContentReactions(contentReactions).map((reaction, index) => {
            return (
                <Tab key={reaction.reaction_id}
                     label={getReactionDataByID(reaction.reaction_id, supportedReactions).emoji}
                     {...a11yProps(index)}
                />
            )
        });
    };

    useEffect(()=>{
        setModalStyle(getModalStyle());
    }, [modalElement]);

    const reactionsTabPanels = ()=>{
        return getReactedReactionsFromContentReactions(contentReactions).map((reaction, index)=>{
            return (
                <ReactionsModalTabPanel
                    value={tabValue}
                    index={index}
                    key={index}
                    userReactionsData={getContentsReactionsByReactionID(reaction.reaction_id, contentReactions)}
                    users = {users}
                >
                </ReactionsModalTabPanel>
            )
        })
    };


    return(
        <div style={modalStyle} className={classes.paper} ref={modalElement}>
            <Tabs
                value={tabValue}
                onChange={handleChange}
                aria-label="simple tabs example"
            >
                {reactionsTabs()}

            </Tabs>
            {reactionsTabPanels()}
        </div>
    );
};