import React from "react";
import { Formik, Form } from "formik";
import { Input, Switch, Select } from "neetoui/formik";
import { Button } from "neetoui";
import {
  CONTACT_FORM_INITIAL_VALUES,
  DEPARTMENTS,
  contactFormValidationSchema as validationSchema,
} from "./Constants.js";

export default function NewContactForm({ onClose }) {
  return (
    <Formik
      initialValues={CONTACT_FORM_INITIAL_VALUES}
      onSubmit={() => {}}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <Input label="Name" name="name" />
          <Input label="Email" name="email" />
          <Input label="Contact Number" name="contactNumber" />
          <Select
            label="Department"
            name="department"
            placeholder="Select a Department"
            options={DEPARTMENTS}
          />
          <Switch label="Add to Basecamp" name="addToBasecamp" />
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
