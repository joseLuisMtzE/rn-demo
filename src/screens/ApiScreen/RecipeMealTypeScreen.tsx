import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Avatar,
  IconButton,
  useTheme,
} from "react-native-paper";
import { API_BASE_URL, API_KEY } from "../../constants/Constants";
import axios from "axios";
import BackButton from "../../components/BackButton/BackButton";

const dummyRecipesbyMealType = [
  {
    id: 661925,
    image: "https://img.spoonacular.com/recipes/661925-312x231.jpg",
    imageType: "jpg",
    title: "Strawberry-Mango Quinoa Salad",
  },
  {
    id: 157344,
    image: "https://img.spoonacular.com/recipes/157344-312x231.jpg",
    imageType: "jpg",
    title: "Spicy Salad with Kidney Beans, Cheddar, and Nuts",
  },
  {
    id: 661340,
    image: "https://img.spoonacular.com/recipes/661340-312x231.jpg",
    imageType: "jpg",
    title: "Spinach Salad with Strawberry Vinaigrette",
  },
  {
    id: 632269,
    image: "https://img.spoonacular.com/recipes/632269-312x231.jpg",
    imageType: "jpg",
    title: "Amaranth and Roast Veggie Salad",
  },
  {
    id: 637162,
    image: "https://img.spoonacular.com/recipes/637162-312x231.jpg",
    imageType: "jpg",
    title: "Carrot and Cabbage Salad With Coriander+cumin Dry Rub",
  },
  {
    id: 649944,
    image: "https://img.spoonacular.com/recipes/649944-312x231.jpg",
    imageType: "jpg",
    title: "Lentil Mango Salad",
  },
  {
    id: 659927,
    image: "https://img.spoonacular.com/recipes/659927-312x231.jpg",
    imageType: "jpg",
    title: "Shrimp and Avocado Salad",
  },
  {
    id: 644826,
    image: "https://img.spoonacular.com/recipes/644826-312x231.jpg",
    imageType: "jpg",
    title: "Gluten Free Dairy Free Sugar Free Chinese Chicken Salad",
  },
  {
    id: 657719,
    image: "https://img.spoonacular.com/recipes/657719-312x231.jpg",
    imageType: "jpg",
    title: "Radish & Snap Pea Quinoa Salad",
  },
  {
    id: 659143,
    image: "https://img.spoonacular.com/recipes/659143-312x231.jpg",
    imageType: "jpg",
    title:
      'Salmon, Watercress, Fennel and Baby Beetroot Salad With Lemony "Caviar" Dressing',
  },
];

export default function RecipeMealTypeScreen({ navigation, route }: any) {
  const theme = useTheme();
  const { label, icon } = route.params;
  const [recipesByMealType, setRecipesByMealType] = useState<any>(null);

  const getRecipesByCategory = async (query: string) => {
    try {
      await axios
        .get(
          `${API_BASE_URL}/complexSearch?apiKey=${API_KEY}&type=${query}&number=10`
        )
        .then((res) => {
          setRecipesByMealType(res.data.results);
        });
      // .finally(() => setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
  const getDummyRecipesByCategory = async () => {
    setRecipesByMealType(dummyRecipesbyMealType);
  };

  const handlePressRecipe = (id: number) => {
    navigation.navigate("recipeDetailScreen", { id });
  };

  useEffect(() => {
    // getRecipesByCategory(mealType);
    getDummyRecipesByCategory();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {recipesByMealType ? (
        <View style={{ flex: 1 }}>
          <View style={styles.headerScreen}>
            <BackButton
              navigation={navigation}
              style={{ position: "relative" }}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar.Icon
                size={40}
                icon={icon}
                style={{ backgroundColor: "transparent" }}
                color={theme.colors.inversePrimary}
              />
              <Text style={styles.headText}>{label}</Text>
            </View>

            <IconButton
              icon={"magnify"}
              mode="contained"
              containerColor={theme.colors.inverseOnSurface}
              iconColor={theme.colors.inversePrimary}
              size={32}
              onPress={() => navigation.navigate("searchRecipeScreen")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              numColumns={2}
              data={recipesByMealType}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handlePressRecipe(item.id)}
                  style={{
                    width: "50%",
                    padding: 8,
                    gap: 4,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: "100%",
                      height: "auto",
                      minHeight: 100,
                      borderRadius: 16,
                    }}
                    resizeMode="cover"
                  />
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "RobotoRegular",
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              overScrollMode={"never"}
              onEndReached={() => console.log("fin")}
            />
          </View>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headText: {
    fontSize: 28,
    fontFamily: "RobotoBold",
  },
  headerScreen: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
});
