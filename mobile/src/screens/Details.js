import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { api } from "../services/api"; // Assumindo que a API service é a mesma
import { Card, Title, Paragraph, ActivityIndicator, Appbar } from 'react-native-paper';

export default function Details({ route, navigation }) {
  const { id } = route.params;
  const [aluno, setAluno] = useState(null);

  useEffect(() => {
    api.get(`/alunos/${id}`)
      .then((res) => setAluno(res.data))
      .catch((error) => console.error("Erro ao buscar detalhes:", error));
  }, [id]);

  if (!aluno) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color="#6200ee" size="large" />
        <Paragraph style={styles.loadingText}>Carregando...</Paragraph>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detalhes do Aluno" />
      </Appbar.Header>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.nameTitle}>{aluno.nome}</Title>
          
          <Paragraph style={styles.dataItem}>
            **Curso:** {aluno.curso}
          </Paragraph>
          <Paragraph style={styles.dataItem}>
            **Turma:** {aluno.turma}
          </Paragraph>
          <Paragraph style={styles.dataItem}>
            **Matrícula:** {aluno.matricula}
          </Paragraph>
          
        </Card.Content>
      </Card>
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#f5f5f5' 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#6200ee',
    },
    card: { 
        margin: 16, 
        elevation: 4,
        borderRadius: 8,
    },
    nameTitle: { 
        fontSize: 24, 
        marginBottom: 15, 
        fontWeight: 'bold', 
        color: '#333' 
    },
    dataItem: { 
        fontSize: 16, 
        marginVertical: 5, 
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5,
    },
});