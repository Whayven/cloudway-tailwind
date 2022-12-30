import {Card} from "@/components/Card";
import {formatDate} from "@/lib/formatDate";

export default function Article({article}) {
    return (
        <Card as="article">
            <Card.Title href={`/posts/${article.id}`}>
                {article.attributes.Title}
            </Card.Title>
            <Card.Eyebrow as="time" dateTime={article.attributes?.publishedAt} decorate>
                {formatDate(article.attributes.publishedAt)}
            </Card.Eyebrow>
            <Card.Description>{article.attributes.Description}</Card.Description>
            <Card.Cta>Read article</Card.Cta>
        </Card>
    )
}