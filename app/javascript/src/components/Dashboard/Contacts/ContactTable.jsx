import React, { useState } from "react";
import { Checkbox, Button, Tooltip, Avatar, Alert } from "neetoui";

import { DELETE_CONTACT_ALERT_MSG } from "./Constants";

export default function ContactTable({
  selectedContactIds,
  setSelectedContactIds,
  contacts = [],
}) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox nui-table--actions nui-table--hover">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedContactIds.length ===
                  contacts.map(contact => contact.id).length
                }
                onClick={() => {
                  const contactIds = contacts.map(contact => contact.id);
                  if (selectedContactIds.length === contactIds.length) {
                    setSelectedContactIds([]);
                  } else {
                    setSelectedContactIds(contactIds);
                  }
                }}
              />
            </th>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Department</th>
            <th className="text-left">Contact Number</th>
            <th className="text-left">Add to Basecamp</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>
                <Checkbox
                  checked={selectedContactIds.includes(contact.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedContactIds.indexOf(contact.id);

                    if (index > -1) {
                      setSelectedContactIds([
                        ...selectedContactIds.slice(0, index),
                        ...selectedContactIds.slice(index + 1),
                      ]);
                    } else {
                      setSelectedContactIds([
                        ...selectedContactIds,
                        contact.id,
                      ]);
                    }
                  }}
                />
              </td>
              <td>
                <div className="flex">
                  <Avatar
                    size={30}
                    contact={{ name: contact.name }}
                    className="mr-2"
                  />
                  {contact.name}
                </div>
              </td>
              <td>{contact.email}</td>
              <td>{contact.department}</td>
              <td>{contact.contactNumber}</td>
              <td>
                <Checkbox checked={contact.addToBasecamp} />
              </td>
              <td>
                <div className="flex flex-row space-x-4 items-center">
                  <Tooltip content="Edit">
                    <Button style="icon" icon="ri-pencil-line" />
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Button
                      style="icon"
                      icon="ri-delete-bin-line"
                      onClick={() => {
                        setShowDeleteAlert(true);
                      }}
                    />
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Alert
        isOpen={showDeleteAlert}
        title="Delete Contact"
        message={DELETE_CONTACT_ALERT_MSG}
        onClose={() => {
          setShowDeleteAlert(false);
        }}
        hideConfirmation={true}
      />
    </div>
  );
}
