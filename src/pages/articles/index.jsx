import Head from 'next/head'
import Article from "@/components/Article";
import {SimpleLayout} from '@/components/SimpleLayout'
import {initializeApollo} from "@/util/apolloClient";
import {GET_ARTICLES} from "@/graphql/pages/queries";

export default function ArticlesIndex({articlesPage}) {
    return (
        <>
            <Head>
                <title>Articles - Wayne Foster</title>
                <meta
                    name="description"
                    content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
                />
            </Head>
            <SimpleLayout
                title="Writing on software design, company building, and the aerospace industry."
                intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
            >
                <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                    <div className="flex max-w-3xl flex-col space-y-16">
                        {articlesPage?.attributes?.posts?.data?.map((post, index) => (
                            <Article key={post.id} article={post}/>
                        ))}
                    </div>
                </div>
            </SimpleLayout>
        </>
    )
}

export async function getStaticProps() {
    const client = initializeApollo();
    const {data} = await client.query({
        query: GET_ARTICLES
    });
    return {
        props: {
            articlesPage: data.articlesPage.data,
        },
    }
}
