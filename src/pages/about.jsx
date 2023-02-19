import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import {initializeApollo} from "@/util/apolloClient";
import {GET_ABOUT} from "@/graphql/pages/queries";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";



function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-yellow-500 dark:text-zinc-200 dark:hover:text-yellow-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-yellow-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About({aboutPage}) {
  const coverUrl = process.env.NODE_ENV === 'development'  ? 'http://localhost:1337' + aboutPage?.attributes?.Cover?.data?.attributes?.url : aboutPage?.attributes?.Cover?.data?.attributes?.url;
  return (
    <>
      <Head>
        <title>About - Wayne Foster Jr</title>
        <meta
          name="description"
          content={aboutPage?.attributes?.Title}
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={coverUrl}
                alt="Wayne Foster Jr"
                sizes="(min-width: 1024px) 32rem, 20rem"
                width={640}
                height={640}
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                unoptimized={true}
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {aboutPage?.attributes?.Title}
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {aboutPage?.attributes?.Content}
              </ReactMarkdown>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href={aboutPage?.attributes?.instagram} icon={InstagramIcon} className="mt-4">
                Follow on Instagram
              </SocialLink>
              <SocialLink href={aboutPage?.attributes?.github} icon={GitHubIcon} className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href={aboutPage?.attributes?.linkedin} icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:waynefosterjr@cloud-way.dev"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                {aboutPage?.attributes?.email}
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const client = initializeApollo();
  const {data} = await client.query({
    query: GET_ABOUT
  });
  return {
    props: {
      aboutPage: data.aboutPage.data,
    },
  }
}
