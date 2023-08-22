import { User } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/users`;

const getUsers = async (): Promise<User[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getUsers;



