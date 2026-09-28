# How this becomes a live SaaS

## Plans
- Public $0 — CiteLock + two playbooks
- Pro $19/mo — saved matters, export after verified cites
- Clinic $149/mo — supervision queue

Not legal advice. Not insurance.

## Before first charge
1. Stripe https://dashboard.stripe.com/register
2. Import this repo into Vercel (Framework: Other)
3. Host env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, COURTLISTENER_API_TOKEN, APP_URL
4. Stripe webhook → https://YOURDOMAIN/api/billing-webhook
   events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
5. Test with 4242 4242 4242 4242 then switch to sk_live_
