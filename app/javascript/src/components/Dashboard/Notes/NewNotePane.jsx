import React from "react";
import { Pane } from "neetoui";
import NewNoteForm from "./NewNoteForm";

export default function NewNotePane({ showPane, setShowPane }) {
  const onClose = () => setShowPane(false);
  return (
    <Pane title="Create a New Note" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <NewNoteForm onClose={onClose} />
      </div>
    </Pane>
  );
}
