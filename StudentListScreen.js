import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const primaryColor = '#007bff'; // Azul
const secondaryColor = '#fff'; // Branco
const redColor = '#ff0062'; // Vermelho para médias inferiores a 7
const greenColor = '#27ff39'; // Verde para médias maiores que 7

const StudentListScreen = ({ route }) => {
  const { student } = route.params;
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obter os dados salvos no AsyncStorage
        const storedData = await AsyncStorage.getItem('studentData');
        if (storedData !== null) {
          // Converter os dados de volta para o formato de array de objetos
          const parsedData = JSON.parse(storedData);
          // Atualizar o estado local com os dados recuperados
          setStudentData(parsedData);
        }
      } catch (error) {
        console.error('Erro ao recuperar os dados:', error);
      }
    };
  
    // Chamar a função para buscar os dados ao carregar a tela
    fetchData();
  }, []);

  // Função para obter a cor da média com base no valor
  const getMediaColor = (media) => {
    if (media < 7) {
      return redColor;
    } else if (media > 7) {
      return greenColor;
    } else {
      return secondaryColor;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: primaryColor }}>
      <ScrollView>
        {/* Cabeçalho da tabela */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, borderBottomWidth: 1, borderColor: secondaryColor }}>
          <Text style={{ color: secondaryColor, width: 50, textAlign: 'center', borderRightWidth: 1, borderColor: secondaryColor, fontWeight: 'bold' }}>ID</Text>
          <Text style={{ color: secondaryColor, flex: 1, textAlign: 'center', borderRightWidth: 1, borderColor: secondaryColor, fontWeight: 'bold' }}>Nome</Text>
          <Text style={{ color: secondaryColor, width: 100, textAlign: 'center', borderRightWidth: 1, borderColor: secondaryColor, fontWeight: 'bold' }}>Matrícula</Text>
          <Text style={{ color: secondaryColor, width: 100, textAlign: 'center', fontWeight: 'bold' }}>Média</Text>
        </View>
        {/* Linha de dados */}
        {studentData.map((student, index) => (
          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, borderBottomWidth: 1, borderColor: secondaryColor }}>
            <Text style={{ color: secondaryColor, width: 50, textAlign: 'center', borderRightWidth: 1, borderColor: secondaryColor }}>{index + 1}</Text>
            <Text style={{ color: secondaryColor, flex: 1, textAlign: 'center', borderRightWidth: 1, borderColor: secondaryColor }}>{student.nome}</Text>
            <Text style={{ color: secondaryColor, width: 100, textAlign: 'center', borderRightWidth: 1, borderColor: secondaryColor }}>{student.matricula}</Text>
            <Text style={{ color: getMediaColor(student.media), width: 100, textAlign: 'center' }}>{student.media}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default StudentListScreen;