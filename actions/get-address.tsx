import { Address } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/address`;

const getAddress = async (): Promise<Address[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getAddress;