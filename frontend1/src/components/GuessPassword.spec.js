import React from "react";
import userEvent from "@testing-library/user-event";
import { render, waitFor } from "@testing-library/react";
import GuessPassword from "./GuessPassword";
import GuessPasswordService from "../services/GuessPasswordService"
import sinon from "sinon";

const expectedHint = '01234567';
const expectedAnswer = '12345678';

describe("<GuessPassword>", () => {
  let createNewPasswordMock;
  let verifyPasswordMock;

  afterEach(() => {
    createNewPasswordMock.restore();
    verifyPasswordMock.restore();
  })

  beforeEach(() => {
    createNewPasswordMock = sinon
        .stub(GuessPasswordService, 'createNewPassword')
        .returns(Promise.resolve({ data: { hint: expectedHint }}));

    verifyPasswordMock = sinon
        .stub(GuessPasswordService, 'verifyPassword')
        .returns(Promise.resolve({ data: {
          correct: true,
          hint: expectedHint,
          answer: expectedAnswer,
          highlight: expectedAnswer.split('')
        }}));    
  })
  
  it("Renders Hint from api", async () => {
    const { getByText } = render(<GuessPassword />);
    const hint = await waitFor(() => getByText(expectedHint));

    expect(hint).toBeInTheDocument();
  })

  it("Submits an answer", async () => {
    const { getByText, queryByPlaceholderText, getByRole, container, debug } = render(<GuessPassword />);
    const hint = await waitFor(() => getByText(expectedHint));

    userEvent.type(queryByPlaceholderText("type here"), "12345678");
    userEvent.click(getByRole("button"));

    await waitFor(() => {
      const answersDisplayed = container.getElementsByClassName("answer");
      expect(answersDisplayed.length).toBe(1);
    });
  })
})