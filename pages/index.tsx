import { Product } from 'types/product'
import { client } from 'app/api'
import { Products } from 'features/products/Products'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Sidebar } from 'components/Sidebar'
import { Cart } from 'features/Cart/Cart'
import { MAX_ITEMS_PER_PAGE } from 'features/products/productSlice'

let num = 0
let num_2 = 1
const baz = null

type HomeProps = {
  products: Product[]
}

const Home: NextPage<HomeProps> = ({ products }) => {
  console.log(num + num_2)
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Sidebar>
        <main className='flex justify-between h-screen overflow-x-hidden p-6'>
          <Products products={products} />
          <Cart />
        </main>
      </Sidebar>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = Number(query.page) || 1
  const limit = page * MAX_ITEMS_PER_PAGE
  const { data: products } = await client<Product[]>('/products', {
    params: { limit: `${limit}` },
  })
  const productForPage = products.slice(limit - MAX_ITEMS_PER_PAGE, limit)

  return { props: { products: productForPage } }
}

export default Home
