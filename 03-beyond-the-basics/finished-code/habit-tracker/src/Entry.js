import React from "react";
import { useMutation, gql } from "@apollo/client";
import { ENTRIES_QUERY } from "./Habit";

const DELETE_ENTRY = gql`
  mutation DELETE_ENTRY($id: ID!) {
    deleteEntry(id: $id) {
      success
    }
  }
`;

export default function Entry({ entry, lastEntry, showEntryForm }) {
  const [deleteEntry, { error, loading }] = useMutation(DELETE_ENTRY, {
    refetchQueries: [
      { query: ENTRIES_QUERY, variables: { id: entry.habitId } },
    ],
    awaitRefetchQueries: true,
  });
  const date = new Date(entry.date).toLocaleDateString();
  const completed = entry.completed ? "✅" : "😑";

  return (
    <li
      key={entry.id}
      style={{ margin: "5px 0", color: error ? "red" : "black" }}
    >
      {error && (
        <>
          <span role="img" aria-label="warn emoji">
            ⚠️
          </span>{" "}
        </>
      )}
      {`${date}: ${entry.notes} ${completed}`}
      <button
        type="button"
        className="emoji-button"
        alt="Delete entry"
        disabled={loading}
        onClick={() => deleteEntry({ variables: { id: entry.id } })}
      >
        <span role="img" aria-label="trash can">
          🗑
        </span>
      </button>
      {lastEntry && (
        <button
          type="button"
          className="emoji-button"
          alt="Add new entry"
          onClick={showEntryForm}
        >
          <span role="img" aria-label="plus">
            ➕
          </span>
        </button>
      )}
    </li>
  );
}
