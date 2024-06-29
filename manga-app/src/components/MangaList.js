import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MangaList({ title, data, hideSeeAll }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate('Manga', { item });
  }

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {
          !hideSeeAll && (
            <TouchableOpacity>
              <Text style={styles.text} className="text-lg">See All</Text>
            </TouchableOpacity>
          )
        }
      </View>

      {/* Manga row : */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {
          Array.isArray(data) && data.map((item, index) => {
            return (
              <TouchableWithoutFeedback key={index} onPress={() => handleClick(item.slug)}>
                <View className="space-y-1 mr-4">
                  <Image source={{ uri: item.cover }} className="rounded-md"
                    style={{ width: windowWidth * 0.33, height: windowHeight * 0.22 }}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {
                      item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                    }
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </ScrollView>

    </View>
  )
}