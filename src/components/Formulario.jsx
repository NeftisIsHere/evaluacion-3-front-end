import { useEffect, useState } from "react";

export default function Formulario({addOrUpdateDatos, datosToEdit}){
    const [inputValue, setInputValue] = useState({
        name: '',
        subject: '',
        grade: ''
    });

    useEffect(() => {
    if (datosToEdit) {
        setInputValue(datosToEdit.value)
    } else {
        setInputValue({
        name: '',
        subject: '',
        grade: ''
        });
    }
    }, [datosToEdit]);

    const handleChange = (e) => {
        const { name, value} = e.target;
        setInputValue(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.name.trim() 
            && inputValue.subject.trim() 
            && inputValue.grade) {
            addOrUpdateDatos(inputValue);
            setInputValue({
                name: '',
                subject: '',
                grade: ''
            });
        }
    };

    
    return (
        <form onSubmit={handleSubmit}>
            <h2>{datosToEdit  
            ? 'Editar Evaluación' 
            : 'Agregar Nueva    Evaluación'}</h2>
            <div>
                <label>Nombre del Alumno:</label>
                <input 
                type="text"
                name="name"
                value={inputValue.name}
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
                min="1"
                max="7"
                step="0.1"
                required
                />
            </div>
            <button 
            type="submit"
            className="submit-button"
            >{datosToEdit 
            ? 'Actualizar Evaluación' 
            : 'Agregar Evaluación'}</button>

        </form>
        
    ) 
}