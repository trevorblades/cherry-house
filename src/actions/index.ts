import { defineAction } from "astro:actions";
import { MAILJET_API_KEY, MAILJET_API_SECRET } from "astro:env/server";
import { z } from "astro/zod";
import Mailjet, { type Contact } from "node-mailjet";

const mailjet = new Mailjet({
  apiKey: MAILJET_API_KEY,
  apiSecret: MAILJET_API_SECRET,
});

export const server = {
  newsletter: {
    subscribe: defineAction({
      accept: "form",
      input: z.object({
        email: z.email(),
      }),
      handler: async (input) => {
        const result = await mailjet
          .get(`contact/${encodeURIComponent(input.email)}`)
          .request<Contact.GetContactResponse>();
        if (result.body.Total === 0) {
          await mailjet.post("contact").request({
            Email: input.email,
          });
        }
      },
    }),
  },
};
