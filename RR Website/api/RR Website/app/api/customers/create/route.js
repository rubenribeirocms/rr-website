import prisma from "@/lib/prisma";

export async function POST(req) {
  const form = await req.formData();

  await prisma.customer.create({
    data: {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone")
    }
  });

  return Response.redirect(new URL("/cms/customers", req.url));
}
