import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "anbumani15012002@gmail.com",
    pass: "ilst xzdl nyru zrog",
  },
});

const generateEmailText = (data) => {
  console.log(data);
  let emailText = `
    Dear ${data.name},
    Your service request is created and the reference no is ${
      data.no
    }. You can check your status in this link: ${
    process.env.FRONTEND_URL
  }/status/${data.no}.
    We will also send you all the updates in the mail. Your details we received are as follows:
    Category: ${data.category}
    Title: ${data.title}
    Description: ${data.description}
    Status: ${data.status}
    Contact Name: ${data.name}
    Contact Email: ${data.email}
    Contact Mobile: ${data.mobile ? data.mobile : "-"}
    Created Date: ${data.createdAt}

    Thanks,
    SR Team.
  `;
  return emailText;
};

const sendMailWithData = async (data) => {
  try {
    const emailText = generateEmailText(data);
    console.log(emailText, data, "anbu");

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: `${data.email}`,
      subject: `${data.no}: Your Request is Received`,
      text: emailText,
    });

    console.log("Email sent");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const welcomeEmail = async (req, res) => {
  try {
    console.log(req, "request");
    const data = req.body;
    console.log(data, "anbumani");
    await sendMailWithData(data);

    res.send({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

export default { welcomeEmail, sendMailWithData };
