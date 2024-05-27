// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   FlatList,
//   Modal,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Input from "../../components/Input/Input";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import NoteItem from "../../components/NoteItem/NoteItem";
// import { PRIMARY_COLOR } from "../../Constants/Constants";
// import { Feather } from "@expo/vector-icons";
// import FabButton from "../../components/FabButton/FabButton";
// interface Props {
//   navigation: any;
//   route: any;
// }

// interface SelectedDocumentProps {
//   key: string;
//   document: string;
// }

// export default function StorageScreen({ navigation, route }: Props) {
//   const [keyFile, setKeyFile] = useState("");
//   const [fileContent, setFileContent] = useState("");
//   const [realoadDocList, setRealoadDocList] = useState(false);
//   const [docsList, setDocsList] = useState<string[]>([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedDoc, setSelectedDoc] = useState<SelectedDocumentProps>({
//     key: "",
//     document: "",
//   });

//   useEffect(() => {
//     navigation.setOptions({ title: route.params.title });
//     getAllDocs();

//     // AsyncStorage.clear();
//   }, []);

//   useEffect(() => {
//     docsList.length !== 0 && getMultiple();
//   }, [docsList]);

//   const getMultiple = async () => {
//     let values;
//     try {
//       values = await AsyncStorage.multiGet(docsList);
//     } catch (e) {
//       // read error
//     }
//     console.log("MULTI", values);

//     // example console.log output:
//     // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
//   };

//   const storeDocument = async (key: string, document: string) => {
//     if (key != "") {
//       try {
//         await AsyncStorage.setItem(key, JSON.stringify(document));
//         addDoc(key);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setKeyFile("");
//         setFileContent("");
//       }
//     }
//   };

//   const retrieveDocument = async (key: string) => {
//     try {
//       const document = await AsyncStorage.getItem(key);
//       if (document !== null) {
//         return document;
//       } else {
//         return "";
//       }
//     } catch (error) {
//       console.error(error);
//       return "";
//     }
//   };

//   const addDoc = (newItem: string) => {
//     setDocsList((prevDocs) => [...prevDocs, newItem]);
//   };

//   const showDoc = async (key: string) => {
//     try {
//       let document: string = JSON.parse(await retrieveDocument(key));
//       setSelectedDoc({ key, document });
//       setModalVisible((prev) => !prev);
//     } catch (error) {}
//   };

//   const getAllDocs = async () => {
//     try {
//       let res = await AsyncStorage.getAllKeys();
//       setDocsList([...res]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const NewNote = () => {
//     return (
//       <View style={styles.formCard}>
//         <Input
//           label="Nombre del archivo"
//           value={keyFile}
//           onChangeText={setKeyFile}
//         />
//         <Input
//           label="Contenido del archivo"
//           value={fileContent}
//           onChangeText={setFileContent}
//           multiline
//         />
//         <Button
//           title="Guardar documento"
//           onPress={() => storeDocument(keyFile, fileContent)}
//         />
//         <Button
//           title="Close"
//           onPress={() => setModalVisible((prev) => !prev)}
//         />
//       </View>
//     );
//   };

//   const toggleModal = () => {
//     setModalVisible((prev) => !prev);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <Text>
//           Almacenamiento de algún documento, para propósitos de esta prueba se
//           puede tratar de una cadena extensa, en algún tipo de almacenamiento
//           local.
//         </Text>
//       </View>

//       <FlatList
//         style={{ width: "100%" }}
//         data={docsList}
//         keyExtractor={(item) => item}
//         numColumns={2}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => showDoc(item)}>
//             <NoteItem name={item} body={item} />
//           </TouchableOpacity>
//         )}
//       />
//       <FabButton iconName={"plus"} onPress={toggleModal} />
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         // onRequestClose={() => {
//         //   Alert.alert('Modal has been closed.');
//         //   setModalVisible(!modalVisible);
//         // }}
//       >
//         <NewNote />
//         {/* <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>{selectedDoc.key}</Text>
//             <Text style={styles.modalText}>{selectedDoc.document}</Text>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>X</Text>
//             </Pressable>
//           </View>
//         </View> */}
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 8,
//   },
//   formCard: {
//     width: "100%",
//     height: "auto",
//     backgroundColor: "#FFF",
//     padding: 16,
//     borderRadius: 16,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   newNoteFAB: {
//     width: 48,
//     height: 48,
//     backgroundColor: PRIMARY_COLOR,
//     borderRadius: 50,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     bottom: 16,
//     right: 16,
//   },
// });
