import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import { styles, theme } from '../theme';
import MangaList from '../components/MangaList';
import Loading from '../components/Loading';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : ' mt-3';

export default function MangaScreen({ route }) {
  const { item } = route.params;
  const navigate = useNavigation();
  const api = "https://mangareader-api.vercel.app/api/v1/";
  const [manga, setManga] = useState([]);
  const [genres, setGenres] = useState([]);
  const [similarMangas, setSimilarMangas] = useState([]);
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetchMangaData(item);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [item]);

  const fetchMangaData = async (slug) => {
    try {
      const trending = await axios.get(api + "trending");
      setSimilarMangas(trending.data.data);

      const res = await axios.get(api + "manga/" + slug);
      setManga(res.data);
      setGenres(res.data.genres.length > 3 ? res.data.genres.slice(0, 3) : res.data.genres);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch manga data:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
      <View className="w-full">
        <View className="bg-neutral-900 h-10" />
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center " + topMargin}>
          <TouchableOpacity onPress={() => navigate.goBack()} style={styles.background} className="rounded-md ml-4 py-1 px-0.5">
            <ChevronLeftIcon size="22" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="pr-4" onPress={() => toggleFavourite(!isFavourite)}>
            <StarIcon size="34" color={isFavourite ? theme.background : "white"} />
          </TouchableOpacity>
        </SafeAreaView>

        <View>
          <Image source={{ uri: manga.cover }} style={{ width, height: height * 0.70 }} />
          <LinearGradient
            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23, 1)']}
            style={{ width, height: height * 0.40 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3 mb-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {manga.title}
        </Text>
        <Text className="text-neutral-400 font-semibold text-base text-center">
          {`${manga.type} • ${manga.published_date.slice(-4)} • ${manga.rating}`}
        </Text>
        <View className="flex-row justify-center mx-4 space-x-1">
          {genres.map((item, index) => (
            <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
              {item}{index !== genres.length - 1 ? ' •' : ''}
            </Text>
          ))}
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {manga.synopsis}
        </Text>
      </View>

      <MangaList title="More Mangas" data={similarMangas} hideSeeAll={false} />
    </ScrollView>
  );
}
