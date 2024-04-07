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
  // stripeのcustomerをemailで検索
  const customers = await stripe.customers.search({
    query: `email:\'${email}\'`,
  });

  // 見つかったcustomerの個数でエラー処理
  if (customers.data.length == 0) {
    return NextResponse.json(
      {
        error: "customer not found. email: " + email,
      },
      {
        status: 500,
      }
    );
  }
  if (customers.data.length > 1) {
    return NextResponse.json(
      {
        error: "multiple customer found. email: " + email,
      },
      {
        status: 400,
      }
    );
  }

  const customer = customers.data[0];
  const stripeID = customer.id;
  const createdName = customer.name;
  const createdEmail = customer.email;

  if (!stripeID || !createdName || !createdEmail) {
    return NextResponse.json(
      {
        error: "stripeID or createdName or createdEmail is not found.",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json<SearchCustomerResponseData>({
    stripeID: stripeID,
    name: createdName,
    email: createdEmail,
  });
};
