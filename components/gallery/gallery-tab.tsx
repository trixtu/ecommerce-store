import { cn } from '@/lib/utils'
import {Image as ImageType} from '@/types'
import {Tab} from '@headlessui/react'
import Image from 'next/image'

interface GalleryTabProps {
    image:ImageType
}

const GalleryTab:React.FC<GalleryTabProps> = ({
    image
}) => {
  return (
    <Tab className={"relative flex aspect-video cursor-pointer items-center justify-center bg-white"}>
        {({ selected}) => (
            <div>
                <span className='absolute h-full w-full aspect-square inset-0 overflow-hidden border border-neutral-300'>
                    <Image
                        fill
                        src={image.url}
                        priority={true}
                        sizes='100%'
                        alt=''
                        className=' object-cover object-center'
                    />
                </span>
                <span className={
                    cn(
                        "absolute inset-0 ring-2 ring-offset-2",
                        selected ? " ring-red-500" : "ring-transparent"
                    )
                }/>
            </div>
        )}
    </Tab>
  )
}

export default GalleryTab