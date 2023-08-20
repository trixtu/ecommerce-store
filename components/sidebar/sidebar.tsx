import React from 'react'
import SidebarMenu from './sidebar-menu'
import getCategories from '@/actions/get-categories'
import getSubcategories from '@/actions/get-subcategories'
import { Category, Subcategory } from '@/types'
import Contact from './contact'

interface SidebarProps {
    category:Category,
    subcategories:Subcategory[]
}
const Sidebar:React.FC<SidebarProps> = async({
    category,
    subcategories
}) => {


  return (
    <>
    <SidebarMenu category={category} subcategories={subcategories} valueKey='subCat'/>
    <Contact/>
    </>
  )
}

export default Sidebar