
let currentPassword = "";
let currentHint = "";

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getCurrentPassword() {
    return {
        currentPassword
    }
  }

function createNewPassword() {
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let result = "";

    for (let i=1; i<=8; i++) {
        const index = randomIntFromInterval(0, numbers.length-1);
        result = result + numbers[index];
        numbers.splice(index, 1);
    }

    currentPassword = result;
    currentHint = [...result].sort().join('')

    return {
        hint: currentHint
    };
}

export function InvalidHintException() {
    this.message = 'Invalid Hint.';
    this.toString = function() {
      return this.message;
    };
}

function validateArguments(hint, answer) {
    if (hint !== currentHint) {
        throw new InvalidHintException();
    }

    if (!answer){
        throw 'Answer value must be specified.';
    }

    if (isNaN(answer)){
        throw 'Answer value must be numeric.';
    }

    if (answer.length!=8 ){
        throw 'Answer value lenght must be 8.';
    }
}

function verifyPassword(hint, answer) {
    validateArguments(hint, answer)
    
    let highlight =[];
    const answerArray = answer.split('');
    const currentPasswordArray = currentPassword.split('');
    let correct = false;

    for (let i=0; i<=7;i++){
        if (answerArray[i]===currentPasswordArray[i]){
            highlight.push(parseInt(answerArray[i]));
        }
    }

    if (highlight.length === 8){
        correct = true;
    }

    console.log('currentPassword', currentPassword)
    return { correct, highlight, hint, answer };
}

export const PasswordService = {
    getCurrentPassword,
    createNewPassword,
    verifyPassword,
};
