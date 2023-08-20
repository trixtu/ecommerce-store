import { User } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/users`;

const getUsers = async (id: string): Promise<User> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getUsers;