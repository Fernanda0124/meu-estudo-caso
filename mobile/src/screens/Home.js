import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { api } from "../services/api";
import { Appbar, List, ActivityIndicator, Divider } from 'react-native-paper'; // Importações do Paper

export default function Home({ navigation }) {
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
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Alunos Cadastrados" subtitle="Lista Completa" />
      </Appbar.Header>

      {loading ? (
        <ActivityIndicator animating={true} style={styles.loading} color="#6200ee" />
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {alunos.map((a, index) => (
            <React.Fragment key={a.id}>
                <List.Item
                  title={a.nome}
                  description={`ID: ${a.id}`}
                  left={props => <List.Icon {...props} icon="account-circle" />}
                  onPress={() => navigation.navigate("Details", { id: a.id })}
                  right={props => <List.Icon {...props} icon="chevron-right" />}
                />
                <Divider />
            </React.Fragment>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    loading: { marginVertical: 40 },
    listContainer: { paddingBottom: 20 },
});