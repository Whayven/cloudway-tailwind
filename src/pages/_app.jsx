import { useEffect, useRef } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import {initializeApollo} from "@/util/apolloClient";
import {GET_HEADER} from "@/graphql/pages/queries";

import '@/styles/tailwind.css'
import 'focus-visible'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router, header }) {
  let previousPathname = usePrevious(router.pathname)
  console.log('***app: ' + header);
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <Header header={header}  />
        <main>
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const client = initializeApollo();
  const {data} = await client.query({
    query: GET_HEADER
  });
  return {
    props: {
      header: data.header.data,
    },
  }
}
