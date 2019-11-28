import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function Nav({categories, onClick}){
    const to = users => `/user/${users.id}`;
    return(
        <Drawer variant = "permanent">
            <List style = {{ width:200 }}>
            {categories.map(user => (
                <ListItem
                    button
                    key = {`nav-item-${user.id}`}
                    onClick = {() => onClick(to(user))}>
                    <ListItemText primary = {user.name} />
                </ListItem>
            ))}
            </List>
        </Drawer>
    );
}

Nav.propsType = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired
    )
};