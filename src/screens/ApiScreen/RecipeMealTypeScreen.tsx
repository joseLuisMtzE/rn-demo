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
import {
  API_BASE_URL,
  API_KEY,
  dummyRecipesbyMealType,
} from "../../constants/Constants";
import axios from "axios";
import BackButton from "../../components/BackButton/BackButton";

export default function RecipeMealTypeScreen({ navigation, route }: any) {
  const theme = useTheme();
  const { mealType, label, icon } = route.params;
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
    getRecipesByCategory(mealType);
    // getDummyRecipesByCategory();
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
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator />
        </View>
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
