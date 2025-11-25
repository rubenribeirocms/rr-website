import prisma from "@/lib/prisma";

export async function POST(req) {
  const form = await req.formData();

  await prisma.appointment.create({
    data: {
      customerId: form.get("customerId") || null,
      date: new Date(form.get("date")),
      location: form.get("location"),
      treatment: form.get("treatment"),
      notes: form.get("notes"),
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone")
    }
  });

  return Response.redirect(new URL("/cms/appointments", req.url));
}
