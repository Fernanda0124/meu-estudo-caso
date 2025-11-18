import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Card, Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
// Ícone (simulado, precisaria de uma lib como react-icons)
const UserIcon = () => <i className="bi bi-person-circle me-2"></i>; 

export default function Home() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/alunos")
      .then((res) => {
        setAlunos(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 text-primary">📚 Painel de Alunos</h2>
      
      {loading ? (
        <p className="text-center">Carregando dados...</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4"> 
          {/* O g-4 cria espaçamento entre as colunas */}
          {alunos.map((a) => (
            <Col key={a.id}>
              <Card className="shadow-sm h-100 border-0">
                <Card.Header className="bg-primary text-white">
                  <UserIcon /> {a.nome}
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>ID: **{a.id}**</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Link to={`/detalhes/${a.id}`} className="w-100">
                    <Button variant="outline-primary" size="sm">
                      Ver Perfil Completo
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}