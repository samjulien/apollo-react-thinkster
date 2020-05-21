import { gql } from "@apollo/client";

export const HABIT_FIELDS = gql`
  fragment HabitFields on Habit {
    id
    description
    points
  }
`;

export const ENTRY_FIELDS = gql`
  fragment EntryFields on Entry {
    id
    habitId
    notes
    date
    completed
  }
`;
