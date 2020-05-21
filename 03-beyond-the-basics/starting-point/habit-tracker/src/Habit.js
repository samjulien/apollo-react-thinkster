import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { HABITS_QUERY } from "./App";
import EditHabit from "./EditHabit";
import Entry from "./Entry";
import AddEntry from "./AddEntry";

const DELETE_HABIT = gql`
  mutation DELETE_HABIT($id: ID!) {
    deleteHabit(id: $id) {
      success
    }
  }
`;

function Habit({ habit }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddEntryForm, setShowAddEntryForm] = useState(false);
  const [deleteHabit, { error, loading }] = useMutation(DELETE_HABIT, {
    refetchQueries: [{ query: HABITS_QUERY }],
    awaitRefetchQueries: true,
  });

  return (
    <li style={{ color: error ? "red" : "black" }}>
      {error && (
        <>
          <span role="img" aria-label="warn emoji">
            ⚠️
          </span>{" "}
        </>
      )}
      {!showEditForm ? (
        <>
          {habit.description} ({habit.points} points)
          <button
            className="emoji-button"
            type="button"
            onClick={() => setShowEditForm(true)}
            alt="Edit habit"
          >
            <span role="img" aria-label="pencil emoji">
              ✏️
            </span>
          </button>
          <button
            type="button"
            className="blue-button"
            onClick={() => deleteHabit({ variables: { id: habit.id } })}
            disabled={loading}
          >
            Delete
          </button>
        </>
      ) : (
        <EditHabit habit={habit} onEditSuccess={() => setShowEditForm(false)} />
      )}
      {habit.entries.length > 0 && (
        <ul>
          {habit.entries.map((entry) => {
            const lastEntry =
              habit.entries.indexOf(entry) === habit.entries.length - 1;
            return (
              <Entry
                key={entry.id}
                entry={entry}
                lastEntry={lastEntry}
                showEntryForm={() => setShowAddEntryForm(true)}
              />
            );
          })}
        </ul>
      )}
      {habit.entries.length === 0 && !showAddEntryForm && (
        <button
          type="button"
          className="blue-button"
          style={{ display: "block" }}
          onClick={() => setShowAddEntryForm(true)}
        >
          Add Entry
        </button>
      )}
      <AddEntry
        show={showAddEntryForm}
        habitId={habit.id}
        onAddEntrySuccess={() => setShowAddEntryForm(false)}
      />
    </li>
  );
}

export default Habit;
