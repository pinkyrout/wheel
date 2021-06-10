import * as yup from "yup";

export const DELETE_CONTACT_ALERT_MSG =
  "Are you sure you want to delete the contact ? All of your data will be permanently removed from our database forever. This action cannot be undone.";
export const CONTACT_FORM_INITIAL_VALUES = {
  name: "",
  contactNumber: null,
  department: "",
  email: "",
  addToBasecamp: false,
};
export const DEPARTMENTS = [
  { label: "Engineering", value: "Engineering" },
  { label: "Electronics", value: "Electronics" },
  { label: "Biology", value: "Biology" },
  { label: "Mechanical", value: "Mechanical" },
];

export const contactFormValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  contactNumber: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .required("Contact Number is required"),
});
