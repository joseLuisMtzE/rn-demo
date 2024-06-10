import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Chip,
  IconButton,
  Switch,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  API_BASE_URL,
  API_KEY,
  dummyRecipes,
  mealTypes,
} from "../../constants/Constants";

interface Props {
  navigation: any;
  route: any;
}

interface categoriesProps {
  icon: string;
  label: string;
  title: string;
  searchText: string;
}
[];

export default function ApiScreen({ navigation, route }: Props) {
  const theme = useTheme();

  const [recipes, setRecipes] = useState<any>();

  const [refreshing, setRefreshing] = useState(false);

  const [useDummy, setUseDummy] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, []);

  const getRandomRecipes = async () => {
    setRefreshing(true);
    try {
      await axios
        .get(`${API_BASE_URL}/random?number=20&apiKey=${API_KEY}`)
        .then((res) => {
          // console.log(res.data.recipes);
          // res.data.recipes.map((i: { title: any }) => {
          //   console.log(i.title);
          // });
          setRecipes(res.data.recipes);
          // setRecipes(res.data.recipes);
        })
        .finally(() => {
          setRefreshing(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getDummyRecipes = () => {
    setRefreshing(true);
    setRecipes(null);
    setRecipes(dummyRecipes);
    setRefreshing(false);
  };

  const handlePressRecipe = (id: number) => {
    navigation.navigate("recipeDetailScreen", { id, useDummy });
  };

  const handleMealTypePress = (
    mealType: string,
    label: string,
    icon: string
  ) => {
    navigation.navigate("recipeMealTypeScreen", {
      mealType,
      label,
      icon,
      useDummy,
    });
  };

  useEffect(() => {
    useDummy ? getDummyRecipes() : getRandomRecipes();
  }, [useDummy]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.headText}>
              Prepara tus alimentos con las mejores
              <Text style={[styles.headText, { color: "#ffd528" }]}>
                {" "}
                recetas{" "}
              </Text>
              <Text style={styles.headText}>!</Text>
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Switch
              trackColor={{ false: "#DDDDDD", true: "#6EDC5F" }}
              thumbColor={"white"}
              onValueChange={() => {
                setUseDummy((prev) => !prev);
              }}
              value={useDummy}
            />
            <IconButton
              icon={"magnify"}
              mode="contained"
              containerColor={theme.colors.inverseOnSurface}
              iconColor={theme.colors.inversePrimary}
              size={32}
              onPress={() =>
                navigation.navigate("searchRecipeScreen", { useDummy })
              }
            />
          </View>
        </View>

        <View style={{}}>
          <FlatList
            data={mealTypes}
            renderItem={({ item }) => (
              <View style={{ alignItems: "center" }}>
                <IconButton
                  icon={item ? item.icon : "food"}
                  mode="contained"
                  containerColor={theme.colors.inversePrimary}
                  iconColor={theme.colors.onPrimaryContainer}
                  size={32}
                  onPress={() =>
                    handleMealTypePress(item.type, item.label, item.icon)
                  }
                />
                <Text style={{ fontSize: 12 }}>{item.label}</Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode={"never"}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
          }}
        >
          <Text style={styles.headText}>Explora </Text>
          {recipes ? (
            <FlatList
              refreshing={refreshing}
              onRefresh={useDummy ? getDummyRecipes : getRandomRecipes}
              numColumns={2}
              data={recipes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handlePressRecipe(item.id)}
                  style={{
                    flex: 1,
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

                  <Chip
                    compact
                    icon={"alarm-check"}
                    style={{
                      position: "absolute",
                      right: 0,
                      backgroundColor: theme.colors.secondaryContainer,
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      alignContent: "center",
                    }}
                    textStyle={{ fontSize: 12 }}
                    children={<>{item.readyInMinutes} mins.</>}
                  />
                </TouchableOpacity>
              )}
              overScrollMode={"never"}
            />
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <ActivityIndicator />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    paddingTop: 16,
    paddingHorizontal: 16,
    gap: 16,
    flex: 1,
  },
  headText: {
    fontSize: 28,
    fontFamily: "RobotoBold",
  },
});
