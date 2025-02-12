
import { isAuth } from "@/middleware/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, CreditCard, Zap, Receipt } from "lucide-react";
import { UpdatePaymentDialog } from "@/components/update-payment-dialog";
import { Polar } from "@polar-sh/sdk";
import Link from "next/link";

const polar = new Polar({
  server: "sandbox",
  accessToken: process.env.NEXT_PUBLIC_POLAR_ACCESS_TOKEN ?? "",
});

export default async function BillingPage() {
  const session = await isAuth();

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: ["5 albums", "100 photos per album", "Basic analytics", "Standard support"],
      current: true,
      polarId: "free"
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "Best for photographers",
      features: ["Unlimited albums", "1000 photos per album", "Advanced analytics", "Priority support", "Custom watermarks", "Download originals"],
      current: false,
      polarId: "51db2ae2-9040-41fb-a59f-20bac2c1497a"
    },
    {
      name: "Business",
      price: "$29.99",
      description: "For professional studios",
      features: ["Everything in Pro", "Unlimited photos", "Team collaboration", "API access", "24/7 support", "Custom domain"],
      current: false,
      polarId: "business-tier"
    },
  ];

// Mock billing history - In a real app, this would come from your database
const billingHistory = [
  { date: "2024-01-01", description: "Monthly subscription - Free Plan", amount: "$0.00" },
  { date: "2023-12-01", description: "Monthly subscription - Free Plan", amount: "$0.00" },
  { date: "2023-11-01", description: "Monthly subscription - Free Plan", amount: "$0.00" },
];


  const handleUpgrade = async (planId: string) => {
   
  };

  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and payment methods</p>
      </div>

      {/* Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Zap className="h-4 w-4" />
            Storage
          </div>
          <div className="text-xl font-bold">45% used</div>
          <div className="text-sm text-muted-foreground">450MB of 1GB</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Zap className="h-4 w-4" />
            Albums
          </div>
          <div className="text-xl font-bold">3 of 5</div>
          <div className="text-sm text-muted-foreground">60% used</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Zap className="h-4 w-4" />
            Photos
          </div>
          <div className="text-xl font-bold">89 of 100</div>
          <div className="text-sm text-muted-foreground">89% per album</div>
        </Card>
      </div>

      {/* Current Plan */}
      <Card className="p-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Current Plan: Free</h2>
            <p className="text-sm text-muted-foreground">Your plan renews on January 1, 2024</p>
          </div>
          <UpdatePaymentDialog />
        </div>
      </Card>

      {/* Subscription Plans - Table Style */}
      <Card className="mb-8 overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Available Plans</h2>
        </div>
        <div className="divide-y">
          {plans.map((plan) => (
            <div key={plan.name} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <span className="text-2xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {plan.features.map((feature) => (
                    <span key={feature} className="text-sm flex items-center">
                      <Check className="h-3 w-3 mr-1 text-primary" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              {!plan.current && (
                  <Link className="h-8 flex flex-row items-center justify-center rounded-full bg-white text-black font-medium px-4" href={`/checkout?productId=${plan.polarId}`}>
                <Button 
                  className="ml-4" 
                  size="sm"
                //   onClick={() => handleUpgrade(plan.polarId)}
                >
                  Upgrade
                </Button>
                </Link>
              )}
              {plan.current && (
                <Button
                  className="ml-4"
                  variant="outline"
                  disabled
                  size="sm"
                >
                  Current
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Billing History */}
      <Card>
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Billing History</h2>
        </div>
        <div className="divide-y">
          {billingHistory.map((item, index) => (
            <div key={index} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Receipt className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{item.description}</p>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </div>
              <span className="text-sm font-medium">{item.amount}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
