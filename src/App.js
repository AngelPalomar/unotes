import {
  Paper,
  ThemeProvider,
  Typography,
  Fab,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  List,
  Divider,
} from '@mui/material';
import { theme } from './styles/theme';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { TareaItem } from './components/TareaItem';
import React, { useState, useEffect } from 'react';
import { CreacionTareaModal } from './components/CreacionTareaModal';
import {
  getTareasApi,
  createTareaApi,
  updateTareaApi,
  deleteTareaApi,
} from './api/tareasApi';
import { permisoNotificacion } from './api/notificacionesApi';

const Background = styled('div')({
  height: '100vh',
  background:
    'linear-gradient(90deg, hsla(350, 100%, 69%, 1) 0%, hsla(10, 89%, 70%, 1) 100%)',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function App() {
  const [openCrearModal, setOpenCrearModal] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [tareasCompletadas, setTareasCompletadas] = useState(0);
  const [buscar, setbuscar] = useState('');

  /* Tareas desde el servidor*/
  useEffect(() => {
    reloadTareas();
  }, []);

  const reloadTareas = () => {
    getTareasApi().then((response) => {
      setTareas(response);
    });
  };

  const removeTarea = (index) => {
    let data = {
      id: index,
      act: 'del',
    };

    deleteTareaApi(data).then((response) => {
      reloadTareas();
    });
  };

  const taskComplete = (index) => {
    let data = {
      id: index,
      act: 'upd',
    };
    updateTareaApi(index, data).then((response) => {
      //setTareas(response.tareas);
      /** Activar envio de notificaciones y actualizar build 
      reloadTareas();
      permisoNotificacion(tareas.length, tareasCompletadas);
       */
      reloadTareas();
      permisoNotificacion(tareas.length, tareasCompletadas);
    });
  };

  const addTarea = (nombreTarea = '') => {
    if (nombreTarea.length === 0) return;
    let data = {
      nombreTarea: nombreTarea,
      act: 'add',
    };
    createTareaApi(data).then((response) => {
      reloadTareas();
    });
  };

  useEffect(() => {
    if (tareas.length > 0) {
      let tc = 0;
      tareas.forEach((element) => {
        if (element.completada) {
          tc += 1;
        }
      });

      setTareasCompletadas(tc);

      //localStorage.setItem('tareas', JSON.stringify(tareas));
    } else {
      setTareasCompletadas(0);
      /*
      if (JSON.parse(localStorage.getItem('tareas'))) {
        setTareas(JSON.parse(localStorage.getItem('tareas')));
      }
      */
    }
  }, [tareas]);

  return (
    <ThemeProvider theme={theme}>
      <CreacionTareaModal
        open={openCrearModal}
        onClose={() => setOpenCrearModal(false)}
        onAddTarea={addTarea}
      />
      <Background>
        <Fab
          onClick={() => setOpenCrearModal(true)}
          variant='extended'
          sx={{ position: 'absolute', bottom: 0, right: 0, m: 4 }}
        >
          <AddIcon sx={{ mr: 1 }} />
          <Typography>Crear tarea</Typography>
        </Fab>
        <Paper sx={{ minWidth: '40vw', minHeight: '70%', p: 2 }} elevation={6}>
          <Typography variant='h3' gutterBottom>
            UNotes
          </Typography>
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Typography variant='h6'>Mis tareas</Typography>
              <Typography color={'GrayText'}>
                Has completado {tareasCompletadas} de {tareas.length} tareas
              </Typography>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='buscar_input'>Buscar</InputLabel>
                <OutlinedInput
                  fullWidth
                  id='buscar_input'
                  label='Buscar'
                  placeholder='Tarea'
                  onChange={(e) => setbuscar(e.target.value)}
                  startAdornment={
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <List
            sx={{
              height: '40vh',
              overflow: 'auto',
              '::-webkit-scrollbar': {
                width: '8px',
              },
              '::-webkit-scrollbar-thumb': {
                background: '#5F5F5F',
                borderRadius: '10px',
              },
            }}
          >
            {tareas.length === 0 ? (
              <Typography>No hay tareas</Typography>
            ) : (
              <React.Fragment>
                {buscar.length === 0 ? (
                  <React.Fragment>
                    {tareas.map((tarea, index) => (
                      <React.Fragment key={index}>
                        <TareaItem
                          nombreTarea={tarea.nombreTarea}
                          clave={index}
                          removeTarea={removeTarea}
                          taskComplete={taskComplete}
                          completada={tarea.completada}
                        />
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {tareas.map((tarea, index) => {
                      if (
                        tarea.nombreTarea
                          .toLowerCase()
                          .includes(buscar.toLowerCase())
                      ) {
                        return (
                          <React.Fragment key={index}>
                            <TareaItem
                              nombreTarea={tarea.nombreTarea}
                              clave={index}
                              removeTarea={removeTarea}
                              taskComplete={taskComplete}
                              completada={tarea.completada}
                            />
                          </React.Fragment>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </List>
        </Paper>
      </Background>
    </ThemeProvider>
  );
}

export default App;
