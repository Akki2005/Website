// types/razorpay.d.ts
export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    contact: string;
    email?: string;
  };
  notes?: {
    [key: string]: string;
  };
  theme: {
    color: string;
  };
  config?: {
    display: {
      blocks: {
        [key: string]: {
          name: string;
          instruments: Array<{
            method: string;
          }>;
        };
      };
      hide?: Array<{
        method: string;
      }>;
      sequence: string[];
      preferences: {
        show_default_blocks: boolean;
      };
    };
  };
  method?: {
    card?: boolean;
    netbanking?: boolean;
    wallet?: boolean;
    upi?: boolean;
  };
  modal: {
    ondismiss: () => void;
  };
}

export interface DonorDetails {
  name: string;
  phone_no: string;
  member_status: string;
  Amount: number;
  razorpay_order_id?: string;
}

export interface CreateOrderRequest {
  amount: number;
  name: string;
  phone_no: string;
  member_status: string;
}

export interface CreateOrderResponse {
  success: boolean;
  order_id?: string;
  amount?: number;
  currency?: string;
  key?: string;
  donor_details?: DonorDetails;
  message?: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  donor_details: DonorDetails;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  donation?: any;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

export {};