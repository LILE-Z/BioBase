import React, { Suspense, useState } from 'react';
import { Text, Button } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';
import { View, StyleSheet, TextInput, ImageBackground, ToastAndroid } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
export default function App() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <SQLiteProvider
        databaseName="mydb.db"
        assetSource={{ assetId: require("../assets/mydb.db") }}
        useSuspense
      >
        <Registro />
      </SQLiteProvider>
    </Suspense>
  );
}

function Registro() {
  const db = useSQLiteContext();
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    // Validar los campos antes de enviar el formulario
    if (nombre.trim().length < 5) {
      ToastAndroid.show('El nombre debe tener al menos 5 letras', ToastAndroid.SHORT);
      return;
    }

    if (telefono.trim().length !== 10) {
      ToastAndroid.show('El número de teléfono debe tener 10 dígitos', ToastAndroid.SHORT);
      return;
    }

    if (password.trim().length < 5) {
      ToastAndroid.show('La contraseña debe tener al menos 5 caracteres', ToastAndroid.SHORT);
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show('Las contraseñas no coinciden', ToastAndroid.SHORT);
      return;
    }

    try {
      // Verificar si el número de teléfono ya existe en la base de datos
      const existingUser = await db.getAllAsync(
        'SELECT * FROM users WHERE telefono = ?',
        [telefono]
      );

      if (existingUser.length > 0) {
        ToastAndroid.show('El número de teléfono ya está registrado', ToastAndroid.SHORT);
        return;
      }

      // Insertar los datos del usuario en la base de datos
      await db.runAsync(
        'INSERT INTO users (nombre, telefono, password,sesion) VALUES (?, ?, ?, ?, ?)',
        [nombre, telefono, password, 0]
      );

      ToastAndroid.show('Registro exitoso', ToastAndroid.SHORT);

      // Obtener los datos actualizados de la base de datos
      const result = await db.getAllAsync("SELECT * FROM users");
      console.log("Datos actualizados:", result);

      setTimeout(() => {
        console.log('Registro exitoso');
        router.push('/');
      }, 1000);

      // Aquí puedes redirigir al usuario a la página de inicio de sesión o realizar otras acciones
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/originals/ba/aa/17/baaa1753d1f97e731075784d33ab3d02.jpg' }}
        style={styles.backgroundImage}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Registro</Text>
          <View style={styles.inputContainer}>
          <FontAwesome5 name="user-edit" size={20} color="black" style={styles.icon
      
          } /> 
            <TextInput
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputContainer}>
          <Entypo name="old-phone" size={24} color="black"
          style={styles.icon}
          />
            <TextInput
              placeholder="Número de teléfono"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputContainer}>
          <MaterialIcons name="password" size={24} color="black" style={styles.icon}/>
            <TextInput
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.inputText}
            />
          </View>
          <View style={styles.inputContainer}>
            
            <FontAwesome name="lock" size={20} color="#333" style={styles.icon} />
            <TextInput
              placeholder="Confirmar contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.inputText}
            />
          </View>
           <Button title="Registrarse" onPress={handleSubmit} buttonStyle={styles.button} />
          <Text style={styles.footerText}>Al registrarte, aceptas los términos y condiciones</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    color: 'black',
  },
  button: {
    backgroundColor: '#9ab2d7',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 20,
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});