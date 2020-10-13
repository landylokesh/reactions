import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {getUserDataByID} from "../utils/utils";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

export const ReactionsModalTabPanel = (props) =>{
    const { value, index, userReactionsData, users, ...other } = props;
    const classes = useStyles();

    const usersList = (userReaction)=>{
        const userData = getUserDataByID(userReaction.user_id, users);
        const userName = ()=>{
            return `${userData.first_name} ${userData.last_name}`;
        };
        return(
            <ListItem alignItems="flex-start" key={userReaction.id}>
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={userData.avatar} />
                </ListItemAvatar>
                <ListItemText
                    primary={userName()}/>
            </ListItem>
        )
    };

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <List className={classes.root}>
                    {userReactionsData.map((userReaction)=>{
                        return usersList(userReaction)
                    })}
                </List>
            )}
        </div>
    );
};