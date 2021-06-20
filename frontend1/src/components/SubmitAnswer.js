import React from "react";

function SubmitAnswer({ answer, setAnswer, onSubmitAnswer }) {
  return (
    <div>
      <div>
        <input
          placeholder="type here"
          type="number"
          value={answer}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 8) {
              setAnswer(value);
            }
          }}
        />
      </div>
      <div>
        <button disabled={new Set(answer).size !== 8} onClick={onSubmitAnswer}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default SubmitAnswer;
