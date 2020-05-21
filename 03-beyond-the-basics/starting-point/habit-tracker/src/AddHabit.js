import React, { useRef, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { HABITS_QUERY } from "./App";
import Error from "./Error";

const CREATE_HABIT_MUTATION = gql`
  mutation CREATE_HABIT_MUTATION($input: NewHabitInput) {
    createHabit(input: $input) {
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

function AddHabit() {
  const [description, setDescription] = useState(null);
  const descriptionInput = useRef(null);
  const [createHabit, { error, loading }] = useMutation(CREATE_HABIT_MUTATION, {
    refetchQueries: [{ query: HABITS_QUERY }],
  });

  const handleChange = () => {
    const { value } = descriptionInput.current;
    setDescription(value);
  };

  const addHabit = (e) => {
    e.preventDefault();
    const input = { description };
    createHabit({ variables: { input } });
    descriptionInput.current.value = "";
    setDescription("");
  };

  return (
    <form onSubmit={addHabit}>
      <input
        type="text"
        placeholder="What are you gonna do?"
        name="description"
        style={{ width: "200px" }}
        ref={descriptionInput}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="blue-button"
        disabled={!description || loading}
      >
        Add{loading ? "ing..." : ""}
      </button>
      {error && <Error error={error} />}
    </form>
  );
}

export default AddHabit;
