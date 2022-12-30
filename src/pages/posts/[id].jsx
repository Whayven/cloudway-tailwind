import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { GET_POSTS } from '@/graphql/posts/queries'
import { GET_POST } from '@/graphql/posts/queries'
import { initializeApollo, addApolloState } from '@/util/apolloClient'
import moment from 'moment/moment'

import styles from '@/styles/Post.module.css'

export default function Post({ post }) {
  const formatDate = (date) => moment(date).format('dddd, MMMM Do YYYY')
  return (
    <>
      <div className="relative overflow-hidden py-16">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                {post?.data?.attributes?.Title}
              </span>
              <span className="block text-center text-lg font-semibold text-yellow-400">
                {formatDate(post?.data?.attributes?.publishedAt)}
              </span>
            </h1>
          </div>
          <div className="prose-lg prose-indigo prose mx-auto mt-6 text-gray-500 dark:text-zinc-400 w-1/2">
            <ReactMarkdown remarkPlugins={[remarkGfm]} ß>
              {post?.data?.attributes?.Content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  )
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticPaths() {
  const client = initializeApollo()
  const { data } = await client.query({
    query: GET_POSTS,
  })

  const paths = data.posts.data.map((post) => {
    return { params: { id: post.id } }
  })

  // Using fallback: "blocking" here enables preview mode for unpublished blog slugs
  // on production
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const client = initializeApollo()
  const blogPost = await client.query({
    query: GET_POST,
    variables: { postId: params.id },
  })

  // Add this with fallback: "blocking"
  // So that if we do not have a post on production,
  // the 404 is served
  if (!blogPost) {
    return {
      notFound: true,
    }
  }

  return addApolloState(client, {
    props: {
      post: blogPost.data.post,
    },
    revalidate: 1,
  })
}
