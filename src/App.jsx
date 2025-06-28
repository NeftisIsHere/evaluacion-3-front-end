import { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Lista from './components/List';


export default function App() {
  const [datos, setDatos] = useState(null);
  const [datosToEdit, setDatosToEdit] = useState(null);

  useEffect(() => {
    // Esta función usa localStorage para recuperar los datos almacenados en el localStorage del navegador
    const storedData = localStorage.getItem('datos');
    // En caso de no haber datos almacenados, crea un array vacío
    setDatos(storedData ? JSON.parse(storedData) : []);
  }, []); // Esto garantiza que sea solo durante el cargado inicial

  useEffect(() => {
    // Esta función almacena los datos en localStorage como un JSON, creando persistencia
    // en caso que los datos sean nulos, no hace nada.
    if (datos !== null) {
      localStorage.setItem('datos', JSON.stringify(datos));
    }
  }, [datos]) // Se ejecute cada vez que cambia 'datos'

  const addOrUpdateDatos = (value) => {
    if (datosToEdit) { // IF: Modo edición
      // Si se encuentran datos que editar, utiliza setDatos para actualizar entrada.
      setDatos(datos.map(entrada =>
        entrada.id === datosToEdit.id
          // Si la ID coincide, crea una copia del array con el valor actualizado
          ? { ...entrada, value }
          // de lo contrario, no hace cambios.
          : entrada
      ));
      // Limpia los datos al finalizar.
      setDatosToEdit(null);
    } else { // ELSE: Modo nueva entrada
      // Si no se encuentran datos que editar, crea un nuevo item para agregar.
      const newItem = {
        id: Date.now(), // Crea un ID único.
        value: { // Valores del formulario.
          name: value.name,
          subject: value.subject,
          grade: value.grade
        }
      };
      // Agrega el item al array.
      setDatos([...datos, newItem]);
    }
  };


  const deleteEntrada = (id) => {
    // Filtra afuera la entrada con la id proporcionada y se actualizan los datos.
    setDatos(datos.filter(entrada => entrada.id !== id))
  };

  const editEntrada = (entrada) => {
    // Activa el modo edición con la entrada seleccionada.
    setDatosToEdit(entrada)
  };

  return (
    <>
      <div className='container'>
        <h1 className='main-title'>Evaluación de Alumnos</h1>

        <div className="form-section">
          <Formulario addOrUpdateDatos={addOrUpdateDatos} datosToEdit={datosToEdit} />
        </div>

        <div className='list-section'>
          <h2>Evaluaciones Guardadas</h2>
          {datos === null
            // En caso de que datos sea null, en vez de mostrar una lista, muestra un alt.
            ? (<p>Cargando datos...</p>)
            // Cuando datos no es null, muestra una lista con los datos proporcionados.
            : <Lista datos={datos} deleteEntrada={deleteEntrada} editEntrada={editEntrada} />}
        </div>

      </div>
    </>
  )
}
