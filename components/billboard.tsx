import { Billboard as BillboaardType } from "@/types";

interface BillboardProps {
    data:BillboaardType
}

const Billboard:React.FC<BillboardProps> = ({
    data
}) => {
  return (
    <div className="overflow-hidden">
        <div className=" relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover" style={{ backgroundImage:`url(${data?.imageUrl})`}}>
            <div className="h-full w-full flex flex-col gap-y-8 absolute top-1/2 left-20">
                <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white shadow-black">
                    {data?.label}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Billboard