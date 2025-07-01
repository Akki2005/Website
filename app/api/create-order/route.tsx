// app/api/create-order/route.ts
import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';
import { CreateOrderRequest, CreateOrderResponse, DonorDetails } from '@/types/razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json();
    const { amount, name, phone_no, member_status } = body;

    // Validate required fields
    if (!amount || !name || !phone_no || !member_status) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Create order in Razorpay
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `donation_${Date.now()}`,
      notes: {
        name,
        phone_no,
        member_status,
        donation_type: 'community_donation'
      }
    };

    const order = await razorpay.orders.create(options);

    // Prepare donor details for verification (without payment_type)
    const donorDetails: DonorDetails = {
      name,
      phone_no,
      member_status,
      Amount: amount, // Store as decimal
      razorpay_order_id: order.id
    };

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      donor_details: donorDetails
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to create order' 
      },
      { status: 500 }
    );
  }
}