import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Input from "../../components/Input/Input";
import IconButton from "../../components/IconButton/IconButton";
import { COLORS, TEXT_PRIMARY_COLOR } from "../../constants/Constants";
import FabButton from "../../components/FabButton/FabButton";
import ColorPicker from "../../components/ColorPicker/ColorPicker";

interface Props {
  navigation: any;
  route: any;
}

interface NoteProps {
  title: string;
  content: string;
  color: string;
  id: string;
}

export default function NoteFormModal({ navigation, route }: Props) {
  const [note, setNote] = useState<NoteProps>({
    title: route.params?.title || "",
    content: route.params?.content || "",
    color: route.params?.color || COLORS[0],
    id: route.params?.id || null,
  });

  const goBack = () => {
    navigation.goBack();
  };

  const handleTextChange = (fieldId: string, newValue: string) => {
    setNote((prevNote) => ({
      ...prevNote,
      [fieldId]: newValue,
    }));
  };

  useEffect(() => {
    if (note.id) {
      route.params?.updateNote(note.id, note);
    }
  }, [note]);

  const empyNoteAlert = () =>
    Alert.alert(
      "Nota vacia",
      "No es posible agregar notas sin titulo o contenido",
      [{ text: "Entendido" }]
    );

  const deleteNoteAlert = (titleNote: string, idNote: string) => {
    Alert.alert(
      `Eliminar "${titleNote}"`,
      "Esta nota se eliminará permanentemente. ",
      [
        { text: "Cancelar" },
        {
          text: "Eliminar nota",
          onPress: () => {
            route.params?.deleteNote(idNote);
            goBack();
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar backgroundColor={note.color} />
        <View style={[styles.noteContainer, { backgroundColor: note.color }]}>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: 8,
            }}
          >
            {route.params.deleteNote && (
              <IconButton
                iconName={"trash-2"}
                onPress={() => {
                  deleteNoteAlert(note.title, note.id);
                }}
              />
            )}
            <IconButton iconName={"x"} onPress={goBack} />
          </View>
          <Input
            fontSize={24}
            value={note.title}
            keyboardType="default"
            onChangeText={handleTextChange}
            fontFamily="RobotoBold"
            textColor={TEXT_PRIMARY_COLOR}
            placeholder="Título"
            id="title"
          />
          <ScrollView>
            <Input
              fontSize={20}
              value={note.content}
              keyboardType="default"
              onChangeText={handleTextChange}
              fontFamily="RobotoRegular"
              multiline
              textColor={TEXT_PRIMARY_COLOR}
              placeholder="Escribe tu nota..."
              id="content"
            />
          </ScrollView>
          <ColorPicker
            value={note.color}
            onChangeText={handleTextChange}
            id="color"
          />
          {route.params?.newNote && (
            <View
              style={{
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <FabButton
                iconName={"save"}
                onPress={() => {
                  if (note.title != "" || note.content != "") {
                    route.params?.newNote(note);
                    navigation.goBack();
                  } else {
                    empyNoteAlert();
                  }
                }}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noteContainer: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
