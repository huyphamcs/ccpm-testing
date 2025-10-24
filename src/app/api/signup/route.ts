/**
 * POST /api/signup
 *
 * Signup endpoint with rate limiting, validation, and email confirmation
 */

import { NextRequest, NextResponse } from 'next/server';
import { signupFormSchema } from '@/lib/validation/formSchemas';
import { checkRateLimit } from '@/lib/rate-limiter';
import { sendSignupConfirmation } from '@/lib/email-service';
import { validateRequestBody } from '@/lib/validation';
import { handleApiError } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await checkRateLimit(request);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: rateLimitResult.error?.message },
        {
          status: 429,
          headers: rateLimitResult.headers,
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = validateRequestBody(signupFormSchema, body, {
      sanitize: true,
    });

    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Send confirmation email
    await sendSignupConfirmation(validation.data);

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Signup successful! Check your email for confirmation.',
      },
      {
        status: 201,
        headers: rateLimitResult.headers,
      }
    );
  } catch (error) {
    const apiError = handleApiError(error, { endpoint: '/api/signup' });
    return NextResponse.json(
      { success: false, error: apiError.message },
      { status: apiError.status }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}
