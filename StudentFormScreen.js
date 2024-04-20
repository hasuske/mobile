import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo as cores da paleta
const primaryColor = '#007bff'; // Azul
const textColor = '#fff'; // Cor do texto
const buttonColor = '#ff9800'; // Laranja para o botão

const StudentFormScreen = ({ navigation }) => {
    const [matricula, setMatricula] = useState('');
    const [nome, setNome] = useState('');
    const [media, setMedia] = useState('');
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
  
    const handlePress = async () => {
      // Verifica se todos os campos obrigatórios foram preenchidos
      if (!matricula.trim() || !nome.trim() || !media.trim()) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
      }
    
      // Verifica se a média é um número válido
      const mediaNumber = parseFloat(media);
      if (isNaN(mediaNumber) || mediaNumber < 0 || mediaNumber > 10) {
        Alert.alert('Erro', 'Por favor, insira uma média válida (entre 0 e 10).');
        return;
      }
    
      try {
        // Cria um objeto representando o novo aluno
        const newStudent = { matricula, nome, media: mediaNumber };
        // Adiciona o novo aluno aos dados existentes
        const newData = [...studentData, newStudent];
        // Salva os dados atualizados no AsyncStorage
        await AsyncStorage.setItem('studentData', JSON.stringify(newData));
        // Atualiza o estado local com os dados atualizados
        setStudentData(newData);
        // Limpa os campos após o envio
        setMatricula('');
        setNome('');
        setMedia('');
        // Navega para a tela de lista de alunos
        navigation.navigate('Lista de Alunos', { student: newStudent });
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
      }
    };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: primaryColor }}>
      <Text style={{ color: textColor, marginBottom: 20 }}>Matrícula:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 200, backgroundColor: '#fff' }}
        onChangeText={text => setMatricula(text)}
        value={matricula}
      />
      <Text style={{ color: textColor, marginBottom: 20 }}>Nome:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 200, backgroundColor: '#fff' }}
        onChangeText={text => setNome(text)}
        value={nome}
      />
      <Text style={{ color: textColor, marginBottom: 20 }}>Média:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 200, backgroundColor: '#fff' }}
        onChangeText={text => setMedia(text)}
        value={media}
        keyboardType="numeric"
      />
      <Button title="Enviar" onPress={handlePress} color={buttonColor} />
    </View>
  );
};

export default StudentFormScreen;
