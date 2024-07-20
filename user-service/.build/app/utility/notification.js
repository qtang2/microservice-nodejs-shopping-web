"use strict";
// const accountSid = "ACa20a5f9acaXXXXXXXXXXXXXXXXXXX";
// const authToken = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendVerificationCode = exports.GenerateAccessCode = void 0;
// const client = twilio(accountSid, authToken);
const GenerateAccessCode = () => {
    const code = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { code, expiry };
};
exports.GenerateAccessCode = GenerateAccessCode;
const SendVerificationCode = (code, toPhoneNumber) => {
    // -------- can use Twilio to send the code, need to pay for the account
    //   const response = await client.messages.create({
    //     body: `Your verification code is ${code} it will expire within 30 minutes.`,
    //     from: "+18138963397",
    //     to: toPhoneNumber.trim(),
    //   });
    //   console.log(response);
    //   return response;
    // ------- or can use AWS sns
    return "Code Sent";
    console.log("SendVerificationCode");
};
exports.SendVerificationCode = SendVerificationCode;
//# sourceMappingURL=notification.js.map