import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import MobileFilter from "./components/mobile-filter";
import getSubcategories from "@/actions/get-subcategories";
import Sidebar from "@/components/sidebar/sidebar";
import ProductList from "@/components/products-by-category";
import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";
import Image from "next/image";

export const revalidate = 0

interface CategoryPageProps {
  params: {
    categoryId: string;
    valueKey: string
  };
  searchParams: {
    colorId: string;
    sizeId: string;

  };
}
const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {

  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  })

  const sizes = await getSizes()
  const colors = await getColors()
  const category = await getCategory(params.categoryId)
  const subcategories = await getSubcategories({ categoryId: params.categoryId })
  console.log(category)


  const crumb = [
    {
      label: (
        <img src={'https://cdn-icons-png.flaticon.com/512/25/25694.png'} alt="Img" width={18} height={18}/>
      ),
      path: "/",
    },
    {
      label: `${category.name}`,
      path: "/courses/development",
    },
  ]



  return (
    <div className="bg-white font-roboto font-bold">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <Breadcrumbs items={crumb}/>
          <div className=" lg:grid lg:grid-cols-4 lg:gap-x-8">
            <MobileFilter sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Sidebar  category={category} subcategories={subcategories} />
              <Filter
                valueKey="sizeId"
                name="Sizes"
                data={sizes}
              />
              <Filter
                valueKey="colorId"
                name="Colors"
                data={colors}
              />
            </div>
            <div className="mt-6 lg:col-span-3 lg:mt-5">
              <h1 className="text-3xl mb-4">{category?.name}</h1>
              <p className="leading-snug text-lg mb-4">{category?.desc}</p>
              {subcategories.map((cat) => (
                <div key={cat.id}>
                  <h1 className="text-2xl mb-4 border-b-2 border-b-red-500 bg-red-500 text-white text-center">{cat.name}</h1>
                  <ProductList ids={cat.id} idCategory={category.id} categoryName={cat.name} />
                </div>
                
              ))}
              {/* {products.length === 0 && <Noresults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
};

export default CategoryPage;
