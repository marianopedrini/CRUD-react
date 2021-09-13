import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import db from './firebase';

function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [editmode, setEditMode] = useState(false);
  const [id, setId] = useState('');

  // Obtener datos de la db
  useEffect(() => {
    const obtenerDatos = async () => {
      const data = await getDocs(collection(db, 'taskList'));
      const arrayData = data.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setTaskList(arrayData);
    };

    obtenerDatos();
  }, []);

  const agregar = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      console.log('Esta vacío');
      return;
    }

    try {
      const nuevaTarea = {
        task: task,
        fecha: Date.now(),
      };

      const data = await addDoc(collection(db, 'tasks'), nuevaTarea);
      setTaskList([
        ...taskList,
        {
          id: data.id,
          ...nuevaTarea,
        },
      ]);
      setTask('');
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id) => {
    try {
      await deleteDoc(doc(db, 'taks', id));
      const arrayFiltrado = taskList.filter((item) => {
        return item.id !== id;
      });
      setTaskList(arrayFiltrado);
    } catch (error) {
      console.log(error);
    }
  };

  const activarEdicion = (item) => {
    setEditMode(true);
    setTask(item.task);
    setId(item.id);
  };

  const editar = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      console.log('Sin datos');
      return;
    }
    try {
      await updateDoc(doc(db, 'tasks', id), {
        task: task,
      });
      const arrayEditado = taskList.map((item) => {
        return item.id === id
          ? { id: item.id, fecha: item.fecha, task: task }
          : item;
      });
      setTaskList(arrayEditado);
      setEditMode(false);
      setTask('');
      setId('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center mt-3">CRUD PRINCIPAL</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {taskList.map((item) => {
              return (
                <li key={item.id} className="list-group-item">
                  <span className="lead">{item.task}</span>
                  <button
                    className="btn btn-danger btn-small float-end mx-2"
                    onClick={() => eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-small float-end"
                    onClick={() => activarEdicion(item)}
                  >
                    Editar
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">{editmode ? 'Editar' : 'Agregar'}</h4>
          <form onSubmit={editmode ? editar : agregar} className="d-grid gap2">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Escribe la tarea"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            <button className={editmode ? 'btn btn-warning' : 'btn btn-dark'}>
              {editmode ? 'Editar' : 'Agregar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
