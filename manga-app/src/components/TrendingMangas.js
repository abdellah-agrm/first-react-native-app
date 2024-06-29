import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import Carousel from 'pinar';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function TrendingMangas({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate('Manga', { item });
  }

  return (
    <View>
      <Text className="text-white text-xl mx-4 mt-2 mb-5">Trending</Text>
      <Carousel
        horizontal={true}
        loop={true}
        index={0}
        showsControls={false}
        showsDots={false}
        autoplay={true}
        autoplayInterval={2000}
        height={350}
      >
        {
         Array.isArray(data) && data.map((item, index) => (
            <MangaCard key={index} item={item} handleClick={handleClick} />
          ))
        }
      </Carousel>
    </View>
  )
}

const MangaCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item.slug)}>
      <View className="flex justify-center items-center">
        <Image source={{uri: item.cover}}    
        style={{ width: windowWidth * 0.6, height: windowHeight * 0.4 }}
          className="rounded-lg"
        />
      </View>
    </TouchableWithoutFeedback>
  )
}