import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const NervousSystemScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const videoRef = useRef(null);

  const texto = [
    {
      text: 'El sistema nervioso es una red compleja de células y tejidos que transmiten señales eléctricas y químicas por todo el cuerpo. Su función principal es coordinar las acciones y reacciones del organismo, tanto voluntarias como involuntarias, y procesar la información sensorial.',
      image: null,
    },
    {
      text: 'El sistema nervioso se divide en dos partes principales: el sistema nervioso central (SNC) y el sistema nervioso periférico (SNP). El SNC está compuesto por el encéfalo y la médula espinal, mientras que el SNP está formado por los nervios que se extienden desde el SNC hasta todas las partes del cuerpo.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/TE-Nervous_system_diagram.svg/1200px-TE-Nervous_system_diagram.svg.png',
    },
    {
      text: 'El encéfalo es la parte más compleja del sistema nervioso y se encarga de procesar la información sensorial, controlar el movimiento, el pensamiento, la memoria y las emociones. Está compuesto por el cerebro, el cerebelo y el tronco encefálico. La médula espinal es un cordón nervioso que se extiende desde el tronco encefálico hasta la parte inferior de la columna vertebral y transmite señales entre el encéfalo y el resto del cuerpo.',
      image: 'https://qbi.uq.edu.au/files/27993/central-nervous-system-QBI.jpg',
    },
    {
      text: 'El SNP se divide en el sistema nervioso somático, que controla los movimientos voluntarios, y el sistema nervioso autónomo, que regula las funciones involuntarias como la frecuencia cardíaca, la respiración y la digestión. El sistema nervioso autónomo se subdivide en el sistema nervioso simpático, que prepara al cuerpo para situaciones de estrés o emergencia, y el sistema nervioso parasimpático, que promueve el descanso y la recuperación.',
      image: 'https://briandorfman.com/wp-content/uploads/2015/07/Male-Nervous-System-ref01.jpg',
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
        <Text style={[styles.title, { color: textColor, fontSize: fontSize + 4 }]}>El Sistema Nervioso</Text>
        <TouchableOpacity onPress={openModal}>
          <Ionicons name="settings" size={24} color={textColor} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Video
          ref={videoRef}
          source={require('@/assets/videos/nervioso.mp4')}
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

export default NervousSystemScreen;