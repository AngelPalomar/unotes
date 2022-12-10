import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';

function CreacionTareaModal(props) {
  const { open, onClose, onAddTarea } = props;
  const [nombreTarea, setNombreTarea] = React.useState("")

  return (
    <Dialog open={open} onClose={onClose} maxWidth={'sm'} fullWidth>
      <DialogTitle>Agregar Tarea</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre de la tarea"
          type="text"
          fullWidth
          variant="outlined"
          onChange={(e) =>{
            setNombreTarea(e.target.value)
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={() => {
          onAddTarea(nombreTarea);
          onClose();
        }}>
          Guardar
        </Button>
        <Button variant='contained' color='inherit' sx={{color: 'black'}} onClick={onClose}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export {
  CreacionTareaModal
}