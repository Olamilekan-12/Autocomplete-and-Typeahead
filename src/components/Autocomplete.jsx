import React, { useCallback, useEffect, useState } from "react";
import Suggestionlist from "./Suggestionlist";
import debounce from "lodash/debounce";

const Autocomplete = ({
  staticData,
  fetchSuggestion,
  placeholder = "",
  customLoading = "Loading",
  onSelect = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onChange = () => {},
  customStyles = {},
  dataKey = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(suggestions);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestion) {
        result = await fetchSuggestion(query);
      }
      setSuggestions(result);
    } catch (error) {
      setError("Failed to fetch suggestion");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : suggestion);
    onSelect(suggestion);
    setSuggestions([]);
  };

  const getSuggestionDebounce = useCallback(debounce(getSuggestions, 300), []);

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionDebounce(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <div className="container">
      <input
        type="text"
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        value={inputValue}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestions-list">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <Suggestionlist
            dataKey={dataKey}
            highlight={inputValue}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
