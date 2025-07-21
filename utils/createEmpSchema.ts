import * as yup from "yup";

export const employeeFormSchema = yup.object({
    emp_id: yup.string().required("Employee ID is required").matches(
        /^emp_\d+$/,
        "Employee ID must start with 'emp_' followed by digits"
    ),
    age: yup.number().required("Age is required").min(0, "Age must be a positive number"),
    name: yup.string().required("Name is required"),
    dateOfBirth: yup
        .string()
        .required("Date of Birth is required")
        .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            "Date of Birth must be in the format YYYY-MM-DD"
        ),
});
