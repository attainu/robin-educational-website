export const verification = (key) => {
    return `Hi, there,
    <br/>
    Thank you for registration
    <br/><br/>
    Please verify your email by clicking on following link
    <br/>
    <a href="https://evening-reef-13907.herokuapp.com/users/verify/${key}">verify</a>
    <br/><br/>
    Have a good day!`;
}

export const forgetPassword = (key) => {
    return `Hi, there,
    <br/><br/>
    We got a request for PASSWORD RECOVERY.
    <br/>
    Please click on following link to change your password.
    <br/>
    This is secret key <b>${key}</b>
    <br/>
    <a href="https://evening-reef-13907.herokuapp.com/makePassword">click</a>
    <br/><br/>
    Have a good day!`;
};


export const askMeAnswer = () => {
    return `Hi there,
    <br/><br/>
    We answered your question.
    <br/><br/>
    Have a good day!.`;
};


export const changeMail = (key) => {
    return `Hi there,
    <br/><br/>
    We got request for changing email address and set this email
    <br/>
    Please click on following link to set your new email.
    <br/>
    <a href="https://evening-reef-13907.herokuapp.com/users/email-verify/${key}">change email</a>
    <br/><br/>
    Thank you! Have a great day.`
}