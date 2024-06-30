import React from "react";
import Autocomplete from "./components/Autocomplete";

const App = () => {
  const staticData = [
    "apple",
    "banana",
    "orange",
    "mango",
    "pineapple",
    "strawberry",
    "berry",
    "melon",
    "peach",
    "plum",
    "grape",
    "cherry",
  ];

  const fetchSuggestion = async (query) => {
    //return results
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result.recipes;
  };

  return (
    <div>
      <h1>Autocomplete / Type ahead</h1>
      <Autocomplete
        placeholder={"Enter recipe"}
        //staticData={staticData}
        fetchSuggestion={fetchSuggestion}
        dataKey={"name"}
        customLoading={<>Loading Recipes...</>}
        onSelect={(res) => console.log(res)}
        onChange={(input) => {}}
        onBlur={() => {}}
        onFocus={() => {}}
        customStyles={{}}
      />
    </div>
  );
};

export default App;
