"use server";

import { z } from 'zod';
import { LoginFormInputs, loginSchema } from '@/types/zodValidation';

export type LoginActionResult = {
  status: number | null;
  message: string;
  data: { id?: number | string; [key: string]: unknown } | never[];
  errors?: Record<string, string[] | undefined>;
};

export async function loginAction(formData: LoginFormInputs): Promise<LoginActionResult> {
  const email = formData.email;
  const password = formData.password;

  let validatedData;
  try {
    validatedData = loginSchema.parse({ email, password });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: 422,
        message: 'Validation failed',
        data: [],
        errors: error.flatten().fieldErrors,
      };
    }
    throw error;
  }

  try {
    const response = await fetch('https://admin.anantainternationals.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: validatedData.email,
        password: validatedData.password,
      }),
      cache: 'no-store',
    });

    // Read the body exactly once - a Response body cannot be consumed twice.
    const result = await response.json();

    if (!response.ok) {
      return {
        status: result?.status ?? response.status,
        message: result?.message || 'Invalid credentials',
        data: [],
      };
    }

    return {
      status: result.status,
      message: result.message,
      data: result.data || [],
    };
  } catch (error) {
    // Network failure, TLS failure, or a non-JSON body. Never return undefined:
    // every caller dereferences the result.
    console.error('Error in loginAction:', error);
    return {
      status: 503,
      message: 'Could not reach the login service. Please try again.',
      data: [],
    };
  }
}
