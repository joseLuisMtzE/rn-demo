import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Share,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import {
  API_BASE_URL,
  API_KEY,
  dummySpecificRecipe,
} from "../../constants/Constants";
import {
  ActivityIndicator,
  Chip,
  IconButton,
  useTheme,
} from "react-native-paper";
import ExtraDataItem from "../../components/ApiScreen/ExtraDataItem";
import BackButton from "../../components/BackButton/BackButton";

interface NavProps {
  navigation: any;
  route: any;
}

interface ExtraDataProps {
  data: number | string;
  icon: string;
  name: string;
}
[];

export default function RecipeDetailScreen({ navigation, route }: NavProps) {
  const theme = useTheme();

  const { id } = route.params;

  const [currentRecipe, setCurrentRecipe] = useState<any>(null);
  const [extraData, setExtraData] = useState<ExtraDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSpecificRecipe = async (id: number) => {
    // setCurrentRecipe(jsonDummyRecipe);
    try {
      await axios
        .get(`${API_BASE_URL}/${id}/information?apiKey=${API_KEY}`)
        .then((res) => {
          setCurrentRecipe(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getDummySpecificRecipe = async () => {
    setCurrentRecipe(dummySpecificRecipe);
  };

  useEffect(() => {
    getSpecificRecipe(id);
    // getDummySpecificRecipe();

    return () => {};
  }, []);

  useEffect(() => {
    if (currentRecipe) {
      const {
        servings,
        healthScore,
        aggregateLikes,
        readyInMinutes,
        spoonacularScore,
      } = currentRecipe;
      const json: ExtraDataProps[] = [
        {
          data: readyInMinutes,
          icon: "alarm-check",
          name: "Mins",
        },
        {
          data: servings,
          icon: "account-group",
          name: "Porción",
        },
        {
          data: aggregateLikes,
          icon: "thumb-up-outline",
          name: "Likes",
        },
        {
          data: healthScore,
          icon: "dumbbell",
          name: "Healthy",
        },
        {
          data: `${spoonacularScore.toFixed(0)}%`,
          icon: "account-star",
          name: "Puntaje",
        },
      ];
      setExtraData(json);
      setIsLoading(false);
    }
  }, [currentRecipe]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: `Recipes App | ${currentRecipe.title}`,
        message: `Recipes App | ${currentRecipe.title}\n \nPrepara tu comida ahora! ${currentRecipe.spoonacularSourceUrl}`,
        url: currentRecipe.spoonacularSourceUrl,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <>
      {!isLoading ? (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <View>
            <ScrollView
              overScrollMode="never"
              showsVerticalScrollIndicator={false}
            >
              <View>
                <Image
                  source={{ uri: currentRecipe.image }}
                  style={{
                    width: "100%",
                    height: 150,
                    minHeight: 100,
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                  }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                <View style={{ gap: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          fontFamily: "RobotoBold",
                          maxWidth: "80%",
                        }}
                      >
                        {currentRecipe.title}
                      </Text>
                      <IconButton
                        icon={"share-variant"}
                        mode="contained"
                        containerColor={theme.colors.inverseOnSurface}
                        iconColor={theme.colors.inversePrimary}
                        size={24}
                        onPress={onShare}
                      />
                    </View>
                  </View>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    overScrollMode="never"
                    horizontal
                    contentContainerStyle={{
                      gap: 4,
                      alignItems: "center",
                      alignContent: "center",
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                    data={currentRecipe.dishTypes}
                    renderItem={({ item }: any) => (
                      <Chip
                        compact
                        textStyle={{ fontSize: 10, fontFamily: "RobotoMedium" }}
                        style={{ borderRadius: 50 }}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </Chip>
                    )}
                  />
                  {extraData && (
                    <View>
                      <View
                        style={{
                          backgroundColor: "#f9f9f9",
                          height: "auto",
                          borderRadius: 16,
                          padding: 8,
                        }}
                      >
                        <FlatList
                          horizontal
                          scrollEnabled={false}
                          contentContainerStyle={{
                            justifyContent: "space-evenly",
                            width: "100%",
                          }}
                          data={extraData}
                          renderItem={({ item }) => (
                            <ExtraDataItem
                              data={item.data}
                              icon={item.icon}
                              name={item.name}
                            />
                          )}
                        />
                      </View>
                    </View>
                  )}
                  {currentRecipe?.extendedIngredients && (
                    <View style={{ gap: 8 }}>
                      <Text style={{ fontFamily: "RobotoBold", fontSize: 16 }}>
                        Ingredientes
                      </Text>
                      <View
                        style={{
                          justifyContent: "space-evenly",
                          width: "100%",
                          paddingLeft: 8,
                        }}
                      >
                        {currentRecipe.extendedIngredients.map(
                          (item: any, i: number) => (
                            <View
                              style={{
                                flexDirection: "row",
                                width: "100%",
                              }}
                              key={item.id + i}
                            >
                              <Text
                                style={{
                                  fontFamily: "RobotoBold",
                                  color: theme.colors.inversePrimary,
                                }}
                              >
                                •{" "}
                              </Text>
                              <Text style={{ flex: 1 }}>{item.original}</Text>
                            </View>
                          )
                        )}
                      </View>
                    </View>
                  )}
                  <View style={{ gap: 8 }}>
                    <Text style={{ fontFamily: "RobotoBold", fontSize: 16 }}>
                      Instrucciones
                    </Text>
                    <View
                      style={{
                        paddingLeft: 8,
                      }}
                    >
                      {currentRecipe.analyzedInstructions[0].steps.map(
                        (item: any) => (
                          <View
                            style={{
                              flexDirection: "row",
                              width: "100%",
                            }}
                            key={item.number}
                          >
                            <Text
                              style={{
                                fontFamily: "RobotoBold",
                                color: theme.colors.inversePrimary,
                              }}
                            >
                              {item.number}-{" "}
                            </Text>
                            <Text style={{ flex: 1 }}>{item.step}</Text>
                          </View>
                        )
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <BackButton navigation={navigation} />
          </View>
        </SafeAreaView>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      )}
    </>
  );
}
