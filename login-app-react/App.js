import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Declare aqui fora, para ser visível em todo o código:
const API_URL = 'https://86c4-168-0-100-253.ngrok-free.app';

function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1551218808-94e220e084d2' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bem-vindo ao App de Receitas</Text>
      </View>
    </ImageBackground>
  );
}

function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    const loginPayload = {
      Email: usuario, // Se o backend aceitar nome de usuário, troque para "nome: usuario"
      Senha: senha,
    };
    console.log('JSON enviado para login:', loginPayload); 

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload),
      });

      if (response.ok) {
    const data = await response.json();
    console.log('Resposta do backend:', data);
    Alert.alert('Sucesso', 'Login realizado com sucesso!');
    // navigation.replace('Home');
} else {
    const erro = await response.text();
    Alert.alert('Erro', erro || 'Usuário ou senha inválidos');
}
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            placeholderTextColor="#ccc"
            value={usuario}
            onChangeText={setUsuario}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#ccc"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome,
          email: email,
          senha: senha,
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Usuário cadastrado!');
        navigation.replace('Login');
      } else {
        const erro = await response.text();
        Alert.alert('Erro', erro || 'Erro ao cadastrar');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://imgs.search.brave.com/RUTbBOrE_GNYcG5IB4DFa0a3N9fyHhLBRSADSu2I-jo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ0/MzI3NjA2OS9wdC9m/b3RvL2JyYXppbGlh/bi1mb29kLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz15eGhD/emd0QnNXOFIxdzJ0/UGtUQVBDTVZwa0hT/OUp6Q1hhdUpLeDI0/OU5zPQ' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Criar Conta</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#ccc"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#ccc"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            placeholderTextColor="#ccc"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 15 }}>
          <Text style={{ color: '#FF914D', fontWeight: 'bold', textDecorationLine: 'underline' }}>
            Já tem uma conta? Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    outline: 0,
  },
  button: {
    backgroundColor: '#FF914D',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    marginTop: 15,
    color: '#FF914D',
    textDecorationLine: 'underline',
  },
});