import * as yup from "yup";

export const DELETE_NOTE_MSG =
  "Are you sure you want to delete the note ? All of your data will be permanently removed from our database forever. This action cannot be undone.";
export const DELETE_MULTIPLE_NOTES_MSG =
  "Are you sure you want to continue? This cannot be undone.";
export const NOTE_TAGS = [
  { label: "E Learning", value: "e learning" },
  { label: "Tutorial", value: "tutorial" },
  { label: "Internal", value: "internal" },
  { label: "External", value: "external" },
  { label: "Miscellaneous", value: "miscellaneous" },
];
export const NOTE_FORM_INITIAL_VALUES = {
  title: "",
  description: "",
  tag: "",
  contact: null,
  addDueDate: false,
  dueDate: "",
};
export const noteFormValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});
