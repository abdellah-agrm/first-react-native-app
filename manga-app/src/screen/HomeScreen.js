import React, { useEffect, useState } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import MangaList from "../components/MangaList";
import TrendingMangas from "../components/TrendingMangas";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";

const ios = Platform.OS === 'ios';
export default function HomeScreen() {
  const api = "https://mangareader-api.vercel.app/api/v1/";
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(api + "featured")
      .then((res) => setUpcoming(res.data.data))
      .catch((err) => console.error(err));

    axios.get(api + "trending")
      .then((res) => {
        setTrending(res.data.data);
        setTopRated(res.data.data);
        setLoading(false);
      })
  }, []);

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar and logo  */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>anga
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading ? (<Loading />)
          : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
              {/* Trending manga carousel */}
              <TrendingMangas data={trending} />

              {/* upcoming mangas now  */}
              <MangaList title="Upcoming" data={upcoming} />

              {/* top rated mangas now  */}
              <MangaList title="Top Rated" data={topRated} />
            </ScrollView>
          )
      }
    </View>
  )
}
