import { ChevronRight, ChevronsRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export type CrumbItem = {
    label: ReactNode
    path: string
}

export type BreadcrumbsProps = {
    items: CrumbItem[]
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {

    return (
        <div className="flex gap-1 items-center my-4 min-w-[800px]">
            {items.length > 0 && items.map((crumb, i) => {
                const isLastItem = i === items.length - 1;
                if (!isLastItem) {
                    return (
                        <>
                            <Link
                                href={crumb.path}
                                key={i}
                                className=" text-neutral-500 hover:underline"
                            >
                                {crumb.label}
                            </Link>
                            {/* separator */}
                            <span className="text-neutral-500"><ChevronRight size={20}/> </span>
                        </>
                    );
                } else {
                    return crumb.label;
                }
            })}
        </div>
    );
}

export default Breadcrumbs