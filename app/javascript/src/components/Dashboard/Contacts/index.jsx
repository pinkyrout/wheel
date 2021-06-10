import React, { useState, useEffect } from "react";
import contactsApi from "apis/contacts";
import { Button, PageLoader, Alert } from "neetoui";
import { Header, SubHeader } from "neetoui/layouts";

import ContactTable from "./ContactTable";
import NewContactPane from "./NewContactPane";
import { sampleContacts } from "./SampleData";
import { DELETE_CONTACT_ALERT_MSG } from "./Constants";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [showNewContactPane, setShowNewContactPane] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      await contactsApi.fetch();
      setContacts(sampleContacts);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sortProps = {
    options: [
      {
        value: "name",
        label: "Name",
      },
      {
        value: "department",
        label: "Department",
      },
    ],
    onClick: () => {},
  };

  const paginationProps = {
    count: 50,
    pageSize: 10,
    pageNo: 1,
    navigate: () => {},
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Contacts"
        actionBlock={
          <Button
            onClick={() => setShowNewContactPane(true)}
            label="New Contact"
            icon="ri-add-line"
          />
        }
      />
      <>
        <SubHeader
          showMenu={() => {}}
          searchProps={{
            value: searchTerm,
            onChange: e => setSearchTerm(e.target.value),
            clear: () => setSearchTerm(""),
          }}
          deleteButtonProps={{
            onClick: () => setShowDeleteAlert(true),
            disabled: !selectedContactIds.length,
          }}
          sortProps={sortProps}
          paginationProps={paginationProps}
          toggleFilter={() => {}}
        />
        <ContactTable
          selectedContactIds={selectedContactIds}
          setSelectedContactIds={setSelectedContactIds}
          contacts={contacts}
        />
        <NewContactPane
          showPane={showNewContactPane}
          setShowPane={setShowNewContactPane}
        />
        <Alert
          isOpen={showDeleteAlert}
          title="Delete Contacts"
          message={DELETE_CONTACT_ALERT_MSG}
          onClose={() => {
            setShowDeleteAlert(false);
          }}
          hideConfirmation={true}
        />
      </>
    </>
  );
};

export default Contacts;
