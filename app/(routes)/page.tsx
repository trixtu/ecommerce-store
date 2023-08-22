import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CarouselProducts from "@/components/uii/carousel-products";
import getUsers from "@/actions/get-users";


export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const productsCarousel = await getProducts({ isFeatured: true })
  const billboard = await getBillboard("c5aaa97e-301e-4981-ba5e-7ef25ddb83ea");

  const session = await getServerSession(authOptions);

  const users = await getUsers()
  const user = users.find(user=> user.email === "cubitt12@gmail.com")

  
  return (
    <>
      <Billboard data={billboard} />
      <Container>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 mb-5">
          <CarouselProducts items={productsCarousel} title={"Featured Products"} />
        </div>

        <p>{user?.email}</p>
      </Container>
    </>
  );
};

export default HomePage;
