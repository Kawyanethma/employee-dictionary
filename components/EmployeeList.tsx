import * as schema from "@/db/schema";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

import { useEffect, useState } from "react";

import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { SectionList, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type sectionListDataType = {
  title: string;
  data: {
    id: number;
    emp_id: string;
    name: string;
    age: number;
    dateOfBirth: string;
  }[];
};

type EmployeeListProps = {
  style?: CssProps;
  search: string;
};

export function EmployeeList({ search, style }: EmployeeListProps) {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  useDrizzleStudio(db);
  const [sectionListData, setSectionListData] = useState<sectionListDataType[]>(
    []
  );
  const { data } = useLiveQuery(
    drizzleDb.query.employees.findMany({
      where: (employees, { like }) => like(employees.name, `%${search}%`),
      orderBy: (employees, { desc }) => desc(employees.id),
      limit: 10,
    }),
    [search]
  );

  useEffect(() => {
    if (data && data.length !== 0) {
      setSectionListData(
        data
          .reduce((acc: sectionListDataType[], item) => {
            const firstLetter = item.name.charAt(0).toUpperCase();
            const section = acc.find((sec) => sec.title === firstLetter);
            if (section) {
              section.data.push(item);
            } else {
              acc.push({ title: firstLetter, data: [item] });
            }
            return acc;
          }, [])
          .sort((a, b) => a.title.localeCompare(b.title))
      );
    }
  }, [data]);


  return (
    <SectionList
      sections={sectionListData}
      style={[{ paddingHorizontal: 25 }, style]}
      renderSectionHeader={({ section: { title } }) => (
        <ThemedView
          onStartShouldSetResponder={() => true}
          lightColor="#f2f2f2"
          darkColor="#010101"
          style={styles.sectionHeader}
        >
          <ThemedText type="subtitle">{title}</ThemedText>
        </ThemedView>
      )}
      keyExtractor={(item, index) => item.id.toString() || index.toString()}
      ListEmptyComponent={() => (
        <ThemedView
          onStartShouldSetResponder={() => true}
          lightColor="#f2f2f2"
          darkColor="#010101"
          style={styles.sectionHeader}
        >
          <ThemedText type="subtitle">No employees found</ThemedText>
        </ThemedView>
      )}
      stickySectionHeadersEnabled={true}
      renderItem={({ item }) => (
        <View onStartShouldSetResponder={() => true} style={styles.item}>
          <ThemedText style={{ fontSize: 18 }}>{item.name}</ThemedText>
          <ThemedText>
            Age: {item.age}, Date of Birth: {item.dateOfBirth}
          </ThemedText>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  item: {
    paddingVertical: 10,
    backgroundColor: "#975a5aff",
  },
});
