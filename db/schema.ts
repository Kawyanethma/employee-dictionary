import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const employees = sqliteTable("employees", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  emp_id: text("emp_id").unique().notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
});
