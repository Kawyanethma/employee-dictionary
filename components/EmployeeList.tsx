import * as schema from "@/db/schema";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

import { useEffect, useState } from "react";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

interface sectionListDataType {
  title: string;
  data: {
    id: number;
    emp_id: string;
    name: string;
    age: number;
    dateOfBirth: string;
  }[];
}

type EmployeeListProps = {
  style?: CssProps;
  search: string;
};

export function EmployeeList({ search, style }: EmployeeListProps) {
  const [sectionListData, setSectionListData] = useState<sectionListDataType[]>(
    []
  );
  const router = useRouter();
  const backgroundColor = useThemeColor({}, "mainColor");
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  useDrizzleStudio(db);

  const { data } = useLiveQuery(
    drizzleDb.query.employees.findMany({
      where: (employees, { like }) => like(employees.name, `%${search}%`),
      orderBy: (employees, { desc }) => desc(employees.id),
      limit: 10,
    }),
    [search]
  );

  useEffect(() => {
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
  }, [data]);

  const renderItem = ({
    item,
  }: {
    item: sectionListDataType["data"][number];
  }) => (
    <View
      onStartShouldSetResponder={() => true}
      style={[styles.item, { backgroundColor }]}
    >
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/home/[employee]",
            params: { employee: encodeURIComponent(JSON.stringify(item)) },
          })
        }
      >
        <ThemedText style={styles.itemText}>{item.name}</ThemedText>
        <View style={{ flexDirection: "row", gap: 30 }}>
          <ThemedText style={styles.itemText}>Age: {item.age}</ThemedText>
          <ThemedText style={styles.itemText}>
            DOB: {item.dateOfBirth}
          </ThemedText>
        </View>
        <ThemedText style={styles.itemText}>
          Employee ID :{" "}
          <Text style={{ textTransform: "uppercase" }}>{item.emp_id}</Text>
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: sectionListDataType;
  }) => (
    <ThemedView
      onStartShouldSetResponder={() => true}
      lightColor="#f2f2f2"
      darkColor="#010101"
      style={styles.sectionHeader}
    >
      <ThemedText type="defaultSemiBold">{title}</ThemedText>
    </ThemedView>
  );

  const renderEmptyComponent = () => (
    <ThemedView
      onStartShouldSetResponder={() => true}
      lightColor="#f2f2f2"
      darkColor="#010101"
      style={styles.sectionHeader}
    >
      <ThemedText type="subtitle">No employees found</ThemedText>
    </ThemedView>
  );

  return (
    <>
      <ThemedText
        type="defaultSemiBold"
        style={{ marginLeft: 25, marginVertical: 5 }}
      >
        New Employees (Last 10)
      </ThemedText>
      <SectionList
        sections={sectionListData}
        style={[{ paddingHorizontal: 25 }, style]}
        renderSectionHeader={({ section }) => renderSectionHeader({ section })}
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        ListEmptyComponent={renderEmptyComponent}
        stickySectionHeadersEnabled={true}
        renderItem={({ item }) => renderItem({ item })}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  item: {
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
