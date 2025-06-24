import { useState, useEffect } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Lista from './components/List';


export default function App() {
  const [datos, setDatos] = useState(null);
  const [datosToEdit, setDatosToEdit] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('datos');
    setDatos(storedData ? JSON.parse(storedData) : [] );
  }, []);

  useEffect(() => {
    if (datos !== null) {
      localStorage.setItem('datos', JSON.stringify(datos));
    }
  }, [datos])

  const addOrUpdateDatos = (value) => {
    if (datosToEdit) {
      setDatos(datos.map(entrada => 
        entrada.id === datosToEdit.id 
        ? { ...entrada, value } : entrada

      ));
      setDatosToEdit(null);
    } else {
      const newItem = {
        id: Date.now(),
        value: {
          name: value.name,
          subject: value.subject,
          grade: value.grade
        }
      };
      setDatos([...datos, newItem]);
    }
  };


  const deleteEntrada = (id) => {
    setDatos(datos.filter(entrada => entrada.id !== id))
  };

  const editEntrada = (entrada) => { 
    setDatosToEdit(entrada)
  };

  return (
    <>
      <h1 className='main-title'>Evaluación de Alumnos</h1>

      <div className="add-exams">
          <Formulario
            addOrUpdateDatos={addOrUpdateDatos}
            datosToEdit={datosToEdit}
          />
      </div>

      <div className='show-exams'>
          { datos === null ? (<p>Cargando datos...</p>)
          : <Lista 
          datos={datos} 
          deleteEntrada={deleteEntrada}
          editEntrada={editEntrada}/>}
      </div>
    </>
  )
}
