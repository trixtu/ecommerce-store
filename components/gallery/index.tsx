"use client";
import  Image  from "next/image";
import { Tab } from "@headlessui/react";
import { Image as ImageType } from "@/types";
import GalleryTab from "./gallery-tab";

interface GalleryProps {
    images:ImageType[]
}
const Gallery:React.FC<GalleryProps> = ({
    images
}) => {
  return (
    <Tab.Group as="div" className={"flex flex-col-reverse mb-4"}>
        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            <Tab.List className={"grid grid-cols-4 gap-6"}>
                {images.map((image)=>(
                    <GalleryTab key={image.id} image={image}/>
                ))}
            </Tab.List>
        </div>
        <Tab.Panels className={"aspect-video w-full"}>
            {images.map((image)=>(
                <Tab.Panel key={image.id}>
                    <div className=" aspect-video relative h-full w-full border border-neutral-300 overflow-hidden">
                        <Image
                            fill
                            sizes={"100%"}
                            src={image.url}
                            alt="Image"
                            className=" object-cover object-center"
                        />
                    </div>
                </Tab.Panel>
            ))}
        </Tab.Panels>
    </Tab.Group>
  )
};

export default Gallery;
