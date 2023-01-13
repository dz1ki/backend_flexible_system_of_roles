import { ownerEmail, ownerFirstName, URL_SERVER } from "../data/constants";
import { transporter } from "./index";

export async function sendToEmailConfirmation(
  userId: number,
  clientEmail: string,
  code: string
) {
  const mailer = await transporter(ownerEmail);
  await mailer.sendMail({
    from: `"${ownerFirstName}" <${ownerEmail}>`,
    to: `${clientEmail}  `,
    subject: "Email confirmation",
    html: `
       <form action="${URL_SERVER}/user/check-email" method="post">
         <div>
           <input type="hidden" name="userId" value="${userId}" />
           <input type="hidden" name="code" value="${code}" />
         </div>
         <div>
           <button>Click to confirm email</button>
         </div>
       </form>
  `,
  });
}
