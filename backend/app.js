import { PasswordService, InvalidHintException } from "./password-service";

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.get('/password', (req, res) => {
    const response = PasswordService.getCurrentPassword();
    res.json(response);
});

app.get('/new-password', (req, res) => {
    const response = PasswordService.createNewPassword();
    res.json(response);
});

app.post('/verify-password', (req, res) => {
    const {hint, answer} = req.body;
    try {
        const response = PasswordService.verifyPassword(hint, answer);
        res.json(response);
    } catch (e) {
        let code = 422;

        if (e instanceof InvalidHintException) {
            code = 404;
        }
        
        res.status(code).send(res.json({
            message: e.toString()
        }));
      }
});

app.listen(3010, function () {
  console.log('Application running on port 3010!');
});
