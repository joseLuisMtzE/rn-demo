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
import {
  API_BASE_URL,
  API_KEY,
  dummyRecipesFound,
} from "../../constants/Constants";
import BackButton from "../../components/BackButton/BackButton";

export default function SearchRecipeScreen({ navigation, route }: any) {
  const searchInput = useRef<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recipesFound, setRecipesFound] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { useDummy } = route.params;

  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    useDummy
      ? setTimeout(() => {
          setRecipesFound(dummyRecipesFound.results);
          setIsLoading(false);
        }, 1000)
      : getSearchRecipes(searchQuery);
  };

  const handleClearInput = () => {
    searchInput.current?.focus();
    setRecipesFound(null);
  };

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

  const handleRecipeSelected = (id: number) => {
    navigation.navigate("recipeDetailScreen", { id: id, useDummy });
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
            <TouchableOpacity
              style={styles.recipesFoundItem}
              onPress={() => handleRecipeSelected(item.id)}
            >
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
