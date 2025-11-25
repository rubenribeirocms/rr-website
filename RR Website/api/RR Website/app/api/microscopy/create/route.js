import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";

export async function POST(req) {
  const form = await req.formData();

  const customerId = form.get("customerId");
  const report = form.get("report");
  const image = form.get("image");

  // Read file
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Vercel Blob
  const blob = await put(`microscopy-${Date.now()}-${image.name}`, buffer, {
    access: "public",
  });

  // Save
  await prisma.microscopyAnalysis.create({
    data: {
      customerId,
      report,
      imageUrl: blob.url,
    },
  });

  return Response.redirect(new URL(`/cms/customers/${customerId}`, req.url));
}
