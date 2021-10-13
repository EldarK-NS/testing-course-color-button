import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCamelWithSpaces } from "./App";

test("button has correct initial color", () => {
  render(<App />);
  //find an element with a role of button and text of 'Change to Midnight Blue'
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //expect the bc color to be Medium Violet Red
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // click button
  fireEvent.click(colorButton);

  //expect the bc color to be Midnight Blue
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  // expect the button text to be 'Change to MediumVioletRed'
  expect(colorButton.toHaveTextContent).toBe("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);

  //check that the button starts out enabled
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorButton).toBeEnabled();
  //check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("checkbox disables on first click and enables on second click", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

// при тестировании события, нужно провести тестирование всех действий по порядку тоесть, 1.тестирование кнопка красная-чекбокс-кнопка серая -чекбокс-кнопка синяя
//2. тестирование кнопка красная -клик по кнопке-кнопка синяя-чекбокс-кнопка серая-чекбокс-кнопка синяя
//! тестирование схоже с порядком действий реального пользователя

test("button change color to grey if checkbox checked", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  fireEvent.click(colorButton);
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

//Medium Violet MediumVioletRed
//Midnight Blue

describe("spaces before camel-case capital letters", () => {
  test("works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("work for one inner capital letter1", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("work for one inner capital letter2", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
