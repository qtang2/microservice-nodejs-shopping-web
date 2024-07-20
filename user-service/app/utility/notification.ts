// const accountSid = "ACa20a5f9acaXXXXXXXXXXXXXXXXXXX";
// const authToken = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

// const client = twilio(accountSid, authToken);

export const GenerateAccessCode = () => {
  const code = Math.floor(10000 + Math.random() * 900000);
  let expiry = new Date();

  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
  return { code, expiry };
};
export const SendVerificationCode = (code: number, toPhoneNumber: string) => {
  // -------- can use Twilio to send the code, need to pay for the account
  //   const response = await client.messages.create({
  //     body: `Your verification code is ${code} it will expire within 30 minutes.`,
  //     from: "+18138963397",
  //     to: toPhoneNumber.trim(),
  //   });
  //   console.log(response);
  //   return response;

  // ------- or can use AWS sns

  return "Code Sent"
  console.log("SendVerificationCode");
};
