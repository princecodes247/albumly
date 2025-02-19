'use server';

import { polar } from "@/lib/polar";
import { isAuth } from "@/middleware/auth";


export async function createCheckout(productId: string) {
  const {session, user} = await isAuth();
  if (!user?.id) throw new Error('Unauthorized');
  console.log({polar: polar._options.accessToken})
  try {
    const checkout = await polar.checkouts.create({
      productId,
      successUrl: "http://localhost:3000/checkout/successful",
    });
    console.log({checkout})
    return { url: checkout.url };
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
}

export async function getCustomerCheckoutSession(id: string) {
  console.log({id})
  const checkout = await polar.checkouts.get({
    id
  });
  return checkout
}