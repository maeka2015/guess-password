import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SubmitAnswer from "./SubmitAnswer";

describe("<SubmitAnswers>", () => {
  it("Should display answer", () => {
    const answer = "12345678";
    const mockSetAnswer = jest.fn();
    const mockOnSubmitAnswer = jest.fn();

    const { queryByPlaceholderText } = render(
      <SubmitAnswer
        answer={answer}
        setAnswer={mockSetAnswer}
        onSubmitAnswer={mockOnSubmitAnswer}
      />
    );

    expect(queryByPlaceholderText("type here").value).toBe("12345678");
  });

  it("Should call callback OnSubmitAnswer", () => {
    const answer = "12345678";
    const mockSetAnswer = jest.fn();
    const mockOnSubmitAnswer = jest.fn();

    const { getByRole, queryByPlaceholderText } = render(
      <SubmitAnswer
        answer={answer}
        setAnswer={mockSetAnswer}
        onSubmitAnswer={mockOnSubmitAnswer}
      />
    );

    userEvent.type(queryByPlaceholderText("type here"), "12345678");
    userEvent.click(getByRole("button"));

    expect(mockOnSubmitAnswer).toHaveBeenCalled();
  });
});
