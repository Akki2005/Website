
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import {TwilioClient} from '@/utils/twilio/client'

const client = TwilioClient();
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID!;

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("Request method:", req.method);
  
  if (req.method !== 'POST') {
    return NextResponse.json({ success:false,message: 'Method Not Allowed' },{status:405});
  }

  const { phoneNumber, code } = await req.json();
 
  try {
    const verificationCheck = await client.verify.v2.services(serviceSid)
      .verificationChecks
      .create({ to: phoneNumber, code });

    if (verificationCheck.status === 'approved') {
      return NextResponse.json({ success: true, message: 'Phone verified successfully' },{status:200});
    } else {
      return NextResponse.json({ success: false, message: 'Invalid OTP' },{status:200});
    }
  } catch (error:any) {
    console.error("OTP verification failed:", error);
    return NextResponse.json({success:false,message: error.message|| 'Verification failed' },{status:500});
  }
}
