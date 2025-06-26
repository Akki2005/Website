

import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import {TwilioClient} from '@/utils/twilio/client'

const client =TwilioClient();
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID!;

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber } = await req.json();

    const verification = await client.verify.v2.services(verifyServiceSid)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      sid: verification.sid,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to send OTP',
      error: error.message,
    }, { status: 500 });
  }
}
