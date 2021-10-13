import React, { useState } from "react";
import "./App.css";

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const [disabled, setDisabled] = useState(false);
  const newButtonColor =
    buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  return (
    <div>
      <button
        style={{
          backgroundColor: disabled ? "gray" : buttonColor,
          color: "white",
        }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
        Change to {replaceCamelWithSpaces(newButtonColor)}
      </button>
      <br />
      <input
        type='checkbox'
        onChange={(e) => setDisabled(e.target.checked)}
        id='disable-button-checkbox'
        defaultChecked={disabled}
        aria-checked={disabled}
      />
      <label htmlFor='disable-button-checkbox'>Disable button</label>
    </div>
  );
}

export default App;
