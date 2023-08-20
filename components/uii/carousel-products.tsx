"use client";

import { Product } from "@/types";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../ui/product-card";
import CategoryCard from "../ui/category-card";

interface CarouselProductsProps {
  items: Product[];
    title:string
}
const CarouselProducts: React.FC<CarouselProductsProps> = ({
  items,
  title
}) => {
  return (
    <>
    <div className="space-y-4">
    <h1 className="font-bold text-3xl">{title}</h1>
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass="products-carousel"
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 4,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {items.length > 0 &&
        items.map((item) => (
          <div className=" gap-6" key={item.id}>
            <CategoryCard data={item} />
          </div>
        ))}
    </Carousel>
    </div>
    </>
  );
};

export default CarouselProducts;
