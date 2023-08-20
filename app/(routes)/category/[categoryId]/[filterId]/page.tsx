import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Container from "@/components/ui/container";

import getSubcategories from "@/actions/get-subcategories";
import Sidebar from "@/components/sidebar/sidebar";
import MobileFilter from "../components/mobile-filter";
import Filter from "../components/filter";
import getSubcategory from "@/actions/get-subcategory";
import Noresults from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";


export const revalidate = 0

interface CategoryPageProps {
    params: {
        categoryId: string;
        filterId: string
        valueKey: string
    };
    searchParams: {
        colorId: string;
        sizeId: string;

    };
}
const FilterPage: React.FC<CategoryPageProps> = async ({
    params,
    searchParams
}) => {

    const products = await getProducts({
        categoryId: params.filterId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId,
    })

    const sizes = await getSizes()
    const colors = await getColors()
    const category = await getCategory(params.categoryId)
    const subcategories = await getSubcategories({ categoryId: params.categoryId })
    const subcategory = await getSubcategory(params.filterId)

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
            label: `${subcategory?.name}`,
            path: "/courses/development",
        },
    ]

    return (
        <div className="bg-white font-roboto font-bold">
            <Container>

                {/* <Billboard data={category.billboard}/> */}
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                <Breadcrumbs items={crumb} />
                    <div className=" lg:grid lg:grid-cols-4 lg:gap-x-8">
                        <MobileFilter sizes={sizes} colors={colors} />
                        <div className="hidden lg:block">
                            <Sidebar category={category} subcategories={subcategories} />
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
                            <h1 className="text-3xl mb-4">{subcategory?.name}</h1>
                            {products.length === 0 && <Noresults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
                                    <>
                                        <ProductCard key={item.id} data={item} />
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
};

export default FilterPage;
