import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from './color';
const STORAGE_KEY = "@toDos";
const WORKING = "@working";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  useEffect(() => {
    console.log("working", working);
    loadToDos()
  }, [working]);

  const work = async () => {
    setWorking(true);
    await AsyncStorage.setItem(WORKING, JSON.stringify(true));
  };
  const travel = async () => {
    setWorking(false);
    await AsyncStorage.setItem(WORKING, JSON.stringify(false));
  };
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    const w = await AsyncStorage.getItem(WORKING);
    setToDos(JSON.parse(s));
    setWorking(JSON.parse(w));
    console.log("loadToDo", JSON.parse(w));
  };
  const addToDo = async () => {
    if (text === "") return // 공백이면 아무 일도 일어나지 않음
    // const newToDos = Object.assign({}, toDos, { [Date.now()]: { text, work: working } })
    const newToDos = { ...toDos, [Date.now()]: { text, working, completed: false } }
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" }, {
        text: "I'm Sure", style: "destructive",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
  };
  // const modifyToDo = (key) => {

  // }
  const completeToDo = async (key) => {
    if (!toDos[key].completed) {
      const newToDos = { ...toDos };
      newToDos[key].completed = true;
      setToDos(newToDos);
      await saveToDos(newToDos);
    }
    else {
      const newToDos = { ...toDos };
      newToDos[key].completed = false;
      setToDos(newToDos);
      await saveToDos(newToDos);
    }
    console.log(toDos[key].completed);
  }
  console.log(toDos);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnText, color: working ? "white" : theme.grey }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: !working ? "white" : theme.grey }}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        value={text}
        returnKeyType="done"
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        style={styles.input} />
      <ScrollView>
        {
          Object.keys(toDos).map((key) => (
            toDos[key].working === working ? (
              <View style={styles.toDo} key={key}>
                <View style={styles.flexStart}>
                  <TouchableOpacity style={{ marginRight: 20 }} onPress={() => completeToDo(key)}>
                    {
                      !toDos[key].completed
                        ? (<MaterialCommunityIcons name="checkbox-blank-outline" size={18} color={theme.grey} />)
                        : (<MaterialCommunityIcons name="checkbox-marked-outline" size={18} color={theme.grey} />)
                    }
                  </TouchableOpacity>
                  <Text style={styles.toDoText}>{toDos[key].text}</Text>
                </View>

                <View style={styles.flexEnd}>
                  <TouchableOpacity style={{ marginRight: 20 }} onPress={() => modifyToDo(key)}>
                    <Foundation name="pencil" size={18} color={theme.grey} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteToDo(key)}>
                    <Fontisto name="trash" size={18} color={theme.grey} />
                  </TouchableOpacity>
                </View>
              </View>)
              : null
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  flexStart: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  flexEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
