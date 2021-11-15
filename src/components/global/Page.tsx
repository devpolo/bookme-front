import type { NextPage } from "next"

import Head from "next/head"

const Page: NextPage = ({ children }) => {
  return (
    <>
      <Head>
        <title>Bookme</title>
        <meta name='description' content='Book me app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {children}
    </>
  )
}

export default Page
