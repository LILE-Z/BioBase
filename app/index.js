import React, { Suspense, useState, useEffect } from "react";
import { Text, StyleSheet, View, ImageBackground, Image, ToastAndroid, TextInput } from "react-native";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/base";
import { Link, useRouter, useFocusEffect } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
export default function App() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <SQLiteProvider
        databaseName="mydb.db"
        assetSource={{ assetId: require("../assets/mydb.db") }}
        useSuspense
      >
        <LoginScreen />
      </SQLiteProvider>
    </Suspense>
  );
}

function LoginScreen() {
  const db = useSQLiteContext();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const result = await db.getAllAsync(
        "SELECT * FROM users WHERE sesion = 1"
      );

      if (result.length > 0) {
        router.push('/menu');
      }
    } catch (error) {
      console.error("Error al verificar la sesión:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const result = await db.getAllAsync(
        "SELECT * FROM users WHERE telefono = ? AND password = ? AND sesion = 0",
        [phoneNumber, password]
      );

      if (result.length > 0) {
        await db.runAsync(
          "UPDATE users SET sesion = 1 WHERE telefono = ?",
          [phoneNumber]
        );

        router.push('/menu');
      } else {
        ToastAndroid.show('Credenciales incorrectas. Por favor, verifica tus datos e intenta nuevamente.', ToastAndroid.LONG);
      }
    } catch (error) {
      console.error("Error al ejecutar la consulta:", error);
    }
  };

  const refreshData = async () => {
    try {
      const result = await db.getAllAsync("SELECT * FROM users");
      console.log("Datos actualizados:", result);
    } catch (error) {
      console.error("Error al obtener los datos actualizados:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/originals/21/3b/c4/213bc40505d3b688624e38521fa92a85.jpg' }}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Inicio de sesión</Text>
          <Image
            source={require('../assets/images/bioBase.png')}
            style={styles.logo}
          />
          <View style={styles.inputContainer}>
          <Entypo name="old-phone" size={24} color="black" style={{
              marginRight: 10,
          }}/>
            <TextInput
              style={styles.input}
              placeholder="Número de teléfono"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputContainer}>
          <MaterialIcons name="password" size={24} color="black" style={{
              marginRight: 10,
              paddingTop: 5,
          }} /> 
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <Button
            title="Iniciar sesión"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
            onPress={handleLogin}
          />
          <Text style={styles.registerText}>
            ¿No tienes una cuenta?{' '}
            <Link href="/registro" style={styles.registerLink}>Regístrate</Link>
          </Text>
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
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 1,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  button: {
    backgroundColor: '#9ab2d7',
    borderRadius: 100,
    paddingVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  registerText: {
    color: '#333333',
    textAlign: 'center',
    marginTop: 82,
    fontSize: 16,
  },
  registerLink: {
    color: 'red',
    textDecorationLine: 'underline',
  },
});