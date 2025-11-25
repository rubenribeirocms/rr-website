import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req) {
  const user = await getSession();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const form = await req.formData();

  await prisma.clinicalNote.create({
    data: {
      content: form.get("content"),
      customerId: form.get("customerId"),
      userId: user.id
    }
  });

  return Response.redirect(new URL(`/cms/customers/${form.get("customerId")}`, req.url));
}
