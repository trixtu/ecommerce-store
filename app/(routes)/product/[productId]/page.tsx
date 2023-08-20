import getCategory from "@/actions/get-category";
import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import getSubcategories from "@/actions/get-subcategories";
import getSubcategory from "@/actions/get-subcategory";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/products-list";
import RelatedProducts from "@/components/related-products";
import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";
import Container from "@/components/ui/container";

interface ProductPageProps {
  params: {
    productId: string;
    categoryId: string
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const sugestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  const subcategory = await getSubcategory(product.category.id)
  const category = await getCategory(subcategory.categoryId)



  const crumb = [
    {
      label: (
        <img src={'https://cdn-icons-png.flaticon.com/512/25/25694.png'} alt="Img" width={18} height={18} />
      ),
      path: "/",
    },
    {
      label: `${category?.name}`,
      path: `/category/${category?.id}`,
    },
    {
      label: `${product.category.name}`,
      path: `/category/${category?.id}/${product?.category?.id}`,
    },
    {
      label: `${product?.name}`,
      path: "/courses/development",
    },
  ]

  return (
    <div className="bg-white font-roboto">
      <Container>

        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumb} />
          <div className=" lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8">
            <div className="col-span-2">
              <h1 className="text-2xl font-bold text-neutral-700 mb-4">{product.name}</h1>
              <Gallery images={product.images} />
              <Info data={product}/>
            </div>
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <div>
                <RelatedProducts idProduct={product.id} title="Folgende Produkte könnten Sie auch interessieren" items={sugestedProducts}/>
              </div>
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Related Products" items={sugestedProducts}  />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
