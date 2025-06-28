import { useEffect, useState } from "react";

export default function Formulario({ addOrUpdateDatos, datosToEdit }) {
    const [inputValue, setInputValue] = useState({
        name: '',
        subject: '',
        grade: ''
    });

    useEffect(() => {
        // Función para sincronizar formulario con los datos a editar.
        setInputValue(
            // Se usa una función terciaria para reemplazar el previo if/else.
            datosToEdit
                // Si existen datos que editar, se usa el 'value' de estos.
                ? datosToEdit.value
                // De lo contrario, se agregan espacio vacios.
                : {
                    name: '',
                    subject: '',
                    grade: '',
                }
        );
    }, [datosToEdit]); // Se ejecuta cada vez que se modifique 'datosToEdit'.

    const handleChange = (e) => {
        // Separa el nombre y el valor del evento
        const { name, value } = e.target;

        setInputValue(prev => ({
            // Copia todos los valores anteriores.
            ...prev,
            // Actualiza solo el valor modificado, usando 'name' como la clave.
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        // Previene que se recargue la pagina
        e.preventDefault();
        // Valida que todos los campos existan y sean válidos:
        // name y subject no pueden estar en blanco y grade debe existir.
        if (inputValue.name.trim() && inputValue.subject.trim() && inputValue.grade) {
            // Ejecuta la funcion para agregar datos con los valores actuales.
            addOrUpdateDatos(inputValue);
            // Resetea los valores.
            setInputValue({
                name: '',
                subject: '',
                grade: ''
            });
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>
                {datosToEdit
                    ? 'Editar Evaluación'
                    : 'Agregar Nueva    Evaluación'}
            </h2>

            <div>
                <label>Nombre del Alumno:</label>
                <input
                    type="text"
                    name="name"
                    value={inputValue.name}
                    // Cambia el mensaje de entrada inválida.
                    onInvalid={(e) => {
                        e.target.setCustomValidity("Campo obligatorio: Nombre del alumno");
                    }}
                    // Quita el mensaje de entrada inválida una vez se comienza a escribir.
                    onInput={(e) => e.target.setCustomValidity('')}
                    placeholder="Ej: Jazmin Vallejos"
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Asignatura:</label>
                <input
                    type="text"
                    name="subject"
                    value={inputValue.subject}
                    placeholder="Ej: Introducción a la Programación"
                    // Cambia el mensaje de entrada inválida.
                    onInvalid={(e) => {
                        e.target.setCustomValidity("Campo obligatorio: Asignatura");
                    }}
                    // Quita el mensaje de entrada inválida una vez se comienza a escribir.
                    onInput={(e) => e.target.setCustomValidity('')}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Promedio(1.0 - 7.0)</label>
                <input
                    type="number"
                    name="grade"
                    value={inputValue.grade}
                    placeholder="Ej: 6.5"
                    onChange={handleChange}
                    // Cambia el mensaje de entrada inválida.
                    onInvalid={(e) => {
                        e.target.setCustomValidity("Ingrese un valor numérico válido");
                    }}
                    // Quita el mensaje de entrada inválida una vez se comienza a escribir.
                    onInput={(e) => e.target.setCustomValidity('')}
                    min="1"
                    max="7"
                    step="0.1"
                    required
                />
            </div>

            <button type="submit" className="submit-button">
                {datosToEdit
                    ? 'Actualizar Evaluación'
                    : 'Agregar Evaluación'}
            </button>
        </form>
    )
}