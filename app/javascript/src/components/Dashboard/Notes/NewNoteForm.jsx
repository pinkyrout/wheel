import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Input, Textarea, Select, Switch } from "neetoui/formik";
import { Button, DateInput, Collapse, Toastr } from "neetoui";

import { contactsList } from "./SampleData";
import {
  NOTE_TAGS,
  NOTE_FORM_INITIAL_VALUES,
  noteFormValidationSchema as validationSchema,
} from "./Constants";

export default function NewNoteForm({ onClose }) {
  const [dueDate, setDueDate] = useState(null);

  const handleDueDateChange = selectedDate => {
    setDueDate(selectedDate);
  };

  const createNote = () => {
    Toastr.success("New Note added successfully.");
    onClose();
  };

  return (
    <Formik
      initialValues={NOTE_FORM_INITIAL_VALUES}
      onSubmit={createNote}
      validationSchema={validationSchema}
    >
      {({ values, isSubmitting }) => (
        <Form className="space-y-4">
          <Input label="Title" name="title" />
          <Select
            name="tag"
            label="Tags"
            placeholder="Select a Tag"
            options={NOTE_TAGS}
          />
          <Textarea label="Description" name="description" rows={4} />
          <Select
            name="contact"
            label="Assigned Contact"
            placeholder="Select a Contact"
            options={contactsList}
          />
          <Switch name="addDueDate" label="Add Due Date to Note" />
          <Collapse open={values.addDueDate}>
            <DateInput
              label="Due Date"
              placeholder="Select a Date"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          </Collapse>
          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />

            <Button
              type="submit"
              label="Save Changes"
              size="large"
              style="primary"
              className="ml-2"
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
