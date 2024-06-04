import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
const menuItems = [
  { title: 'Respiratorio', color: '#F0D9E5', icon: 'lungs', route: 'respiratorio' },
  { title: 'Digestivo', color: '#E0F0D9', icon: 'bowl-food', route: 'digestivo' },
  { title: 'Nervioso', color: '#D9E5F0', icon: 'brain', route: 'nervioso' },
  { title: 'Óseo', color: '#F0E5D9', icon: 'bone', route: 'oseo' },
];

const backgroundImage = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjF9XIov8TiMPhbhVVmVdMTrhvNvmQm1vCVjJe3FVriicWDW6OLYzn6E6slppNumIH_xuue5-HO70NIHhxy3bMkYZt8gP3Cjx2c7PJR3wKgSUQr5j6YwI3DIlYJtQBXlnqT_idOWld7_x4/s2688/medical-wallpaper-hd.png';

export default function App() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState(menuItems);

  const handlePress = (route) => {
    router.push(route);
  };

  const filterItems = (text) => {
    const filtered = menuItems.filter((item) =>
      item.route.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <ImageBackground source={{ uri: backgroundImage }} style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 20 }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
          placeholder="Buscar..."
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            filterItems(text);
          }}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Sistemas del cuerpo</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {filteredItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: '50%',
                height: 150,
                backgroundColor: item.color,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'white',
                backdropFilter: 'blur(10px)',
                opacity: 0.8,
              }}
              onPress={() => handlePress(item.route)}
            >
              <Text style={{ color: 'black', fontSize: 18, marginBottom: 10 }}>{item.title}</Text>
              <FontAwesome6 name={item.icon} size={32} color="black" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}