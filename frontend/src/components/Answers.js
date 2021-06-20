import React from "react";

function Answers({ answers }) {

  return answers.map((x, index) => {
    return (
      <div key={index}>
        <div>User attempt {index + 1}</div>

        <div
          className="answer"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {x.answer.split("").map((digit, i) => {
            const { highlight } = x;
            const backgroundColor = highlight.includes(parseInt(digit))
              ? "#A4F2DD"
              : "white";
            return (
              <div key={i} style={{ backgroundColor }}>
                {digit}
              </div>
            );
          })}
        </div>
      </div>
    );
  });
}

export default Answers;
