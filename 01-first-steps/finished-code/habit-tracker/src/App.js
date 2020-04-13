import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./App.css";

const HABITS_QUERY = gql`
  query HABITS_QUERY {
    habits {
      id
      description
      points
      entries {
        id
        notes
        date
        completed
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(HABITS_QUERY);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Ruh roh! {error.message}</p>;
  }

  return (
    <>
      <h2>Habits</h2>
      <ul>
        {data.habits.map((habit) => {
          return (
            <li key={habit.id}>
              {`${habit.description} (${habit.points} points)`}
              <ul>
                {habit.entries &&
                  habit.entries.map((entry) => {
                    const date = new Date(entry.date).toLocaleDateString();
                    const completed = entry.completed ? "✅" : "😑";
                    return (
                      <li
                        key={entry.id}
                      >{`${date}: ${entry.notes} (${completed})`}</li>
                    );
                  })}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
