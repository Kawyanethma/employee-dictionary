import { FormData } from "@/app/home/addEmployee";
import dayjs from "dayjs";
import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Button, Dialog, Portal } from "react-native-paper";
import DateTimePicker, {
    DateType,
    useDefaultStyles,
} from "react-native-ui-datepicker";

interface CalenderDialogProps {
  showDialog: boolean;
  selected: DateType;
  setSelected: (date: DateType) => void;
  setValue: UseFormSetValue<FormData>;
  setAge: (age: number) => void;
  handleClose: () => void;
}

export function CalenderDialog({
  showDialog,
  selected,
  setSelected,
  setValue,
  setAge,
  handleClose,
}: CalenderDialogProps) {
  const defaultStyles = useDefaultStyles();
  const [disable, setDisable] = useState(true);

  return (
    <Portal>
      <Dialog
        visible={showDialog}
        onDismiss={() => {
          setDisable(true);
          handleClose();
        }}
        style={{ paddingHorizontal: 10 }}
      >
        <Dialog.Title>Select Date of Birth</Dialog.Title>
        <DateTimePicker
          mode="single"
          date={selected}
          maxDate={dayjs().subtract(18, "year").toDate()}
          onChange={({ date }) => {
            setSelected(date);
            const dob = dayjs(date).format("YYYY-MM-DD");
            const birthDate = dayjs(dob);
            const currentDate = dayjs();
            const calculatedAge = currentDate.diff(birthDate, "year");
            setAge(calculatedAge);
            setValue("dateOfBirth", dob); // Update form value
            setValue("age", calculatedAge); // Update age in form
            setDisable(false);
          }}
          styles={defaultStyles}
        />
        <Dialog.Actions>
          <Button
            disabled={disable}
            onPress={() => {
              setDisable(true);
              handleClose();
            }}
          >
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
