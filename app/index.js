import React from 'react';
import {Text,View,StyleSheet} from 'react-native'

export default function App() {
    
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Pantalla de login</Text>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title:{
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  }
});