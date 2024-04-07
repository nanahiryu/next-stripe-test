import {
  CreateCustomerRequestData,
  CreateCustomerResponseData,
} from "@/types/functions/createCustomer";
import { Stripe } from "stripe";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  // reqからusername, emailを取得
  const { username, email }: CreateCustomerRequestData = await req.json();
  if (!username || !email) {
    console.log("username or email is not found.");
    return NextResponse.error();
  }
  if (typeof username !== "string" || typeof email !== "string") {
    console.log("username or email is not string.");
    return NextResponse.error();
  }
  // Stripeの処理を書く
  const stripe_secret_key = process.env.STRIPE_SECRET_KEY;
  if (!stripe_secret_key) {
    return NextResponse.error();
  }
  const stripe = new Stripe(stripe_secret_key);
  // stripeのcustomerをemailで検索
  const customers = await stripe.customers.search({
    query: `email:\'${email}\'`,
  });
  if (customers.data.length > 0) {
    console.log("customer already exists. email: ", email);
    return NextResponse.error();
  }

  // stripeのcustomerを作成
  const res = await stripe.customers.create({
    name: username,
    email: email,
  });
  const stripeID = res.id;
  const createdName = res.name;
  const createdEmail = res.email;

  if (!stripeID || !createdName || !createdEmail) {
    console.log("stripeID or createdName or createdEmail is not found.");
    return NextResponse.error();
  }

  return NextResponse.json<CreateCustomerResponseData>({
    stripeID: stripeID,
    name: createdName,
    email: createdEmail,
  });
};
