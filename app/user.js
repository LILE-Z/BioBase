import React, { useState, useEffect, Suspense } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Linking, Platform } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function App() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <SQLiteProvider
        databaseName="mydb.db"
        assetSource={{ assetId: require("@/assets/mydb.db") }}
        useSuspense
      >
        <ProfileScreen />
      </SQLiteProvider>
    </Suspense>
  );
}

function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [dbContent, setDbContent] = useState([]);
  const db = useSQLiteContext();
  const isFocused = useIsFocused();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [isFocused]);

  const fetchUser = async () => {
    try {
      const resultSet = await db.getAllAsync(
        "SELECT nombre FROM users WHERE sesion = ?",
        [true]
      );
      console.log('User result set:', resultSet);
      if (resultSet.length > 0) {
        setUser(resultSet[0]);
        console.log('User set:', resultSet[0]);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const logOut = async () => {
    try {
      await db.runAsync(
        "UPDATE users SET sesion = ? WHERE sesion = ?",
        [false, true]
      );
      router.push('/');
      showDatabaseContent();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const showDatabaseContent = async () => {
    try {
      const resultSet = await db.getAllAsync("SELECT * FROM users");
      setDbContent(resultSet);
    } catch (error) {
      console.error('Error fetching database content:', error);
    }
  };

  console.log('User state:', user);

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/1200x/e1/b4/6c/e1b46c7cd8c5cadcb9b3b3de1d4d9ce7.jpg' }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Mi Perfil</Text>
        </View>
        {user && (
          <View style={styles.content}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user.nombre.charAt(0)}</Text>
              </View>
            </View>
            <Text style={styles.welcomeText}>¡Hola, {user.nombre}!</Text>
            <TouchableOpacity style={styles.logOutButton} onPress={logOut}>
              <Text style={styles.logOutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        )}
        {dbContent.length > 0 && (
          <View style={styles.dbContentContainer}>
            <Text style={styles.dbContentTitle}>Contenido de la base de datos:</Text>
            <ScrollView>
              {dbContent.map((row, index) => (
                <Text key={index} style={styles.dbContentText}>
                  {JSON.stringify(row)}
                </Text>
              ))}
            </ScrollView>
          </View>
        )}
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Atención al cliente y dudas:</Text>
          <Text style={styles.contactName}>Daniel Méndez Juárez</Text>
          <Text style={styles.contactAddress}>Dirección: CBTis 260, Av. 117 Pte. 706, Guadalupe Hidalgo, 72480 Heroica Puebla de Zaragoza, Pue.</Text>
          <TouchableOpacity
            style={styles.contactPhone}
            onPress={() => {
              if (Platform.OS === "android") {
                Linking.openURL("tel:2225967748");
              } else {
                Linking.openURL("telprompt:2225967748");
              }
            }}
          >
            <Text style={styles.contactPhoneText}>Teléfono: 2225967748</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#333',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  logOutButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  logOutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dbContentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  dbContentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  dbContentText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  contactContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  contactAddress: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  contactPhone: {
    marginTop: 10,
  },
  contactPhoneText: {
    fontSize: 16,
    color: '#a99ca2',
    textDecorationLine: 'underline',
  },
});