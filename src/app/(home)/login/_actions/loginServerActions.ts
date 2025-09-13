import { z } from 'zod';
import { LoginFormInputs, loginSchema } from '@/types/zodValidation';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

// Login validation schema


export async function loginAction(formData: LoginFormInputs) {
  const email = formData.email
  const password = formData.password
  try {
    // Validate input
    const validatedData = loginSchema.parse({ email, password });

    // API call for login
    const response = await fetch('https://admin.limescreen.net/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: validatedData.email,
        password: validatedData.password
      })
    });

    // Check API response
    const result = await response.json();
    if (!response.ok) {
      return result;
    }
    return {
      status: result.status,
      message: result.message,
      data: result.data || []
    };
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation failed',
        errors: error.flatten().fieldErrors
      };
    }
  };
};