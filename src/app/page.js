// Add the "use client" directive at the top of the file
"use client";

import React, { useState } from "react";


const InputChips = ({ items }) => {
  const initialValue = "";
  
  const [value, setValue] = useState(initialValue);
  const [chips, setChips] = useState([]);

  // to filter the items based on the input value
  const filterItems = (value) => {
    return items.filter(
      (item) =>
        item.toLowerCase().includes(value.toLowerCase()) && !chips.includes(item)
    );
  };

  // to add a chip and clear the input value
  const addChip = (chip) => {
    setChips((prevChips) => [...prevChips, chip]);
    setValue("");
  };

  // to remove a chip and add it back to the items
  const removeChip = (chip) => {
    setChips((prevChips) => prevChips.filter((c) => c !== chip));
  };

  // logic -> if input is blank remove previous chip otherwise remove one character from current value
  const handleBackspace = () => {
    if (value === "") {
      setChips((prevChips) => prevChips.slice(0, -1));
    } else {
      setValue((prevValue) => prevValue.slice(0, -1));
    }
  };


  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // A function to handle the key press for backspace and enter
  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      handleBackspace();
    } else if (e.key === "Enter") {
      if (filterItems(value).length > 0) {
        addChip(filterItems(value)[0]);
      }
    }
  };

  return (
    <div className="max-w-3xl">
      <label
        htmlFor="chips-input"
        className="chips-input border-b-4 border-blue-500 p-2 flex flex-wrap gap-2 items-center"
      >
        {chips.map((chip) => (
          <div
            className="chip inline-flex items-center bg-gray-200 pl-3 pr-1 py-1 rounded-full"
            key={chip}
          >
            {chip}
            <span
              className="close ml-1 cursor-pointer hover:bg-gray-300 hover:shadow-lg rounded-full px-2.5 py-1 "
              onClick={() => removeChip(chip)}
            >
              X
            </span>
          </div>
        ))}
        <div className="input-list relative z-10">
          <input
            type="text"
            id="chips-input"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type something..."
            className="w-full h-8 border-0 focus:outline-none"
          />
            <div className="list absolute top-full left-0 w-full max-h-44 pl-1.5  pr-2 py-3 bg-white overflow-y-auto border border-gray-300 rounded-md shadow-md">
            {filterItems(value).map((item) => (
              <div
                className="item p-2 hover:bg-gray-200 cursor-pointer"
                key={item}
                onClick={() => addChip(item)}
                tabIndex="0"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </label>

    </div>
  );
};

// A sample list for testing
const items = [
  "Nick Giannopoulos",
  "Mary Coustas",
  "George Kapiniaris",
  "Effie Stephanidis",
  "Alex Dimitriades",
  "Vince Colosimo",
  "Claudia Karvan",
  "Abi Tucker",
  "Deborah Mailman",
  "Ryan Corr",
];


// The main component
const Home = () => {
  return (
    <div className="p-20">
      <center><h1 className="text-3xl font-bold text-blue-500">Pick Users</h1> 
      <InputChips items={items} /></center>  
    </div>
  );
};

export default Home;
