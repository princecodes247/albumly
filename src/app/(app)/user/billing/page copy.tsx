import { isAuth } from "@/middleware/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, CreditCard, Zap } from "lucide-react";

export default async function BillingPage() {
  const session = await isAuth();

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "5 albums",
        "100 photos per album",
        "Basic analytics",
        "Standard support",
      ],
      current: true,
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "Best for photographers",
      features: [
        "Unlimited albums",
        "1000 photos per album",
        "Advanced analytics",
        "Priority support",
        "Custom watermarks",
        "Download originals",
      ],
      current: false,
    },
    {
      name: "Business",
      price: "$29.99",
      description: "For professional studios",
      features: [
        "Everything in Pro",
        "Unlimited photos",
        "Team collaboration",
        "API access",
        "24/7 support",
        "Custom domain",
      ],
      current: false,
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground mt-2">Manage your subscription and payment methods</p>
      </div>

      {/* Current Plan Overview */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Current Plan: Free</h2>
            <p className="text-muted-foreground">Your plan renews on January 1, 2024</p>
          </div>
          <Button variant="outline">
            <CreditCard className="mr-2 h-4 w-4" />
            Update Payment Method
          </Button>
        </div>
      </Card>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <Card key={plan.name} className={`p-6 ${plan.current ? 'border-primary' : ''}`}>
            <div className="mb-4">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="flex items-baseline mt-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="text-muted-foreground mt-2">{plan.description}</p>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              variant={plan.current ? "outline" : "default"}
              disabled={plan.current}
            >
              {plan.current ? "Current Plan" : "Upgrade"}
            </Button>
          </Card>
        ))}
      </div>

      {/* Usage Statistics */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Usage Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Zap className="h-4 w-4" />
              Storage Used
            </div>
            <div className="text-2xl font-bold">45%</div>
            <div className="text-sm text-muted-foreground">450MB of 1GB</div>
          </div>

          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Zap className="h-4 w-4" />
              Total Albums
            </div>
            <div className="text-2xl font-bold">3/5</div>
            <div className="text-sm text-muted-foreground">Albums created</div>
          </div>

          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Zap className="h-4 w-4" />
              Photos
            </div>
            <div className="text-2xl font-bold">89/100</div>
            <div className="text-sm text-muted-foreground">Per album limit</div>
          </div>
        </div>
      </Card>
    </div>
  );
}