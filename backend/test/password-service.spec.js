import { internet } from "faker"
import { PasswordService, InvalidHintException } from "../password-service"

describe('Password Service Test Scenarios', () => {
    describe('Generate Password', ()=> {
        it('Generate unique Passwords',() => {
            const response1 = PasswordService.createNewPassword();
            const response2 = PasswordService.createNewPassword();
            expect(response1.hint).not.toEqual(response2.hint);
        })
    });

    describe('Verify Password', ()=> {
        it('Verify Answer without highlights',() => {
            const hint = PasswordService.createNewPassword().hint;
            const password =  PasswordService.getCurrentPassword().currentPassword.split('');
            let answer ="";
            for (let i=7; i>=0; i--) {
                answer = answer + password[i];
            }
            console.log("answer=="+ answer);
            const response = PasswordService.verifyPassword(hint,answer);
            expect(response.hint).toEqual(hint);
            expect(response.correct).toEqual(false);
            expect(response.highlight).toEqual([]);
            expect(response.answer).toEqual(answer);
        })

        it('Verify Answer with highlights',() => {
            const hint = PasswordService.createNewPassword().hint;
            const password =  PasswordService.getCurrentPassword().currentPassword.split('');

            let answerWithAtLeastOneMatch = password[0];
            for (let i=7; i>=1; i--) {
                answerWithAtLeastOneMatch = answerWithAtLeastOneMatch + password[i];
            }

            const response = PasswordService.verifyPassword(hint, answerWithAtLeastOneMatch);

            expect(response.hint).toEqual(hint);
            expect(response.correct).toEqual(false);
            expect(response.highlight[0]).toEqual(parseInt(password[0]));
            expect(response.answer).toEqual(answerWithAtLeastOneMatch);
        })

        it('Verify Answer with correct password',() => {
            const hint = PasswordService.createNewPassword().hint;
            const answer = PasswordService.getCurrentPassword().currentPassword;
            const response = PasswordService.verifyPassword(hint, answer);
            
            expect(response.correct).toEqual(true);
            expect(response.hint).toEqual(hint);
            expect(response.highlight.join('')).toEqual(answer);
            expect(response.answer).toEqual(answer);
        });

        describe('Verify Error when answer is not provided',() => {
            it('Verify Error when answer is null',() => {
                try {
                    const hint = PasswordService.createNewPassword().hint;
                    const response = PasswordService.verifyPassword(hint, null);

                    expect(true).toEqual(false); // should throw exception
                } catch (e) {
                    expect(e).toEqual("Answer value must be specified.");
                }
            });

            it('Verify Error when answer is undefined',() => {
                try {
                    const hint = PasswordService.createNewPassword().hint;
                    const response = PasswordService.verifyPassword(hint, undefined);

                    expect(true).toEqual(false); // should throw exception
                } catch (e) {
                    expect(e).toEqual("Answer value must be specified.");
                }
            });
            
            it('Verify Error when answer is empty',() => {
                try {
                    const hint = PasswordService.createNewPassword().hint;
                    const response = PasswordService.verifyPassword(hint, '');

                    expect(true).toEqual(false); // should throw exception
                } catch (e) {
                    expect(e).toEqual("Answer value must be specified.");
                }
            });
        });

        it('Verify Error when answer is not number',() => {
            try {
                const hint = PasswordService.createNewPassword().hint;
                const response = PasswordService.verifyPassword(hint, '123456mm');

                expect(true).toEqual(false); // should throw exception
            } catch (e) {
                expect(e).toEqual("Answer value must be numeric.");
            }
        });

        it('Verify Error when answer lenght is <8',() => {
            try {
                const hint = PasswordService.createNewPassword().hint;
                const response = PasswordService.verifyPassword(hint, '123456');

                expect(true).toEqual(false); // should throw exception
            } catch (e) {
                expect(e).toEqual("Answer value lenght must be 8.");
            }
        });

        it('Verify Error when answer lenght is >8',() => {
            try {
                const hint = PasswordService.createNewPassword().hint;
                const response = PasswordService.verifyPassword(hint, '123456889');

                expect(true).toEqual(false); // should throw exception
            } catch (e) {
                expect(e).toEqual("Answer value lenght must be 8.");
            }
        });

        it('Verify Error when hint is not correct',() => {
            try {
                const hint = PasswordService.createNewPassword().hint;
                const response = PasswordService.verifyPassword('09876543', '12345688');

                expect(true).toEqual(false); // should throw exception
            } catch (e) {
                expect(e instanceof InvalidHintException).toEqual(true)
                expect(e.toString()).toEqual("Invalid Hint.");
            }
        });
    });
});
