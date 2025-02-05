"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { workFlowClient } from "../workflow";
import config from "../config";
import { appError } from "../appError";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (err: any) {
    console.log(err, "Signin error");
    return { success: false, error: err.code ?? "Signin Error" };
  }
};

export const signUp = async (
  params: AuthCredentials
): Promise<{ success: boolean; error?: string; type?: string }> => {
  const { fullName, email, universityCard, password, universityId } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      universityCard,
      password: hashedPassword,
    });

    await workFlowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflow/onboarding`,
      body: {
        email,
        fullName,
      },
    });

    await signInWithCredentials({ email, password });
    return { success: true };
  } catch (err: unknown) {
    console.log(err, "Signup Error");
    const { type, message } = appError(err, "Something went very wrong!");
    console.log(type, message);
    return { success: false, error: message, type };
  }
};

export const logOut = async () => {
  await signOut();
  return { status: true };
};
