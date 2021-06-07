import React from "react";
import { Checkbox, Badge, Avatar, Button, Tooltip } from "neetoui";

import "./note.scss";

export default function NoteTable({
  selectedNoteIds,
  setSelectedNoteIds,
  notes = [],
}) {
  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox">
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
            <th className="text-left w-2">Description</th>
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
                <div className="flex flex-row items-center justify-start text-gray-900">
                  <a href={null}>{note.title}</a>
                </div>
              </td>
              <td>
                <div className="fixed-width-col">{note.description}</div>
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
                <div className="flex flex-row space-x-4 items-center hover-button-wrapper">
                  <Tooltip content="Edit">
                    <Button style="icon" icon="ri-pencil-line" />
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Button style="icon" icon="ri-delete-bin-line" />
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
