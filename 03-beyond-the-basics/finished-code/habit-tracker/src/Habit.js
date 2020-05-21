import React, { useState } from "react";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import { HABITS_QUERY } from "./App";
import EditHabit from "./EditHabit";
import Entry from "./Entry";
import AddEntry from "./AddEntry";
import { ENTRY_FIELDS } from "./helpers/fragments";

const DELETE_HABIT = gql`
  mutation DELETE_HABIT($id: ID!) {
    deleteHabit(id: $id) {
      success
    }
  }
`;

export const ENTRIES_QUERY = gql`
  query ENTRIES_QUERY($id: ID!) {
    getEntriesByHabitId(id: $id) {
      ...EntryFields
    }
  }
  ${ENTRY_FIELDS}
`;

function Habit({ habit }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddEntryForm, setShowAddEntryForm] = useState(false);
  const [deleteHabit, { error, loading }] = useMutation(DELETE_HABIT);
  const [loadEntries, { data: entriesData }] = useLazyQuery(ENTRIES_QUERY);

  const entries =
    entriesData && entriesData.getEntriesByHabitId
      ? entriesData.getEntriesByHabitId
      : [];

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
            onClick={() => {
              const habitIdToDelete = habit.id;
              deleteHabit({
                variables: { id: habitIdToDelete },
                update: (cache, { data }) => {
                  const { habits } = cache.readQuery({ query: HABITS_QUERY });
                  cache.writeQuery({
                    query: HABITS_QUERY,
                    data: {
                      habits: habits.filter(
                        (habit) => habit.id !== habitIdToDelete
                      ),
                    },
                  });
                },
              });
            }}
            disabled={loading}
          >
            Delete
          </button>
          <button
            type="button"
            class="blue-button"
            onClick={() => loadEntries({ variables: { id: habit.id } })}
          >
            Entries
          </button>
        </>
      ) : (
        <EditHabit habit={habit} onEditSuccess={() => setShowEditForm(false)} />
      )}
      {entries.length > 0 && (
        <ul>
          {entries.map((entry) => {
            const lastEntry = entries.indexOf(entry) === entries.length - 1;
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
      {entries.length === 0 && !showAddEntryForm && (
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
