'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCustomerCheckoutSession } from "@/actions/payment.actions";

export default function CheckoutSuccessful() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const customerSessionToken = searchParams.get('customer_session_token');
    if (!customerSessionToken) {
      setError('Invalid checkout session');
      setIsLoading(false);
      return;
    }

    const fetchCheckoutSession = async () => {
      try {
        const session = await getCustomerCheckoutSession(customerSessionToken);
        // Handle successful session fetch if needed
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load checkout details');
        setIsLoading(false);
      }
    };

    fetchCheckoutSession();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Processing Payment...</h1>
            <p className="text-muted-foreground">
              Please wait while we confirm your payment details.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Payment Error</h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={() => router.push('/user/billing')}
            >
              Return to Billing
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            className="w-full"
            onClick={() => router.push('/user')}
          >
            Return to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}