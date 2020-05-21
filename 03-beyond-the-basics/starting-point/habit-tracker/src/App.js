import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./App.css";
import Loading from "./Loading";
import Error from "./Error";
import Habit from "./Habit";
import AddHabit from "./AddHabit";

export const HABITS_QUERY = gql`
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

    totalPoints {
      points
      totalCompletedEntries
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(HABITS_QUERY);

  if (loading) {
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Error error={error} />
      </div>
    );
  }

  const { habits, totalPoints } = data;
  const entryString =
    totalPoints.totalCompletedEntries > 1 ||
    totalPoints.totalCompletedEntries === 0
      ? "entries"
      : "entry";

  return (
    <div className="container">
      <div>
        <h2 className="bottom-margin">
          Habits{" "}
          <span role="img" aria-label="muscle emoji">
            💪
          </span>
        </h2>
        <p>
          {`Total Points: ${totalPoints.points} (${totalPoints.totalCompletedEntries} competed ${entryString})`}
        </p>
        <AddHabit />
      </div>
      <ul className="habit-list">
        {habits.map((habit) => {
          return <Habit key={habit.id} habit={habit} />;
        })}
      </ul>
    </div>
  );
}

export default App;
