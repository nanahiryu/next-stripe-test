export type CreateCustomerRequestData = {
  username: string;
  email: string;
};

export type CreateCustomerResponseData = {
  stripeID: string;
  name: string;
  email: string;
};
