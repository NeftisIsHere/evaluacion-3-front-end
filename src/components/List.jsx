import Entrada from "./Entrada";

export default function Lista({ datos, deleteEntrada, editEntrada }) {
    return (
        <ul className="lista-ul">
            {datos.map((entrada) => (
                <Entrada
                    key={entrada.id}
                    entrada={entrada}
                    deleteEntrada={deleteEntrada}
                    editEntrada={editEntrada}
                />
            ))}
        </ul>
    )
}