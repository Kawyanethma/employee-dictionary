import { employees } from "@/db/schema";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const addDummyData = async (db: ExpoSQLiteDatabase) => {
  const initDB = await AsyncStorage.getItem("initDB");
  if (initDB) {
    return;
  }

  const employeesData = [
    {
      emp_id: "emp_1231",
      name: "John Doe",
      age: 30,
      dateOfBirth: "1993-01-01",
    },
    {
      emp_id: "emp_1232",
      name: "Jane Smith",
      age: 25,
      dateOfBirth: "1998-05-15",
    },
    {
      emp_id: "emp_1233",
      name: "Bob Johnson",
      age: 35,
      dateOfBirth: "1988-12-31",
    },
    {
      emp_id: "emp_1234",
      name: "Alice Brown",
      age: 28,
      dateOfBirth: "1995-07-20",
    },
    {
      emp_id: "emp_1235",
      name: "David Lee",
      age: 33,
      dateOfBirth: "1989-09-05",
    },
    {
      emp_id: "emp_1236",
      name: "Charlie White",
      age: 32,
      dateOfBirth: "1990-03-10",
    },
    {
      emp_id: "emp_1237",
      name: "Emily Green",
      age: 29,
      dateOfBirth: "1994-11-25",
    },
    {
      emp_id: "emp_1238",
      name: "Michael Black",
      age: 31,
      dateOfBirth: "1992-02-14",
    },
    {
      emp_id: "emp_1239",
      name: "Sarah Blue",
      age: 27,
      dateOfBirth: "1996-08-30",
    },
    {
      emp_id: "emp_1240",
      name: "Chris Yellow",
      age: 34,
      dateOfBirth: "1989-04-18",
    }
  ];

  for (const employee of employeesData) {
    try {
      await db.insert(employees).values(employee);
      console.log("Employee added successfully:", employee);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  }

  await AsyncStorage.setItem("initDB", "true");
};
