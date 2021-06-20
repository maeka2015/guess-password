import React, { useEffect, useState } from "react";
import GuessPasswordService from "../services/GuessPasswordService";
import Answers from "./Answers";
import SubmitAnswer from "./SubmitAnswer";
import Hint from "./Hint";

function GuessPassword(props) {
  const [hint, setHint] = useState("");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await GuessPasswordService.createNewPassword();
      setHint(result.data.hint);
    };
    fetchData();
  }, []);

  async function onSubmitAnswer() {
    const result = await GuessPasswordService.verifyPassword(hint, answer);
    setAnswers([...answers, result.data]);
    setAnswer("");
  }

  return (
    <div>
      <h1>Guess the Password</h1>

      <Hint hint={hint} />

      <Answers answers={answers} />

      <SubmitAnswer
        answer={answer}
        setAnswer={setAnswer}
        onSubmitAnswer={onSubmitAnswer}
      />
    </div>
  );
}

export default GuessPassword;