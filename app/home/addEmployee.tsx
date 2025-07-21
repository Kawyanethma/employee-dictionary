import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  StatusBar,
} from "react-native";
import dayjs from "dayjs";
import { DateType } from "react-native-ui-datepicker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeFormSchema } from "@/utils/createEmpSchema";
import { ThemedText } from "@/components/ThemedText";
import { useRef, useState } from "react";

import { FormTextInput } from "@/components/EmployeeForm/FormTextInput";
import { CalenderDialog } from "@/components/EmployeeForm/CalenderDialog";
import { CustomButton } from "@/components/CustomButton";
import DBServices from "@/services/db.services";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { useSnackBar } from "@/hooks/useSnackBar";
import { useRouter } from "expo-router";

export interface FormData {
  emp_id: string;
  name: string;
  age: number;
  dateOfBirth: string;
}
export default function AddEmployeeLayout() {
  const calenderRef = useRef<TextInput>(null);
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [selected, setSelected] = useState<DateType | null>(null);
  const [age, setAge] = useState<number | null>(null);

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const { showSnackBar } = useSnackBar();

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(employeeFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await DBServices.getInstance().addEmployee(drizzleDb, {
        emp_id: data.emp_id,
        name: data.name,
        age: getValues("age"),
        dateOfBirth: getValues("dateOfBirth"),
      });
      showSnackBar("Employee added successfully!");
      router.back();
    } catch (error) {
      showSnackBar(`Check Employee ID or ${error}`);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20 }}>
        <ThemedText>Employee ID</ThemedText>
        <Controller
          control={control}
          name="emp_id"
          render={({ field: { onChange, value } }) => (
            <FormTextInput
              placeholder="Enter Employee ID"
              value={value?.toLowerCase()}
              onChange={onChange}
            />
          )}
        />
        {errors.emp_id && (
          <Text style={{ color: "red" }}>{errors.emp_id.message}</Text>
        )}

        <ThemedText>Name</ThemedText>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <FormTextInput
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
          render={() => (
            <FormTextInput
              ref={calenderRef}
              placeholder="Select Date of Birth"
              value={selected ? dayjs(selected).format("YYYY-MM-DD") : ""}
              onChange={() => {}}
              showSoftInputOnFocus={false}
              onFocus={() => {
                setShowDialog(true);
                if (!selected) {
                  setSelected(dayjs().subtract(18, "year").toDate());
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
          render={() => (
            <FormTextInput
              placeholder="Age"
              value={age !== null ? age.toString() : ""}
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
          }}
        >
          <CustomButton title="Add Employee" onPress={handleSubmit(onSubmit)} />
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
    fontStyle: "italic"
  },
});
