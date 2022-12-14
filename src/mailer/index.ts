import * as nodemailer from "nodemailer";
import * as config from "config";

export const transporter = async (ownerEmail: string) => {
  try {
    return nodemailer.createTransport({
      host: config.get("mailer.host"),
      port: config.get("mailer.port"),
      // secure: config.get("mailer.secure"),
      // auth: {
      //   user: `${ownerEmail}`,
      //   pass: config.get("mailer.passwordEmail"),
      // },
    });
  } catch (error) {
    throw new Error(error);
  }
};
