const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");

// Set with: firebase functions:secrets:set GMAIL_APP_PASSWORD
const gmailAppPassword = defineSecret("GMAIL_APP_PASSWORD");

// TODO: point these at the inbox that should receive contact-form submissions.
const FROM_EMAIL = "REPLACE_ME@gmail.com";
const TO_EMAIL = "REPLACE_ME@gmail.com";

// Emails a notification whenever a new doc lands in the `contact` collection.
// The contact form on the site writes { name, email, message, ... } to Firestore.
exports.onContactSubmit = onDocumentCreated(
  {
    document: "contact/{docId}",
    secrets: [gmailAppPassword],
  },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: FROM_EMAIL,
        pass: gmailAppPassword.value(),
      },
    });

    const body = [
      `New message from ${data.name || "(no name)"} (${data.email || "no email"})`,
      "",
      data.subject ? `Subject: ${data.subject}` : null,
      data.company ? `Company: ${data.company}` : null,
      data.budget ? `Budget: ${data.budget}` : null,
      "",
      "--- Message ---",
      data.message || "(empty)",
    ]
      .filter((line) => line !== null)
      .join("\n");

    await transporter.sendMail({
      from: `"Portfolio Contact" <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `Portfolio inquiry from ${data.name || "someone"}`,
      text: body,
    });

    console.log(`Email sent for submission from ${data.name}`);
  },
);
