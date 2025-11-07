/**
 * POST /api/demo
 *
 * Demo request endpoint with rate limiting, validation, and notifications
 */

import { NextRequest, NextResponse } from 'next/server';
import { demoFormSchema } from '@/lib/validation/formSchemas';
import { checkRateLimit } from '@/lib/rate-limiter';
import { sendDemoRequest } from '@/lib/email-service';
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
    const validation = validateRequestBody(demoFormSchema, body, {
      sanitize: true,
    });

    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Send confirmation and notification emails
    await sendDemoRequest(validation.data);

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Demo request received! Our team will contact you shortly.',
      },
      {
        status: 201,
        headers: rateLimitResult.headers,
      }
    );
  } catch (error) {
    const apiError = handleApiError(error, { endpoint: '/api/demo' });
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
