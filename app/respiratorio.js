import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const RespiratorySystemScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const videoRef = useRef(null);

  const texto = [
    {
      text: 'El sistema respiratorio es el conjunto de órganos y estructuras que permiten la entrada y salida de aire en el cuerpo, así como el intercambio de gases entre el aire y la sangre. Su función principal es proporcionar oxígeno a los tejidos y eliminar el dióxido de carbono producido por el metabolismo celular.',
      image: null,
    },
    {
      text: 'El sistema respiratorio está compuesto por las vías respiratorias superiores e inferiores. Las vías respiratorias superiores incluyen la nariz, la boca, la faringe y la laringe, mientras que las vías respiratorias inferiores están formadas por la tráquea, los bronquios y los pulmones.',
      image: 'https://www.thoughtco.com/thmb/8omUGJESSp-MBRdp06MgJS5pxz0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/respiratory_system-578d72f73df78c09e96906ff.jpg',
    },
    {
      text: 'Durante la inspiración, el aire entra por la nariz o la boca y pasa por la faringe y la laringe hasta llegar a la tráquea. La tráquea se divide en dos bronquios principales, que a su vez se ramifican en bronquios más pequeños y bronquiolos, hasta llegar a los alvéolos pulmonares. En los alvéolos se produce el intercambio gaseoso, donde el oxígeno pasa a la sangre y el dióxido de carbono es eliminado.',
      image: 'https://openmd.com/images/illustrations/respiratory-system.png',
    },
    {
      text: 'Durante la espiración, el proceso se invierte y el aire cargado de dióxido de carbono sale de los pulmones siguiendo el mismo recorrido. Los músculos respiratorios, como el diafragma y los músculos intercostales, se encargan de controlar los movimientos de inspiración y espiración, permitiendo la entrada y salida de aire de los pulmones.',
      image: 'https://neumofisio.com/wp-content/uploads/2021/10/Anatomia-aparato-respiratorio.jpg',
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
        <Text style={[styles.title, { color: textColor, fontSize: fontSize + 4 }]}>El Sistema Respiratorio</Text>
        <TouchableOpacity onPress={openModal}>
          <Ionicons name="settings" size={24} color={textColor} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Video
          ref={videoRef}
          source={require('@/assets/videos/respiratorio.mp4')}
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

export default RespiratorySystemScreen;