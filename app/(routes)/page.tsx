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
  const billboard = await getBillboard("1aa0bce4-e250-4cef-9dda-633bc4ae12d8");

  const session = await getServerSession(authOptions);

  const users = await getUsers()
  const user = users.find(user => user.email === "cubitt12@gmail.com")


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
