import React, { useRef, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import DatePicker from "react-date-picker";
import { HABITS_QUERY } from "./App";
import Error from "./Error";
import { useEscFn } from "./helpers/useEscFn";

const CREATE_ENTRY_MUTATION = gql`
  mutation CREATE_ENTRY_MUTATION($input: NewEntryInput) {
    createEntry(input: $input) {
      id
      habitId
      notes
      date
      completed
    }
  }
`;

function AddEntry({ show, habitId, onAddEntrySuccess }) {
  const [notes, setNotes] = useState(null);
  const [date, setDate] = useState();
  const [completed, setCompleted] = useState(false);
  const notesInput = useRef(null);
  const [createEntry, { error, loading }] = useMutation(CREATE_ENTRY_MUTATION, {
    refetchQueries: [{ query: HABITS_QUERY }],
  });

  const resetAndEmit = () => {
    setDate(null);
    setCompleted(false);
    onAddEntrySuccess();
  };

  useEscFn(resetAndEmit);

  const handleNotesChange = () => {
    const { value } = notesInput.current;
    setNotes(value);
  };

  const handleDateChange = (dateFromPicker) => {
    setDate(dateFromPicker);
  };

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  const addEntry = (e) => {
    e.preventDefault();
    const input = { habitId, date, notes, completed };
    createEntry({ variables: { input } });
    notesInput.current.value = "";
    setDate(null);
    setCompleted(false);
    setNotes("");
  };

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={addEntry} style={{ marginLeft: "-5px" }}>
      <DatePicker
        type="date"
        name="date"
        value={date}
        onChange={handleDateChange}
      />
      <input
        type="text"
        placeholder="Entry notes"
        name="notes"
        ref={notesInput}
        style={{ marginLeft: "5px", width: "100px" }}
        onChange={handleNotesChange}
      />
      <button type="button" className="emoji-button" onClick={toggleCompleted}>
        {completed ? "✅" : "😑"}
      </button>
      <button
        type="button"
        className="red-button"
        onClick={resetAndEmit}
        disabled={loading}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="blue-button"
        disabled={!notes || !date || loading}
      >
        Add{loading ? "ing..." : ""}
      </button>
      {error && <Error error={error} />}
    </form>
  );
}

export default AddEntry;
