import React from "react";
import { render } from "@testing-library/react";
import Answers from "./Answers";

describe("<Answers>", () => {
  it("No renders any Answer", () => {
    const { container } = render(<Answers answers={[]} />);
    const answersDisplayed = container.getElementsByClassName("answer");

    expect(answersDisplayed.length).toBe(0);
  });

  it("Renders one Answer", () => {
    const answer1 = {
      answer: "12345678",
      highlight: [1, 3],
    };

    const { container } = render(<Answers answers={[answer1]} />);
    const answersDisplayed = container.getElementsByClassName("answer");

    expect(answersDisplayed.length).toBe(1);
    expect(answersDisplayed[0].textContent).toBe("12345678");
  });

  it("Renders multiple Answers", () => {
    const answer1 = {
      answer: "12345678",
      highlight: [1, 3],
    };

    const answer2 = {
      answer: "20195678",
      highlight: [],
    };

    const { container } = render(<Answers answers={[answer1, answer2]} />);
    const answersDisplayed = container.getElementsByClassName("answer");

    expect(answersDisplayed.length).toBe(2);
    expect(answersDisplayed[0].textContent).toBe("12345678");
    expect(answersDisplayed[1].textContent).toBe("20195678");
  });
});
