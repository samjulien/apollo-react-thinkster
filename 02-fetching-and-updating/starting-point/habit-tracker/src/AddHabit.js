import React, { useRef, useState } from "react";

function AddHabit() {
  const [description, setDescription] = useState(null);
  const descriptionInput = useRef(null);

  const handleChange = () => {
    const { value } = descriptionInput.current;
    setDescription(value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && description) {
      addHabit(e);
    }
  };

  const addHabit = (e) => {
    e.preventDefault();
    // TODO: Add Mutation
    descriptionInput.current.value = "";
    setDescription("");
  };

  return (
    <>
      <input
        type="text"
        placeholder="What are you gonna do?"
        name="description"
        ref={descriptionInput}
        onChange={handleChange}
        onKeyDown={onEnterPress}
      />
      <button type="button" disabled={!description} onClick={addHabit}>
        Add
      </button>
    </>
  );
}

export default AddHabit;
