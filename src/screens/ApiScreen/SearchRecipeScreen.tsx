import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from "react-native-paper";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../../constants/Constants";
import BackButton from "../../components/BackButton/BackButton";

const dummyRecipesFound = {
  number: 10,
  offset: 0,
  results: [
    {
      id: 1095755,
      image: "https://img.spoonacular.com/recipes/1095755-312x231.jpg",
      imageType: "jpg",
      title: "Quinoa and Kidney Bean Burgers",
    },
    {
      id: 632115,
      image: "https://img.spoonacular.com/recipes/632115-312x231.jpg",
      imageType: "jpg",
      title: "Almond Coffee Cupcakes with Kahlua Liqueur",
    },
    {
      id: 653192,
      image: "https://img.spoonacular.com/recipes/653192-312x231.jpg",
      imageType: "jpg",
      title: "No-Bake Fudge Brandy Brownies",
    },
    {
      id: 646021,
      image: "https://img.spoonacular.com/recipes/646021-312x231.jpg",
      imageType: "jpg",
      title: "Guilt-Free Brownie Batter Dip",
    },
    {
      id: 664489,
      image: "https://img.spoonacular.com/recipes/664489-312x231.jpg",
      imageType: "jpg",
      title: "Vegan Strawberry Cupcakes",
    },
    {
      id: 157107,
      image: "https://img.spoonacular.com/recipes/157107-312x231.jpg",
      imageType: "jpg",
      title: "Skinny Cheesecake Brownie Bites",
    },
    {
      id: 646524,
      image: "https://img.spoonacular.com/recipes/646524-312x231.jpg",
      imageType: "jpg",
      title: "Healthy Vegan Red Velvet Brownies",
    },
    {
      id: 653907,
      image: "https://img.spoonacular.com/recipes/653907-312x231.jpg",
      imageType: "jpg",
      title: "Orange Liqueur {Cointreau} Brownies",
    },
    {
      id: 641604,
      image: "https://img.spoonacular.com/recipes/641604-312x231.jpg",
      imageType: "jpg",
      title: "Double Dark Chocolate Zucchini Brownies",
    },
    {
      id: 662585,
      image: "https://img.spoonacular.com/recipes/662585-312x231.jpg",
      imageType: "jpg",
      title: "Sweet Potato Oven Fries",
    },
  ],
  totalResults: 346,
};

export default function SearchRecipeScreen({ navigation, route }: any) {
  const searchInput = useRef<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recipesFound, setRecipesFound] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    getSearchRecipes(searchQuery);
  };

  const handleClearInput = () => {
    searchInput.current?.focus();
    setRecipesFound(null);
  };

  // todo handle not found search
  const getSearchRecipes = async (query: string) => {
    try {
      await axios
        .get(`${API_BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${query}`)
        .then((res) => {
          setRecipesFound(res.data.results);
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // setRecipesFound(dummyRecipesFound.results);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.searchContainer}>
        <BackButton
          navigation={navigation}
          style={{ position: "relative", left: 0 }}
        />
        <Searchbar
          style={{ flex: 1 }}
          placeholder="Buscar..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          ref={searchInput}
          onSubmitEditing={handleSearch}
          onClearIconPress={handleClearInput}
          loading={isLoading}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={recipesFound}
          renderItem={({ item }: any) => (
            <TouchableOpacity style={styles.recipesFoundItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.listEmptyComponent}>
              {recipesFound !== null && recipesFound.length === 0
                ? "No se encontraron recetas"
                : "Aún no se han buscado recetas"}
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    paddingHorizontal: 8,
    flexDirection: "row",
    gap: 4,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: "RobotoRegular",
    flex: 1,
    marginLeft: 8,
  },
  recipesFoundItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#00000010",
  },
  listEmptyComponent: { textAlign: "center", paddingTop: 16, opacity: 0.3 },
  itemImage: { width: 60, height: 60, borderRadius: 50 },
});
