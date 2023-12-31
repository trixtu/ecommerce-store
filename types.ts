import { Decimal } from '@prisma/client/runtime/library'

export interface Billboard {
  id: string
  label: string
  imageUrl: string
}

export interface Category {
  id: string
  name: string
  desc: string
  billboard: Billboard
}

export interface Subcategory {
  id: string
  name: string
  category: Category
  categoryId: string
}

export interface Product {
  id: string
  category: Category
  name: string
  price: any
  quantity: any
  isFeatured: boolean
  size: Size
  color: Color
  images: Image[]
}

export interface Image {
  id: string
  url: string
}

export interface Size {
  id: string
  name: string
  value: string
}

export interface Color {
  id: string
  name: string
  value: string
}

export interface User {
  id: string
  email: string
  password: string
  name?: string
  vorname?: string
  nachname?: string
  stripeCustomerId?: string
  isActive: boolean
}

export interface Address {
  id: string
  userId: string
  firma?: string
  telefon?: string
  street?: string
  stadt?: string
  postzahl?: string
  land?: string
}

export type SwiperItemType = {
  imageSrc: string
  imageAlt: string
}

export type Film = {
  title: string
  director: string
  plot: string
  slug: string
}

export type session = {
  id: string
  sessionToken: string
  userId: string
  expires: Date
}
