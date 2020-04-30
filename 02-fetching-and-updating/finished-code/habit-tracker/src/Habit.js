import React from "react";
import { useMutation, gql } from "@apollo/client";
import { HABITS_QUERY } from "./App";

const DELETE_HABIT = gql`
  mutation DELETE_HABIT($id: ID!) {
    deleteHabit(id: $id) {
      success
    }
  }
`;

function Habit({ habit }) {
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
      {`${habit.description} (${habit.points} points)`}
      <button
        type="button"
        onClick={() => deleteHabit({ variables: { id: habit.id } })}
        disabled={loading}
      >
        Delete
      </button>
      <ul>
        {habit.entries &&
          habit.entries.map((entry) => {
            const date = new Date(entry.date).toLocaleDateString();
            const completed = entry.completed ? "✅" : "😑";
            return (
              <li key={entry.id}>{`${date}: ${entry.notes} ${completed}`}</li>
            );
          })}
      </ul>
    </li>
  );
}

export default Habit;
