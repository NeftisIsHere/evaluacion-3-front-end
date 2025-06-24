export default function Entrada( { entrada, deleteEntrada, editEntrada} ) {
    const nota = entrada.value.grade
    let rendimiento;
    
    if (nota >= 1 && nota <= 3.9) {
        rendimiento = "Deficiente."
    } else if (nota >= 4 && nota <= 5.5) {
        rendimiento = "Con mejora."
    } else if (nota >= 5.6 && nota <= 6.4) {
        rendimiento = "Buen Trabajo."
    } else if (nota >= 6.5 && nota <= 7.0) {
        rendimiento = "Destacado."
    }
    return (
        <li>
            <div>
                <strong>Alumno: {entrada.value.name}</strong> | 
                Asignatura: {entrada.value.subject} | 
                Promedio: {entrada.value.grade} | 
                {rendimiento}
            </div>
            <div>
                <button className='edit-button'onClick={()=> (editEntrada(entrada))}> Editar</button>
                <button className="delete-button" onClick={()=> (deleteEntrada(entrada.id))}> Eliminar</button>
            </div>
            
        </li>
    )
}