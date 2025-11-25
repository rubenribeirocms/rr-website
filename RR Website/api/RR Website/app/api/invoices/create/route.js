import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req) {
  const user = await getSession();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const form = await req.formData();

  let items = [];
  form.forEach((value, key) => {
    if (key.startsWith("item_name_")) {
      const index = key.replace("item_name_", "");
      items.push({
        name: value,
        price: parseFloat(form.get(`item_price_${index}`) || "0")
      });
    }
  });

  const subtotal = items.reduce((t, i) => t + i.price, 0);
  const vatRate = parseFloat(form.get("vat") || "0") / 100;
  const vat = subtotal * vatRate;
  const total = subtotal + vat;

  await prisma.invoice.create({
    data: {
      customerId: form.get("customerId"),
      currency: form.get("currency"),
      status: form.get("status"),
      vat,
      total,
      items,
      userId: user.id,
    },
  });

  return Response.redirect(new URL(`/cms/customers/${form.get("customerId")}`, req.url));
}
