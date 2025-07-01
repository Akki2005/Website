// app/api/verify-payment/route.ts
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { VerifyPaymentRequest, VerifyPaymentResponse } from '@/types/razorpay';

export async function POST(request: NextRequest) {
  try {
    const body: VerifyPaymentRequest = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donor_details
    } = body;

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Get payment details from Razorpay to extract payment method
    let paymentMethod = 'unknown';
    try {
      const Razorpay = require('razorpay');
      const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      });
      
      const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
      paymentMethod = paymentDetails.method || 'unknown';
    } catch (error) {
      console.warn('Could not fetch payment method:', error);
      // Continue with unknown method
    }

    // Store the donation in Supabase only after successful payment verification
    const supabase = await createClient();
    const { data: donation, error } = await supabase
      .from("Donors")
      .insert({
        name: donor_details.name,
        phone_no: donor_details.phone_no,
        member_status: donor_details.member_status,
        Amount: donor_details.Amount, // Now supports decimal
        payment_type: paymentMethod, // Get from Razorpay
        transaction_no: razorpay_payment_id
      })
      .select()
      .single();

    if (error) {
      console.error('Error storing donation:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to store donation record' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and donation recorded successfully',
      donation: donation
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Payment verification failed' 
      },
      { status: 500 }
    );
  }
}