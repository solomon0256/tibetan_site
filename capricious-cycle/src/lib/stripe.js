import Stripe from "stripe";
const stripe = new Stripe(import.meta.env.ASTRO_STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function createCheckoutSession(priceId) {
  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "payment",
    success_url: `${import.meta.env.PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${import.meta.env.PUBLIC_BASE_URL}/courses`,
  });
}
//暂时如此写，后续会根据实际情况调整