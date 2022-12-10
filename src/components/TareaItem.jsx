import { IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';

function TareaItem(props) {
    return (
        <ListItem
            secondaryAction={
                <React.Fragment>
                    <IconButton
                        sx={{ marginRight: 4 }}
                        edge="end"
                        aria-label="complete"
                        disabled={props.completada ? true : false}
                        onClick={() => {
                            props.taskComplete(props.clave)
                        }}
                    >
                        <CheckIcon />
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                            props.removeTarea(props.clave)
                        }}>
                        <DeleteIcon />
                    </IconButton>
                </React.Fragment>
            }
        >
            <ListItemText
                primary={props.nombreTarea}
                secondary={props.completada ? "Completada" : null}
                secondaryTypographyProps={{ color: 'secondary' }}
            />
        </ListItem>
    )
}

export {
    TareaItem
}