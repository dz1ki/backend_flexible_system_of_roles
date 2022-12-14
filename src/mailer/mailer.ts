import { ownerEmail, ownerFirstName, URL_SERVER } from "../data/constants";
import { transporter } from "./index";

export async function sendToEmailConfirmation(
  clientEmail: string,
  code: string
) {
  const mailer = await transporter(ownerEmail);
  await mailer.sendMail({
    from: `"${ownerFirstName}" <${ownerEmail}>`,
    to: `${clientEmail}  `,
    subject: "Email confirmation",
    html: `
    <html>
    <head>
      <script language="javascript">
        function submitPostLink() {
          document.postlink.submit();
        }
      </script>
    </head>
    <body>
      <form
        action="${URL_SERVER}/users/check-email"
        name="postlink"
        method="post"
      >
        <input type="hidden" name="email" value="${clientEmail}" />
        <input type="hidden" name="code" value="${code}" />
      </form>
      <p>
        Clic
        <a href="${URL_SERVER}/users/email-confirmed" onclick="submitPostLink()"
          >link</a
        >
        confirm email.
      </p>
    </body>
  </html>`,
  });
}
