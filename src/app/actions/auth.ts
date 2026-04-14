"use server";

import { prisma } from "@/lib/prisma";
import { login as setSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  
  // Demographic data
  const state = formData.get("state") as string;
  const gender = formData.get("gender") as string;
  const ageSegment = formData.get("ageSegment") as string;
  const casteCategory = formData.get("casteCategory") as string;
  const studentStatus = formData.get("studentStatus") as string;
  const employmentStatus = formData.get("employmentStatus") as string;
  const incomeBracket = formData.get("incomeBracket") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      state,
      gender,
      ageSegment,
      casteCategory,
      studentStatus,
      employmentStatus,
      incomeBracket,
    },
  });

  await setSession(user);
  redirect("/dashboard");
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Invalid credentials" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: "Invalid credentials" };
  }

  await setSession(user);
  redirect("/dashboard");
}

export async function logoutAction() {
  const { logout } = await import("@/lib/auth");
  await logout();
  redirect("/login");
}
