import { employees } from "@/db/schema";
import { eq } from "drizzle-orm";
import {  ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import * as schema from "@/db/schema";
export default class DBServices {
  static instance: DBServices;

  private constructor() {}

  static getInstance(): DBServices {
    if (!DBServices.instance) {
      DBServices.instance = new DBServices();
    }
    return DBServices.instance;
  }

  async addEmployee(
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLiteDatabase;
    },
    employee: { name: string; age: number; dateOfBirth: string; emp_id: string }
  ) {
    try {
      await db.insert(employees).values(employee);
      console.log("Employee added successfully:", employee);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  }

  async deleteEmployee(
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLiteDatabase;
    },
    id: number,
    emp_id: string
  ) {
    try {
      await db
        .delete(employees)
        .where(eq(employees.id, id) && eq(employees.emp_id, emp_id));
      console.log("Employee deleted successfully with id:", id);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }

  async updateEmployee(
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLiteDatabase;
    },
    id: number,
    emp_id: string,
    employee: { name: string; age: number; dateOfBirth: string }
  ) {
    try {
      await db
        .update(employees)
        .set(employee)
        .where(eq(employees.id, id) && eq(employees.emp_id, emp_id));
      console.log("Employee updated successfully with id:", id);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  }

  async getEmployeeById(
    db: ExpoSQLiteDatabase<typeof schema> & {
      $client: SQLiteDatabase;
    },
    id: number
  ) {
    try {
      const employee = await db.query.employees.findFirst({
        where: eq(employees.id, id),
      });
      return employee;
    } catch (error) {
      console.error("Error fetching employee by id:", error);
      return null;
    }
  }
}
