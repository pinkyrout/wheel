import React, { useState } from "react";
import { Modal } from "neetoui";
import notesApi from "apis/notes";

export default function DeleteAlert({
  refetch,
  onClose,
  selectedNoteIds,
  message,
  onDeleteSucess,
}) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await notesApi.destroy({ ids: selectedNoteIds });
      onClose();
      refetch();
      onDeleteSucess();
    } catch (error) {
      logger.error(error);
    } finally {
      setDeleting(false);
    }
  };

  const count = selectedNoteIds.length;
  return (
    <Modal
      isOpen
      size="small"
      autoHeight
      showFooter
      submitButtonProps={{
        style: "danger",
        label: "Delete",
        loading: deleting,
        onClick: handleDelete,
      }}
      onClose={onClose}
    >
      <div className="flex">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-100 rounded-full">
          <i className="text-red-500 ri-alarm-warning-fill ri-lg"></i>
        </div>

        <div className="ml-4">
          <h3 className="mb-2 text-lg font-medium text-gray-700">
            {count === 1 ? "Delete Note" : `Delete ${count} notes ?`}
          </h3>
          <div className="text-sm leading-5 text-gray-500">{message}</div>
        </div>
      </div>
    </Modal>
  );
}
