export default function Entrada({ entrada, deleteEntrada, editEntrada }) {
    const nota = entrada.value.grade
    let rendimiento;
    // Función simple para definir el rendimiento
    if (nota >= 1 && nota <= 3.9) {
        rendimiento = "Deficiente"
    } else if (nota >= 4 && nota <= 5.5) {
        rendimiento = "Con mejora"
    } else if (nota >= 5.6 && nota <= 6.4) {
        rendimiento = "Buen Trabajo"
    } else if (nota >= 6.5 && nota <= 7.0) {
        rendimiento = "Destacado"
    }
    return (
        <li className="entrada-item">
            <div className="entrada-contenido">
                <p><strong>Alumno: {entrada.value.name}</strong></p>
                <p>Asignatura: {entrada.value.subject} </p>
                <p>Promedio: {entrada.value.grade}</p>
                <span className={
                    // Crea una segunda tag tomando el valor de rendimiento
                    // la vuelve minusculas y reemplaza los espacios con '-'
                    `tag tag-${rendimiento.toLowerCase().replace(" ", "-")}`
                }>
                    {rendimiento}
                </span>
            </div>
            <div className="entrada-botones">
                <button
                    className='edit-button'
                    onClick={() => (editEntrada(entrada))}
                >
                    Editar
                </button>

                <button
                    className="delete-button"
                    onClick={() => (deleteEntrada(entrada.id))}
                >
                    Eliminar
                </button>
            </div>

        </li>
    )
}