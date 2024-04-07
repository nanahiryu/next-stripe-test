import { SearchCustomerResponseData } from "@/types/functions/searchCustomer";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const GET = async (req: NextRequest) => {
  // reqのqueryからemailを取得
  const email = req.nextUrl.searchParams.get("email");
  // Stripeの処理を書く
  const stripe_secret_key = process.env.STRIPE_SECRET_KEY;
  if (!stripe_secret_key) {
    return NextResponse.error();
  }
  const stripe = new Stripe(stripe_secret_key);
  const customerList = await stripe.customers.list();
  console.log("customerList: ", customerList);
  // stripeのcustomerをemailで検索
  console.log("query: ", `email:\'${email}\'`);
  const customers = await stripe.customers.search({
    query: `email:\'${email}\'`,
  });
  if (customers.data.length == 0) {
    console.log("customer already exists. email: ", email);
    return NextResponse.error();
  }
  if (customers.data.length > 1) {
    console.log("customer is not found. email: ", email);
    return NextResponse.error();
  }
  console.log("customers: ", customers);
  const customer = customers.data[0];
  console.log("customer: ", customer);
  const stripeID = customer.id;
  const createdName = customer.name;
  const createdEmail = customer.email;

  if (!stripeID || !createdName || !createdEmail) {
    console.log("stripeID or createdName or createdEmail is not found.");
    return NextResponse.error();
  }

  return NextResponse.json<SearchCustomerResponseData>({
    stripeID: stripeID,
    name: createdName,
    email: createdEmail,
  });
};
