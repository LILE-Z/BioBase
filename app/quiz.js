import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal } from 'react-native';

const questions = [
  {
    question: '¿Cuál es el hueso más largo del cuerpo humano?',
    options: ['Fémur', 'Tibia', 'Húmero', 'Radio'],
    answer: 'Fémur',
  },
  {
    question: '¿Qué parte del sistema nervioso se encarga de los actos voluntarios?',
    options: ['Sistema nervioso central', 'Sistema nervioso periférico', 'Sistema nervioso autónomo', 'Sistema nervioso entérico'],
    answer: 'Sistema nervioso central',
  },
  {
    question: '¿Cuál es la función principal del sistema digestivo?',
    options: ['Transportar oxígeno', 'Digerir los alimentos', 'Eliminar desechos', 'Regular la temperatura corporal'],
    answer: 'Digerir los alimentos',
  },
  {
    question: '¿Cuál es el órgano principal del sistema respiratorio?',
    options: ['Corazón', 'Pulmones', 'Hígado', 'Riñones'],
    answer: 'Pulmones',
  },
  {
    question: '¿Qué hueso protege el cerebro?',
    options: ['Columna vertebral', 'Cráneo', 'Costillas', 'Esternón'],
    answer: 'Cráneo',
  },
  {
    question: '¿Cuál es el músculo más fuerte del cuerpo humano?',
    options: ['Bíceps', 'Cuádriceps', 'Tríceps', 'Glúteos'],
    answer: 'Cuádriceps',
  },
  {
    question: '¿Qué órgano del sistema digestivo produce la bilis?',
    options: ['Estómago', 'Hígado', 'Páncreas', 'Intestino delgado'],
    answer: 'Hígado',
  },
  {
    question: '¿Cuál es el principal gas que se intercambia durante la respiración?',
    options: ['Nitrógeno', 'Oxígeno', 'Dióxido de carbono', 'Helio'],
    answer: 'Oxígeno',
  },
];

const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    setShuffledQuestions(shuffle(questions));
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === shuffledQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setShuffledQuestions(shuffle(questions));
  };

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/5a/14/2d/5a142dac8eaac9071017888eb06e3763.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {!showResult ? (
          <View style={styles.quizContainer}>
            <Text style={styles.questionText}>{shuffledQuestions[currentQuestion]?.question}</Text>
            <View style={styles.optionsContainer}>
              {shuffledQuestions[currentQuestion]?.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedOption === option && styles.selectedOptionButton,
                  ]}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedOption === option && styles.selectedOptionText,
                  ]}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {selectedOption !== null && (
              <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <Modal visible={true} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.resultText}>Your Score:</Text>
                <Text style={styles.scoreText}>
                  {score}/{questions.length}
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleRetry}>
                  <Text style={styles.buttonText}>Retry Quiz</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  quizContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4a3f35',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#e0d6c7',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: '#4a3f35',
  },
  optionText: {
    fontSize: 18,
    color: '#4a3f35',
  },
  selectedOptionText: {
    color: '#fff',
  },
  nextButton: {
    backgroundColor: '#4a3f35',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4a3f35',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4a3f35',
  },
  button: {
    backgroundColor: '#4a3f35',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default QuizScreen;