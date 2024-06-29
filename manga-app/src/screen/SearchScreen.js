import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TextInput, TouchableOpacity, Dimensions, ScrollView, Text, TouchableWithoutFeedback, Image } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { Search1 } from '../assets/icons';
import Loading from '../components/Loading';
import axios from 'axios';

var { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation();
  const api = "https://mangareader-api.vercel.app/api/v1/search/";
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = (item) => {
    navigation.navigate('Manga', { item });
  }

  useEffect(() => {
    if (search!=="") {
      setLoading(true);
      axios.get(api+search)
      .then((res)=>{
        setResults(res.data.data);
        setLoading(false);
      })
      .catch((err)=>console.error(err));
    }
  }, [search]);
  

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput placeholder='Search Manga'
          placeholderTextColor={'lightgray'}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
          onChangeText={text => setSearch(text)}
          value={search}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-1 bg-neutral-500">
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* Results : */}
      {
        loading ? (<Loading />)
          :
          results.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              className="space-y-3">
              <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
              <View className="flex-row justify-between flex-wrap">
                {
                  results.map((item, index) => (
                    <TouchableWithoutFeedback
                      key={index} onPress={() => handleClick(item.slug)}>
                      <View className="space-y-2 mb-4">
                        <Image className="rounded-lg"
                          source={{ uri: item.cover }}
                          style={{ width: width * 0.44, height: height * 0.3 }}
                        />
                        <Text className="text-neutral-300 ml-1">
                          {
                            item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title
                          }
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))
                }
              </View>
            </ScrollView>
          ) : (
            <View className="flex-row justify-center items-center py-20">
              <Image source={Search1} className="h-64 w-72" />
            </View>
          )
      }

    </SafeAreaView>
  )
}