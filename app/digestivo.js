import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const DigestiveSystemScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const videoRef = useRef(null);

  const texto = [
    {
      text: 'El sistema digestivo es el conjunto de órganos encargados de procesar los alimentos y absorber los nutrientes necesarios para el funcionamiento del organismo. Está compuesto por el tracto gastrointestinal, que incluye la boca, el esófago, el estómago, el intestino delgado y el intestino grueso, así como por órganos auxiliares como el hígado, la vesícula biliar y el páncreas.',
      image: null,
    },
    {
      text: 'El proceso de digestión comienza en la boca, donde los alimentos se mastican y mezclan con la saliva, que contiene enzimas que inician la descomposición de los carbohidratos. Luego, el bolo alimenticio pasa por el esófago hasta llegar al estómago, donde se mezcla con los jugos gástricos y se convierte en quimo.',
      image: 'https://bgapc.com/wp-content/uploads/2020/02/Birmingham-Gastro_Parts-of-Digestive-System-1024x536.jpeg',
    },
    {
      text: 'A continuación, el quimo pasa al intestino delgado, donde se produce la mayor parte de la digestión y absorción de nutrientes. Aquí, el páncreas secreta enzimas digestivas y el hígado produce bilis, que ayuda a emulsionar las grasas. Los nutrientes son absorbidos por las vellosidades intestinales y pasan al torrente sanguíneo.',
      image: 'https://www.pileje.com/sites/default/files/styles/node_full/public/2021-03/digestive%20system.png',
    },
    {
      text: 'Finalmente, los restos no digeridos llegan al intestino grueso, donde se absorbe el agua y se forman las heces. Estas se almacenan en el recto hasta ser eliminadas a través del ano durante la defecación.',
      image: null,
    },
  ];

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const setSmallFontSize = () => {
    setFontSize(18);
  };

  const setMediumFontSize = () => {
    setFontSize(20);
  };

  const setLargeFontSize = () => {
    setFontSize(22);
  };

  const setWhiteBackground = () => {
    setBackgroundColor('#FFFFFF');
    setTextColor('#000000');
  };

  const setBlackBackground = () => {
    setBackgroundColor('#000000');
    setTextColor('#FFFFFF');
  };

  const setSepiaBackground = () => {
    setBackgroundColor('#F4EEDF');
    setTextColor('#000000');
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
    } else {
      const textoCompleto = texto.map((item) => item.text).join('\n\n');
      Speech.speak(textoCompleto, { language: 'es' });
    }
    setIsSpeaking(!isSpeaking);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor, fontSize: fontSize + 4 }]}>El Sistema Digestivo</Text>
        <TouchableOpacity onPress={openModal}>
          <Ionicons name="settings" size={24} color={textColor} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Video
          ref={videoRef}
          source={require('@/assets/videos/digestivo.mp4')}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
        />
        {texto.map((item, index) => (
          <View key={index}>
            <Text style={[styles.description, { color: textColor, fontSize }]}>{item.text}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />}
          </View>
        ))}
      </ScrollView>
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configuración</Text>
            <View style={styles.optionsContainer}>
              <Text style={styles.optionTitle}>Tamaño de letra:</Text>
              <View style={styles.fontButtonContainer}>
                <TouchableOpacity onPress={setSmallFontSize} style={[styles.optionButton, styles.pastelButton]}>
                  <Text style={styles.optionButtonText}>Pequeño</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={setMediumFontSize} style={[styles.optionButton, styles.pastelButton]}>
                  <Text style={styles.optionButtonText}>Mediano</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={setLargeFontSize} style={[styles.optionButton, styles.pastelButton]}>
                  <Text style={styles.optionButtonText}>Grande</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.optionsContainer}>
              <Text style={styles.optionTitle}>Color de fondo:</Text>
              <View style={styles.backgroundButtonContainer}>
                <TouchableOpacity onPress={setWhiteBackground} style={[styles.backgroundButton, styles.whiteButton]}>
                  <Text style={styles.backgroundButtonText}>Blanco</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={setBlackBackground} style={[styles.backgroundButton, styles.blackButton]}>
                  <Text style={[styles.backgroundButtonText, styles.blackButtonText]}>Negro</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={setSepiaBackground} style={[styles.backgroundButton, styles.sepiaButton]}>
                  <Text style={styles.backgroundButtonText}>Sepia</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={[styles.optionButton, styles.pastelButton]} onPress={toggleSpeech}>
              <Text style={styles.optionButtonText}>{isSpeaking ? 'Pausar Voz' : 'Iniciar Voz'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.closeButton, styles.pastelButton]} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  description: {
    marginBottom: 20,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF9999',
  },
  optionsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF9999',
  },
  fontButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pastelButton: {
    backgroundColor: '#FF9999',
  },
  backgroundButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  backgroundButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  backgroundButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  whiteButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF9999',
  },
  blackButton: {
    backgroundColor: '#000000',
  },
  blackButtonText: {
    color: '#FFFFFF',
  },
  sepiaButton: {
    backgroundColor: '#F4EEDF',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DigestiveSystemScreen;