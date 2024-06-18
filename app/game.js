import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';

const cards = [
  { type: 'image', content: 'https://media.healthdirect.org.au/images/inline/original/central-nervous-system-de8c6e.jpg', system: 'Sistema Nervioso' },
  { type: 'text', content: 'Sistema Nervioso', system: 'Sistema Nervioso' },
  { type: 'image', content: 'https://i.natgeofe.com/n/6478dae4-21a2-4679-afb9-c59028081582/920.jpg', system: 'Sistema Digestivo' },
  { type: 'text', content: 'Sistema Digestivo', system: 'Sistema Digestivo' },
  { type: 'image', content: 'https://media.istockphoto.com/id/489734346/vector/respiratory-system.jpg?s=612x612&w=0&k=20&c=JYeYVMHxm3-90obMTN7nAp5uCjgb7BqTnhVCHru3Www=', system: 'Sistema Respiratorio' },
  { type: 'text', content: 'Sistema Respiratorio', system: 'Sistema Respiratorio' },
  { type: 'image', content: 'https://innerbody.imgix.net/skeletal_system.png', system: 'Sistema Óseo' },
  { type: 'text', content: 'Sistema Óseo', system: 'Sistema Óseo' },
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Card = ({ type, content, onPress, flipped }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {flipped ? (
        type === 'image' ? (
          <Image source={{ uri: content }} style={styles.cardImage} resizeMode="cover" />
        ) : (
          <Text style={styles.cardText}>{content}</Text>
        )
      ) : (
        <View style={[styles.card, styles.cardBack]}>
          <Text style={styles.cardBackText}>?</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const App = () => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [showEndModal, setShowEndModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (shuffledCards[firstCard].system === shuffledCards[secondCard].system) {
        setMatchedCards([...matchedCards, firstCard, secondCard]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, shuffledCards]);

  useEffect(() => {
    if (matchedCards.length === shuffledCards.length) {
      setShowEndModal(true);
    }
  }, [matchedCards, shuffledCards]);

  const startNewGame = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    setShuffledCards(shuffle(cards));
    setShowEndModal(false);
  };

  const handleCardFlip = (index) => {
    if (flippedCards.length === 1 && flippedCards[0] === index) return;
    if (matchedCards.includes(index)) return;
    setFlippedCards([...flippedCards, index]);
  };

  const handlePlayAgain = () => {
    startNewGame();
  };

  const handleGoToMenu = () => {
    startNewGame();
    router.push('/menu');
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        data={shuffledCards}
        numColumns={numColumns}
        renderItem={({ item, index }) => (
          <Card
            key={index}
            type={item.type}
            content={item.content}
            onPress={() => handleCardFlip(index)}
            flipped={flippedCards.includes(index) || matchedCards.includes(index)}
          />
        )}
      />
      <Modal visible={showEndModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¡Diviertete!</Text>
            <Text style={styles.modalText}>¿Qué deseas hacer?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handlePlayAgain}>
                <Text style={styles.modalButtonText}>Jugar de Nuevo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleGoToMenu}>
                <Text style={styles.modalButtonText}>Volver al Menú</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0e6d8',
    padding: 20,
  },
  card: {
    width: '48%',
    height: 150,
    backgroundColor: '#c4a484',
    borderRadius: 8,
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBack: {
    backgroundColor: '#4b3832',
    borderWidth: 2,
    borderColor: '#c4a484',
  },
  cardBackText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f0e6d8',
  },
  cardImage: {
    width: '80%',
    height: '80%',
    borderRadius: 8,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4b3832',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#c4a484',
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;