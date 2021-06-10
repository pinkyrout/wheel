import React, { useState } from "react";
import { Checkbox, Badge, Avatar, Button, Tooltip, Toastr } from "neetoui";

import DeleteAlert from "./DeleteAlert";
import { DELETE_NOTE_MSG } from "./Constants";

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
  fetchNotes,
}) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  const handleDeleteAlert = noteId => {
    setCurrentNoteId(noteId);
    setShowDeleteAlert(true);
  };

  const onDeleteSucess = () => {
    setShowDeleteAlert(false);
    Toastr.success("Note deleted successfully.");
  };

  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox nui-table--actions">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={
                  selectedNoteIds.length === notes.map(note => note.id).length
                }
                onClick={() => {
                  const noteIds = notes.map(note => note.id);
                  if (selectedNoteIds.length === noteIds.length) {
                    setSelectedNoteIds([]);
                  } else {
                    setSelectedNoteIds(noteIds);
                  }
                }}
              />
            </th>
            <th className="text-left">Title</th>
            <th className="text-left">Description</th>
            <th className="text-left">Tags</th>
            <th className="text-left">Created Date</th>
            <th className="text-left">Due Date</th>
            <th className="text-left">Contact</th>
            <th className="text-left"></th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr
              key={note.id}
              className={"cursor-pointer bg-white hover:bg-gray-50"}
            >
              <td>
                <Checkbox
                  checked={selectedNoteIds.includes(note.id)}
                  onClick={event => {
                    event.stopPropagation();
                    const index = selectedNoteIds.indexOf(note.id);

                    if (index > -1) {
                      setSelectedNoteIds([
                        ...selectedNoteIds.slice(0, index),
                        ...selectedNoteIds.slice(index + 1),
                      ]);
                    } else {
                      setSelectedNoteIds([...selectedNoteIds, note.id]);
                    }
                  }}
                />
              </td>
              <td>
                <Button style="link" label={note.title} />
              </td>
              <td>
                <div className="truncate w-32">{note.description}</div>
              </td>
              <td>
                <Badge color={note.tag.color}>{note.tag.text}</Badge>
              </td>
              <td>{note.createdDate}</td>
              <td>{note.dueDate || "--"}</td>
              <td>
                <Avatar size={36} contact={{ name: note.contact }} />
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
                      onClick={handleDeleteAlert}
                    />
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteAlert && (
        <DeleteAlert
          selectedNoteIds={[currentNoteId]}
          onClose={() => setShowDeleteAlert(false)}
          refetch={fetchNotes}
          message={DELETE_NOTE_MSG}
          onDeleteSucess={onDeleteSucess}
        />
      )}
    </div>
  );
}
