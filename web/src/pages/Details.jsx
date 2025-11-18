import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Details() {
  const { id } = useParams();
  const [aluno, setAluno] = useState(null);

  useEffect(() => {
    api.get(`/alunos/${id}`).then((res) => setAluno(res.data));
  }, []);

  if (!aluno) return <p>Carregando...</p>;

return (
    <div className="container mt-4">
      <h2>Detalhes do Aluno</h2>
      <p><strong>Nome:</strong> {aluno.nome}</p>
      <p>
        <strong>Curso:</strong> {aluno.curso} 
      </p> 
      
      <p>
        <strong>Turma:</strong> {aluno.turma}
      </p>

      <p>
        <strong>Matricula:</strong> {aluno.matricula}
      </p>

      <Link to="/">
        <Button variant="secondary">Voltar</Button>
      </Link>
    </div>
  );
}
