import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import {
  Button,
  FlatList,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import * as schema from "@/db/schema";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import {  useSQLiteContext } from "expo-sqlite";

import { useState } from "react";

import Feather from "@expo/vector-icons/Feather";
import { useThemeColor } from "@/hooks/useThemeColor";
import DBServices from "@/services/db.services";



export default function HomeScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  useDrizzleStudio(db);


  const backgroundColor = useThemeColor({}, "mainColor");
  const textColor = useThemeColor({}, "text");

  const [search, setSearch] = useState<string>("");

  const { data } = useLiveQuery(
    drizzleDb.query.employees.findMany({
      where: (employees, { like }) => like(employees.name, `%${search}%`),
      orderBy: (employees, { asc }) => asc(employees.name),
      limit: 10,
    }),
    [search]
  );

  const addTestEmployee = () => {
    DBServices.getInstance().addEmployee(drizzleDb, {
      name: "Test Employee",
      age: 30,
      dateOfBirth: "1993-01-01",
      emp_id: `emp_1232`,
    });
  };

  const delteTestEmployee = () => {
    DBServices.getInstance().deleteEmployee(drizzleDb, 1, "emp_1232");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.inputContainer, { backgroundColor }]}>
          <TextInput
            style={[styles.textInput, { backgroundColor, color: textColor }]}
            placeholder="Search"
            placeholderTextColor={textColor}
            value={search}
            onChangeText={setSearch}
          />
          <Feather name="search" size={25} color={textColor} />
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            >
              <ThemedText style={{ fontSize: 18 }}>{item.name}</ThemedText>
              <ThemedText>
                Age: {item.age}, Date of Birth: {item.dateOfBirth}
              </ThemedText>
            </View>
          )}
        />
       <Button title="Add Test Employee" onPress={addTestEmployee} />
        <Button title="Delete Test Employee" onPress={delteTestEmployee} />
   
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: StatusBar.currentHeight ?? 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 6,
    paddingHorizontal: 16,
    marginVertical: 15,
  },
  textInput: {
    height: 55,
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
});
