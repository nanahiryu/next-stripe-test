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
    return NextResponse.json(
      {
        error: "username or email is not found.",
      },
      {
        status: 400,
      }
    );
  }
  if (typeof username !== "string" || typeof email !== "string") {
    return NextResponse.json(
      {
        error: "username or email is not string.",
      },
      {
        status: 400,
      }
    );
  }
  // Stripeの処理を書く
  const stripe_secret_key = process.env.STRIPE_SECRET_KEY;
  if (!stripe_secret_key) {
    return NextResponse.json(
      {
        error: "Stripe secret key is not found.",
      },
      {
        status: 500,
      }
    );
  }
  const stripe = new Stripe(stripe_secret_key);
  // stripeのcustomerをemailで検索
  const customers = await stripe.customers.search({
    query: `email:\'${email}\'`,
  });
  if (customers.data.length > 0) {
    return NextResponse.json(
      {
        error: "customer already exists.",
      },
      {
        status: 400,
      }
    );
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
    return NextResponse.json(
      {
        error: "stripeID or createdName or createdEmail is not found.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json<CreateCustomerResponseData>(
    {
      stripeID: stripeID,
      name: createdName,
      email: createdEmail,
    },
    { status: 200 }
  );
};
