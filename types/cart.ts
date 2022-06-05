import { Product } from './product'

export type CartItem = Pick<Product, 'id' | 'title' | 'image' | 'price'> & {
  quantity: number
}
