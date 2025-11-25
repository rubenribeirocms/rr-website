import prisma from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(req) {
  const form = await req.formData();
  const email = form.get("email");
  const password = form.get("password");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.disabled) {
    return new Response("Invalid login", { status: 400 });
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return new Response("Invalid login", { status: 400 });
  }

  await createSession(user.id);

  return Response.redirect(new URL("/cms", req.url));
}
