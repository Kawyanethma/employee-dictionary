import { FormTextInput } from "@/components/EmployeeForm/FormTextInput";
import { ThemedText } from "@/components/ThemedText";
import * as schema from "@/db/schema";
import { employeeFormSchema } from "@/utils/createEmpSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { CustomButton } from "@/components/CustomButton";
import { CalenderDialog } from "@/components/EmployeeForm/CalenderDialog";
import { useSnackBar } from "@/hooks/useSnackBar";
import DBServices from "@/services/db.services";
import dayjs from "dayjs";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { DateType } from "react-native-ui-datepicker";
import { FormData } from "./addEmployee";

export default function EmployeePreview() {
  const calenderRef = useRef<TextInput>(null);
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [selected, setSelected] = useState<DateType | null>(null);
  const [editable, setEditable] = useState(false);
  const [age, setAge] = useState<number | null>(null);
  const { employee } = useLocalSearchParams();
  const [canSave, setCanSave] = useState(false);
  const parsedEmployee =  JSON.parse(decodeURIComponent(employee as string));

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const { showSnackBar } = useSnackBar();

  const {
    control,
    getValues,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(employeeFormSchema),
    defaultValues: {
      emp_id: parsedEmployee.emp_id,
      name: parsedEmployee.name,
      age: parsedEmployee.age,
      dateOfBirth: parsedEmployee.dateOfBirth,
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      console.log("Form Value Changed:", value);

      if (
        value.dateOfBirth !== parsedEmployee.dateOfBirth ||
        value.age !== parsedEmployee.age ||
        value.name !== parsedEmployee.name
      ) {
        setCanSave(true);
      } else {
        setCanSave(false);
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  const onSubmit = async (data: FormData) => {
    try {
      await DBServices.getInstance().updateEmployee(
        drizzleDb,
        parsedEmployee.id,
        parsedEmployee.emp_id,
        {
          name: data.name,
          age: getValues("age"),
          dateOfBirth: getValues("dateOfBirth"),
        }
      );
      showSnackBar("Employee updated successfully!");
      router.back();
    } catch (error) {
      showSnackBar(`Check Employee ID or ${error}`);
    }
  };

  const deleteEmployee = async () => {
    try {
      await DBServices.getInstance().deleteEmployee(
        drizzleDb,
        parsedEmployee.id,
        parsedEmployee.emp_id
      );
      showSnackBar("Employee deleted successfully!");
      router.back();
    } catch (error) {
      showSnackBar(`Error deleting employee: ${error}`);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={{ padding: 20 }}>
          <ThemedText type="subtitle" style={{ marginBottom: 20 }}>
            Employee ID :{" "}
            <Text style={{ textTransform: "uppercase" }}>
              {parsedEmployee.emp_id}
            </Text>
          </ThemedText>

          <ThemedText>Name</ThemedText>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <FormTextInput
                disabled={!editable}
                placeholder="Enter Name"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors.name && (
            <Text style={{ color: "red" }}>{errors.name.message}</Text>
          )}
          <ThemedText>Date of Birth (YYYY-MM-DD)</ThemedText>
          <Controller
            control={control}
            disabled
            name="dateOfBirth"
            render={({ field: { onChange, value } }) => (
              <FormTextInput
                ref={calenderRef}
                disabled={!editable}
                placeholder="Select Date of Birth"
                value={
                  !selected && value
                    ? value
                    : dayjs(selected).format("YYYY-MM-DD")
                }
                showSoftInputOnFocus={false}
                onFocus={() => {
                  setShowDialog(true);
                  if (!selected && !value) {
                    setSelected(dayjs().subtract(18, "year").toDate());
                  }
                  if (value) {
                    setSelected(dayjs(value).toDate());
                  }
                }}
              />
            )}
          />
          {errors.dateOfBirth && (
            <Text style={{ color: "red" }}>{errors.dateOfBirth.message}</Text>
          )}
          <ThemedText>Age</ThemedText>
          <Controller
            control={control}
            disabled
            name="age"
            render={({ field: { onChange, value } }) => (
              <FormTextInput
                disabled={!editable}
                placeholder="Age"
                value={
                  age === null && value ? value.toString() : age?.toString()
                }
                showSoftInputOnFocus={false}
                keyboardType="numeric"
              />
            )}
          />
          {errors.age && (
            <Text style={{ color: "red" }}>{errors.age.message}</Text>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <CustomButton
              title={editable ? "Save Changes" : "Edit Employee"}
              disabled={!canSave && editable}
              onPress={() => {
                if (editable) {
                  handleSubmit(onSubmit)();
                } else {
                  setEditable(true);
                }
              }}
            />
            <CustomButton title={"Delete Employee"} onPress={deleteEmployee}  deleteButton/>
          </View>
          <CalenderDialog
            showDialog={showDialog}
            selected={selected}
            setSelected={setSelected}
            setValue={setValue}
            setAge={setAge}
            handleClose={() => {
              setShowDialog(false);
              calenderRef.current?.blur();
            }}
          />
          <ThemedText style={styles.textCaption}>
            You can not edit the employee age its auto calculated based on the
            date of birth.
          </ThemedText>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight ?? 0,
  },
  textCaption: {
    marginTop: 20,
    fontSize: 14,
    fontStyle: "italic",
  },
});
