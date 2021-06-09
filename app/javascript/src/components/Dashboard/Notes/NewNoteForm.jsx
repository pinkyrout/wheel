import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Input, Textarea, Select, Switch } from "neetoui/formik";
import { Button, DateInput } from "neetoui";
import notesApi from "apis/notes";

import { NOTE_TAGS } from "./constants";

export default function NewNoteForm({ onClose, refetch }) {
  const [dueDate, setDueDate] = useState(null);

  const handleSubmit = async values => {
      try {
        await notesApi.create(values);
        refetch();
        onClose();
      } catch (err) {
        logger.error(err);
      }
    },
    handleDueDateChange = selectedDate => {
      setDueDate(selectedDate);
    },
    contactsList = [
      { label: "Mohan Singh", value: 1 },
      { label: "Rohan Singh", value: 2 },
      { label: "Sunil Kumar", value: 3 },
      { label: "Mamta Verma", value: 4 },
    ];

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        tag: "",
        contact: null,
        add_due_date: false,
        due_date: dueDate,
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
      })}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <Input label="Title" name="title" className="mb-4" />
          <Select
            name="tag"
            label="Tags"
            placeholder="Select a Tag"
            options={NOTE_TAGS}
            className="mb-4"
          />
          <Textarea
            label="Description"
            name="description"
            rows={4}
            className="mb-6"
          />
          <Select
            name="contact"
            label="Assigned Contact"
            placeholder="Select a Contact"
            options={contactsList}
            className="mb-6"
          />
          <Switch
            name="add_due_date"
            label="Add Due Date to Note"
            className="mb-4"
          />
          {values.add_due_date && (
            <DateInput
              label="Due Date"
              placeholder="Select a Date"
              value={dueDate}
              onChange={handleDueDateChange}
            />
          )}
          <div className="nui-pane__footer nui-pane__footer--absolute">
            <Button
              onClick={onClose}
              label="Cancel"
              size="large"
              style="secondary"
            />

            <Button
              type="submit"
              label="Submit"
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
