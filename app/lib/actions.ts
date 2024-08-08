// Server Actions.
// These server functions can then be imported and used in Client and Server components.

"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  console.log("formd", formData);
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  console.log("3000 start....");

  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log("3000 end....");

  revalidatePath("/dashboard/invoices"); // 최종: 얘도 잘됨..........

  //   redirect("/dashboard/invoices"); // 초ㅣ종: 이건 잘되긴함.
  //   redirect("/dashboard/invoices/create");
}
