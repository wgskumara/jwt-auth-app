let resetPassword = (email, token) => {
    const emailTemplate = {
        from: "noreply@gmail.com",
        to: email,
        subject: "Password Reset for" + email,
        text:
            "Please click the link below to reset your password \n\n" +
            "localhost:3000/reset-password/" + token + "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };
    return emailTemplate;
};

export { resetPassword };
