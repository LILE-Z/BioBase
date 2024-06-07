import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const SkeletalSystemScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const videoRef = useRef(null);

  const texto = [
    {
      text: 'El sistema óseo es el conjunto de huesos que forman el esqueleto humano. Está compuesto por 206 huesos en un adulto, y su función principal es proporcionar soporte y protección a los órganos internos, permitir el movimiento y almacenar minerales como el calcio y el fósforo.',
      image: null,
    },
    {
      text: 'Los huesos se clasifican según su forma en largos, cortos, planos e irregulares. Los huesos largos, como el fémur y el húmero, son más largos que anchos y tienen una cavidad medular que contiene médula ósea. Los huesos cortos, como los del carpo y el tarso, son aproximadamente iguales en longitud y anchura. Los huesos planos, como el cráneo y la escápula, tienen una forma aplanada y protegen los órganos internos. Los huesos irregulares, como las vértebras y los huesos de la cara, tienen una forma compleja.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Human-Skeleton.jpg/640px-Human-Skeleton.jpg',
    },
    {
      text: 'El esqueleto se divide en dos partes: el esqueleto axial y el esqueleto apendicular. El esqueleto axial está formado por los huesos de la cabeza, el tórax y la columna vertebral, mientras que el esqueleto apendicular está compuesto por los huesos de las extremidades superiores e inferiores.',
      image: 'https://storage.googleapis.com/ilerna_media-cloud/wordpress_ilerna/production/Sistema-oseo2-683x1024.png',
    },
    {
      text: 'Los huesos están unidos entre sí por las articulaciones, que permiten el movimiento. Las articulaciones pueden ser fijas, como las suturas del cráneo, o móviles, como las articulaciones sinoviales de las rodillas y los codos. Los ligamentos y los tendones también desempeñan un papel importante en la estabilidad y el movimiento de las articulaciones.',
      image: 'https://definicion.de/wp-content/uploads/2014/09/sistema-oseo.png',
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
        <Text style={[styles.title, { color: textColor, fontSize: fontSize + 4 }]}>El Sistema Óseo</Text>
        <TouchableOpacity onPress={openModal}>
          <Ionicons name="settings" size={24} color={textColor} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Video
          ref={videoRef}
          source={require('@/assets/videos/oseo.mp4')}
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
    height: 300,
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

export default SkeletalSystemScreen;