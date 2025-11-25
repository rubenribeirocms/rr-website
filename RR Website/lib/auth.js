import { cookies } from "next/headers";
import prisma from "./prisma";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";

const SESSION_COOKIE = "ruben_cms_session";

export async function createSession(userId) {
  const token = randomBytes(32).toString("hex");

  await prisma.session.create({
    data: { token, userId },
  });

  cookies().set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return token;
}

export async function getSession() {
  const cookie = cookies().get(SESSION_COOKIE);
  if (!cookie) return null;

  const session = await prisma.session.findUnique({
    where: { token: cookie.value },
    include: { user: true },
  });

  if (!session || session.user.disabled) {
    cookies().delete(SESSION_COOKIE);
    return null;
  }

  return session.user;
}

export async function destroySession() {
  const cookie = cookies().get(SESSION_COOKIE);
  if (!cookie) return;

  await prisma.session.deleteMany({
    where: { token: cookie.value },
  });

  cookies().delete(SESSION_COOKIE);
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
