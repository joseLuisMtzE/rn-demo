import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FabButton from "../../components/FabButton/FabButton";
import NoteItem from "../../components/NoteItem/NoteItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

interface Props {
  navigation: any;
  route: any;
}

const randomColor = () => {
  const colors = ["#CFE7C4", "#F7BFD1", "#C9CBE7", "#ABDFE7", "#EBC7DF"];
  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
};

interface NotesProps {
  title: string;
  content: string;
  color: string;
  id: string;
}
[];

export default function StorageScreen({ navigation, route }: Props) {
  const [notes, setNotes] = useState<NotesProps[]>([]);
  const [noteKeys, setNoteKeys] = useState<string[]>([]);

  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
    getAllDocs();
  }, []);

  useEffect(() => {
    noteKeys.length > 0 && getAllNotes();
  }, [noteKeys]);

  const getAllDocs = async () => {
    try {
      await AsyncStorage.getAllKeys().then((keys) => setNoteKeys([...keys]));
    } catch (error) {
      console.error(error);
    }
  };

  const newNote = async (note: Object) => {
    try {
      let id = uuid.v4().toString();
      await AsyncStorage.setItem(id, JSON.stringify({ ...note, id })).then(
        () => {
          getAllDocs();
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const updateNote = async (id: string, note: Object) => {
    try {
      await AsyncStorage.setItem(id, JSON.stringify(note)).then(() =>
        getAllNotes()
      );
    } catch (error) {
      console.error("Error storing note:", error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await AsyncStorage.removeItem(id).then(() => getAllNotes());
    } catch (error) {}
  };

  const getAllNotes = async () => {
    try {
      await AsyncStorage.multiGet(noteKeys).then((data) => {
        let arr: NotesProps[] = [];
        for (const [key, value] of data) {
          if (value) {
            let itemValue = JSON.parse(value);
            arr.push(itemValue);
          }
        }
        setNotes(arr);
      });
    } catch (e) {}
  };

  const EmptyListComponent = () => (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        height: "auto",
        paddingTop: 30,
        justifyContent: "center",
      }}
    >
      <Text style={{ opacity: 0.3 }}>Sin notas</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>Mis Notas</Text>
        <View style={styles.notesList}>
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item: { title, content, color, id } }) => {
              return (
                <NoteItem
                  title={title}
                  content={content}
                  color={color}
                  id={id}
                  onDelete={deleteNote}
                  onPress={() => {
                    navigation.navigate("NoteForm", {
                      title,
                      content,
                      color,
                      id,
                      updateNote: updateNote,
                      deleteNote: deleteNote,
                    });
                  }}
                />
              );
            }}
            ListEmptyComponent={EmptyListComponent}
            style={{
              height: "94%",
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 16,
            }}
          />
        </View>
        <FabButton
          iconName={"plus"}
          onPress={() =>
            navigation.navigate("NoteForm", {
              newNote: newNote,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  titleText: {
    fontSize: 32,
    fontFamily: "RobotoBold",
  },
  notesList: {
    gap: 8,
    marginVertical: 8,
  },
});
