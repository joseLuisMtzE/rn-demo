import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "../../constants/Constants";
import { Chip, IconButton, useTheme } from "react-native-paper";
import ExtraDataItem from "../../components/ApiScreen/ExtraDataItem";

interface NavProps {
  navigation: any;
  route: any;
}

const jsonDummyRecipe = {
  vegetarian: false,
  vegan: false,
  glutenFree: true,
  dairyFree: false,
  veryHealthy: false,
  cheap: false,
  veryPopular: false,
  sustainable: false,
  lowFodmap: false,
  weightWatcherSmartPoints: 15,
  gaps: "no",
  preparationMinutes: null,
  cookingMinutes: null,
  aggregateLikes: 17,
  healthScore: 52,
  creditsText: "foodista.com",
  sourceName: "foodista.com",
  pricePerServing: 324.76,
  extendedIngredients: [
    {
      id: 11090,
      aisle: "Produce",
      image: "broccoli.jpg",
      consistency: "SOLID",
      name: "broccoli",
      nameClean: "broccoli",
      original: "8 cups raw broccoli, florets and stalk, chopped",
      originalName: "raw broccoli, florets and stalk, chopped",
      amount: 8.0,
      unit: "cups",
      meta: ["raw", "chopped"],
      measures: {
        us: {
          amount: 8.0,
          unitShort: "cups",
          unitLong: "cups",
        },
        metric: {
          amount: 704.0,
          unitShort: "g",
          unitLong: "grams",
        },
      },
    },
    {
      id: 11677,
      aisle: "Produce",
      image: "shallots.jpg",
      consistency: "SOLID",
      name: "shallot",
      nameClean: "shallot",
      original: "1 shallot, chopped",
      originalName: "shallot, chopped",
      amount: 1.0,
      unit: "",
      meta: ["chopped"],
      measures: {
        us: {
          amount: 1.0,
          unitShort: "",
          unitLong: "",
        },
        metric: {
          amount: 1.0,
          unitShort: "",
          unitLong: "",
        },
      },
    },
    {
      id: 9152,
      aisle: "Produce",
      image: "lemon-juice.jpg",
      consistency: "LIQUID",
      name: "juice of lemon",
      nameClean: "lemon juice",
      original: "1 lemon, juiced",
      originalName: "lemon, juiced",
      amount: 1.0,
      unit: "",
      meta: ["juiced"],
      measures: {
        us: {
          amount: 1.0,
          unitShort: "",
          unitLong: "",
        },
        metric: {
          amount: 1.0,
          unitShort: "",
          unitLong: "",
        },
      },
    },
    {
      id: 6615,
      aisle: "Canned and Jarred",
      image: "chicken-broth.png",
      consistency: "LIQUID",
      name: "vegetable broth",
      nameClean: "vegetable stock",
      original: "3 cups vegetable broth",
      originalName: "vegetable broth",
      amount: 3.0,
      unit: "cups",
      meta: [],
      measures: {
        us: {
          amount: 3.0,
          unitShort: "cups",
          unitLong: "cups",
        },
        metric: {
          amount: 705.0,
          unitShort: "ml",
          unitLong: "milliliters",
        },
      },
    },
    {
      id: 1002030,
      aisle: "Spices and Seasonings",
      image: "pepper.jpg",
      consistency: "SOLID",
      name: "pepper",
      nameClean: "black pepper",
      original: "1 teaspoon pepper",
      originalName: "pepper",
      amount: 1.0,
      unit: "teaspoon",
      meta: [],
      measures: {
        us: {
          amount: 1.0,
          unitShort: "tsp",
          unitLong: "teaspoon",
        },
        metric: {
          amount: 1.0,
          unitShort: "tsp",
          unitLong: "teaspoon",
        },
      },
    },
    {
      id: 2047,
      aisle: "Spices and Seasonings",
      image: "salt.jpg",
      consistency: "SOLID",
      name: "salt",
      nameClean: "table salt",
      original: "1 teaspoon salt",
      originalName: "salt",
      amount: 1.0,
      unit: "teaspoon",
      meta: [],
      measures: {
        us: {
          amount: 1.0,
          unitShort: "tsp",
          unitLong: "teaspoon",
        },
        metric: {
          amount: 1.0,
          unitShort: "tsp",
          unitLong: "teaspoon",
        },
      },
    },
    {
      id: 10011282,
      aisle: "Produce",
      image: "red-onion.png",
      consistency: "SOLID",
      name: "onion",
      nameClean: "red onion",
      original: "1 small red onion, chopped",
      originalName: "red onion, chopped",
      amount: 1.0,
      unit: "small",
      meta: ["red", "chopped"],
      measures: {
        us: {
          amount: 1.0,
          unitShort: "small",
          unitLong: "small",
        },
        metric: {
          amount: 1.0,
          unitShort: "small",
          unitLong: "small",
        },
      },
    },
    {
      id: 1001116,
      aisle: "Milk, Eggs, Other Dairy",
      image: "plain-yogurt.jpg",
      consistency: "LIQUID",
      name: "yogurt",
      nameClean: "plain yogurt",
      original: "1 cup plain yogurt",
      originalName: "plain yogurt",
      amount: 1.0,
      unit: "cup",
      meta: ["plain"],
      measures: {
        us: {
          amount: 1.0,
          unitShort: "cup",
          unitLong: "cup",
        },
        metric: {
          amount: 245.0,
          unitShort: "ml",
          unitLong: "milliliters",
        },
      },
    },
    {
      id: 10211362,
      aisle: "Produce",
      image: "potatoes-yukon-gold.png",
      consistency: "SOLID",
      name: "yukon gold potatoes",
      nameClean: "yukon gold potato",
      original: "3 cups Yukon Gold potatoes, rough chop (skin on)",
      originalName: "Yukon Gold potatoes, rough chop (skin on)",
      amount: 3.0,
      unit: "cups",
      meta: ["(skin on)"],
      measures: {
        us: {
          amount: 3.0,
          unitShort: "cups",
          unitLong: "cups",
        },
        metric: {
          amount: 709.764,
          unitShort: "ml",
          unitLong: "milliliters",
        },
      },
    },
    {
      id: 11297,
      aisle: "Produce",
      image: "parsley.jpg",
      consistency: "SOLID",
      name: "parsley",
      nameClean: "parsley",
      original: "1 cup parsley",
      originalName: "parsley",
      amount: 1.0,
      unit: "cup",
      meta: [],
      measures: {
        us: {
          amount: 1.0,
          unitShort: "cup",
          unitLong: "cup",
        },
        metric: {
          amount: 60.0,
          unitShort: "g",
          unitLong: "grams",
        },
      },
    },
    {
      id: 2004,
      aisle: "Produce",
      image: "bay-leaves.jpg",
      consistency: "SOLID",
      name: "bay leaf",
      nameClean: "bay leaves",
      original: "1 bay leaf",
      originalName: "bay leaf",
      amount: 1.0,
      unit: "",
      meta: [],
      measures: {
        us: {
          amount: 1.0,
          unitShort: "",
          unitLong: "",
        },
        metric: {
          amount: 1.0,
          unitShort: "",
          unitLong: "",
        },
      },
    },
    {
      id: 4053,
      aisle: "Oil, Vinegar, Salad Dressing",
      image: "olive-oil.jpg",
      consistency: "LIQUID",
      name: "olive oil",
      nameClean: "olive oil",
      original: "1/2 cup olive oil",
      originalName: "olive oil",
      amount: 0.5,
      unit: "cup",
      meta: [],
      measures: {
        us: {
          amount: 0.5,
          unitShort: "cups",
          unitLong: "cups",
        },
        metric: {
          amount: 108.0,
          unitShort: "ml",
          unitLong: "milliliters",
        },
      },
    },
    {
      id: 93607,
      aisle: "Milk, Eggs, Other Dairy",
      image: "almond-milk.png",
      consistency: "LIQUID",
      name: "almond milk",
      nameClean: "almond milk",
      original: "1 cup almond milk, plain flavor",
      originalName: "almond milk, plain flavor",
      amount: 1.0,
      unit: "cup",
      meta: ["plain"],
      measures: {
        us: {
          amount: 1.0,
          unitShort: "cup",
          unitLong: "cup",
        },
        metric: {
          amount: 250.0,
          unitShort: "ml",
          unitLong: "milliliters",
        },
      },
    },
    {
      id: 1001009,
      aisle: "Cheese",
      image: "shredded-cheddar.jpg",
      consistency: "SOLID",
      name: "cheddar cheese",
      nameClean: "shredded cheddar cheese",
      original: "1 1/2 cups shredded cheddar cheese",
      originalName: "shredded cheddar cheese",
      amount: 1.5,
      unit: "cups",
      meta: ["shredded"],
      measures: {
        us: {
          amount: 1.5,
          unitShort: "cups",
          unitLong: "cups",
        },
        metric: {
          amount: 169.5,
          unitShort: "g",
          unitLong: "grams",
        },
      },
    },
  ],
  id: 646930,
  title: "Homemade Broccoli Cheddar Soup",
  readyInMinutes: 45,
  servings: 4,
  sourceUrl:
    "https://www.foodista.com/recipe/Y37ZMBWN/homemade-broccoli-cheddar-soup",
  image: "https://img.spoonacular.com/recipes/646930-556x370.jpg",
  imageType: "jpg",
  summary:
    'Homemade Broccoli Cheddar Soup could be just the <b>gluten free</b> recipe you\'ve been looking for. One serving contains <b>498 calories</b>, <b>22g of protein</b>, and <b>24g of fat</b>. For <b>$3.25 per serving</b>, this recipe <b>covers 35%</b> of your daily requirements of vitamins and minerals. This recipe serves 4. This recipe from Foodista requires almond milk, pepper, juice of lemon, and bay leaf. It will be a hit at your <b>Autumn</b> event. 17 people have tried and liked this recipe. It works best as a main course, and is done in roughly <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 90%</b>. This score is tremendous. Similar recipes are <a href="https://spoonacular.com/recipes/cheddar-broccoli-potato-soup-with-homemade-herb-croutons-835630">Cheddar Broccoli Potato Soup with Homemade Herb Croutons</a>, <a href="https://spoonacular.com/recipes/broccoli-cheddar-soup-484964">Broccoli Cheddar Soup</a>, and <a href="https://spoonacular.com/recipes/cheddar-broccoli-soup-1315375">Cheddar Broccoli Soup</a>.',
  cuisines: [],
  dishTypes: ["soup", "lunch", "main course", "main dish", "dinner"],
  diets: ["gluten free"],
  occasions: ["fall", "winter"],
  instructions:
    "In your soup pot, saute over med-high heat: 2 Tbsp of your olive oil with the shallot, onion and jalapeno. When cooked lightly, add in lemon juice, veggie broth, remaining oil, salt and pepper. Reduce heat to medium. Add Potatoes and bring broth to a boil. Cook until potatoes are tender.\nAdd chopped Broccoli (florets and steams). Remember to leave out a few florets for later use though.Cover with lid, when broccoli is tender, turn heat off.\nTransfer contents of pot into a large mixing bowl. Allow to cool slightly. Add to the bowl the fresh parsley, Chobani and almond milk. Fold new ingredients into the hot soup mixture.\nIn batches, puree the soup in a food-processor (maybe someday soon, a Vitamix!) style blender. Soup should be smooth-no lumps or chunks. In the soup pot, add the broccoli florets, a dash of veggie broth and saute covered for about a minute until tender. Add the pureed soup back into the soup pot. Add a bay leaf and a few pinches of chopped basil (optional). Simmer uncovered for at least twenty minutes to cook out all the air bubbles. Stir constantly for the first few minutes. Remove the bay leaf before serving or storing.",
  analyzedInstructions: [
    {
      name: "",
      steps: [
        {
          number: 1,
          step: "In your soup pot, saute over med-high heat: 2 Tbsp of your olive oil with the shallot, onion and jalapeno. When cooked lightly, add in lemon juice, veggie broth, remaining oil, salt and pepper. Reduce heat to medium.",
          ingredients: [
            {
              id: 1102047,
              name: "salt and pepper",
              localizedName: "salt and pepper",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/salt-and-pepper.jpg",
            },
            {
              id: 9152,
              name: "lemon juice",
              localizedName: "lemon juice",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/lemon-juice.jpg",
            },
            {
              id: 4053,
              name: "olive oil",
              localizedName: "olive oil",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg",
            },
            {
              id: 11979,
              name: "jalapeno pepper",
              localizedName: "jalapeno pepper",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/jalapeno-pepper.png",
            },
            {
              id: 11677,
              name: "shallot",
              localizedName: "shallot",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/shallots.jpg",
            },
            {
              id: 1006615,
              name: "broth",
              localizedName: "broth",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/chicken-broth.png",
            },
            {
              id: 11282,
              name: "onion",
              localizedName: "onion",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/brown-onion.png",
            },
            {
              id: 0,
              name: "soup",
              localizedName: "soup",
              image: "",
            },
            {
              id: 4582,
              name: "cooking oil",
              localizedName: "cooking oil",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/vegetable-oil.jpg",
            },
          ],
          equipment: [
            {
              id: 404752,
              name: "pot",
              localizedName: "pot",
              image:
                "https://spoonacular.com/cdn/equipment_100x100/stock-pot.jpg",
            },
          ],
        },
        {
          number: 2,
          step: "Add Potatoes and bring broth to a boil. Cook until potatoes are tender.",
          ingredients: [
            {
              id: 11352,
              name: "potato",
              localizedName: "potato",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/potatoes-yukon-gold.png",
            },
            {
              id: 1006615,
              name: "broth",
              localizedName: "broth",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/chicken-broth.png",
            },
          ],
          equipment: [],
        },
        {
          number: 3,
          step: "Add chopped Broccoli (florets and steams). Remember to leave out a few florets for later use though.Cover with lid, when broccoli is tender, turn heat off.",
          ingredients: [
            {
              id: 11090,
              name: "broccoli",
              localizedName: "broccoli",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/broccoli.jpg",
            },
          ],
          equipment: [],
        },
        {
          number: 4,
          step: "Transfer contents of pot into a large mixing bowl. Allow to cool slightly.",
          ingredients: [],
          equipment: [
            {
              id: 405907,
              name: "mixing bowl",
              localizedName: "mixing bowl",
              image:
                "https://spoonacular.com/cdn/equipment_100x100/mixing-bowl.jpg",
            },
            {
              id: 404752,
              name: "pot",
              localizedName: "pot",
              image:
                "https://spoonacular.com/cdn/equipment_100x100/stock-pot.jpg",
            },
          ],
        },
        {
          number: 5,
          step: "Add to the bowl the fresh parsley, Chobani and almond milk. Fold new ingredients into the hot soup mixture.",
          ingredients: [
            {
              id: 10511297,
              name: "fresh parsley",
              localizedName: "fresh parsley",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/parsley.jpg",
            },
            {
              id: 93607,
              name: "almond milk",
              localizedName: "almond milk",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/almond-milk.png",
            },
            {
              id: 0,
              name: "soup",
              localizedName: "soup",
              image: "",
            },
          ],
          equipment: [
            {
              id: 404783,
              name: "bowl",
              localizedName: "bowl",
              image: "https://spoonacular.com/cdn/equipment_100x100/bowl.jpg",
            },
          ],
        },
        {
          number: 6,
          step: "In batches, puree the soup in a food-processor (maybe someday soon, a Vitamix!) style blender. Soup should be smooth-no lumps or chunks. In the soup pot, add the broccoli florets, a dash of veggie broth and saute covered for about a minute until tender.",
          ingredients: [
            {
              id: 10011090,
              name: "broccoli florets",
              localizedName: "broccoli florets",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/broccoli.jpg",
            },
            {
              id: 1006615,
              name: "broth",
              localizedName: "broth",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/chicken-broth.png",
            },
            {
              id: 0,
              name: "soup",
              localizedName: "soup",
              image: "",
            },
          ],
          equipment: [
            {
              id: 404726,
              name: "blender",
              localizedName: "blender",
              image:
                "https://spoonacular.com/cdn/equipment_100x100/blender.png",
            },
            {
              id: 404752,
              name: "pot",
              localizedName: "pot",
              image:
                "https://spoonacular.com/cdn/equipment_100x100/stock-pot.jpg",
            },
          ],
        },
        {
          number: 7,
          step: "Add the pureed soup back into the soup pot.",
          ingredients: [
            {
              id: 0,
              name: "soup",
              localizedName: "soup",
              image: "",
            },
          ],
          equipment: [
            {
              id: 404752,
              name: "pot",
              localizedName: "pot",
              image:
                "https://spoonacular.com/cdn/equipment_100x100/stock-pot.jpg",
            },
          ],
        },
        {
          number: 8,
          step: "Add a bay leaf and a few pinches of chopped basil (optional). Simmer uncovered for at least twenty minutes to cook out all the air bubbles. Stir constantly for the first few minutes.",
          ingredients: [
            {
              id: 2004,
              name: "bay leaves",
              localizedName: "bay leaves",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/bay-leaves.jpg",
            },
            {
              id: 2044,
              name: "basil",
              localizedName: "basil",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/basil.jpg",
            },
          ],
          equipment: [],
          length: {
            number: 20,
            unit: "minutes",
          },
        },
        {
          number: 9,
          step: "Remove the bay leaf before serving or storing.",
          ingredients: [
            {
              id: 2004,
              name: "bay leaves",
              localizedName: "bay leaves",
              image:
                "https://spoonacular.com/cdn/ingredients_100x100/bay-leaves.jpg",
            },
          ],
          equipment: [],
        },
      ],
    },
  ],
  originalId: null,
  spoonacularScore: 93.776611328125,
  spoonacularSourceUrl:
    "https://spoonacular.com/homemade-broccoli-cheddar-soup-646930",
};

interface ExtraDataProps {
  data: number | string;
  icon: string;
  name: string;
}
[];

export default function RecipeDetailScreen({ navigation, route }: NavProps) {
  const theme = useTheme();

  const { id } = route.params;
  console.log(route.params);

  const [currentRecipe, setCurrentRecipe] = useState<any>(null);
  const [extraData, setExtraData] = useState<ExtraDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSpecificRecipe = async (id: number) => {
    // setCurrentRecipe(jsonDummyRecipe);
    try {
      await axios
        .get(`${API_BASE_URL}/${id}/information?apiKey=${API_KEY}`)
        .then((res) => setCurrentRecipe(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  const getDummySpecificRecipe = async () => {
    setCurrentRecipe(jsonDummyRecipe);
  };

  useEffect(() => {
    // getSpecificRecipe(id);
    getDummySpecificRecipe();

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

  const BackButton = () => (
    <IconButton
      style={{
        position: "absolute",
        zIndex: 1,
        left: 4,
      }}
      icon={"chevron-left"}
      mode="contained"
      containerColor={theme.colors.primaryContainer}
      iconColor={theme.colors.shadow}
      size={28}
      onPress={() => navigation.goBack()}
    />
  );

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
                        justifyContent: "center",
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
            <BackButton />
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
