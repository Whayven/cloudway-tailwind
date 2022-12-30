import Head from 'next/head'

import {Card} from '@/components/Card'
import {Section} from '@/components/Section'
import {SimpleLayout} from '@/components/SimpleLayout'

function ToolsSection({children, ...props}) {
    return (<Section {...props}>
        <ul role="list" className="space-y-16">
            {children}
        </ul>
    </Section>)
}

function Tool({title, href, children}) {
    return (<Card as="li">
        <Card.Title as="h3" href={href}>
            {title}
        </Card.Title>
        <Card.Description>{children}</Card.Description>
    </Card>)
}

export default function Uses() {
    return (<>
        <Head>
            <title>Uses - Wayne Foster</title>
            <meta
                name="description"
                content="Software I use, gadgets I love, and other things I recommend."
            />
        </Head>
        <SimpleLayout
            title="Software I use, gadgets I love, and other things I recommend."
            intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
        >
            <div className="space-y-20">
                <ToolsSection title="Workstation">
                    <Tool title="16” MacBook Pro">
                        Transitioning from Windows, the Apple ecosystem is amazing for productivity and I&apos;ve never
                        heard the fans turn on a  single time, even under the incredibly heavy loads I put it
                        through.
                    </Tool>
                    <Tool title="Samsung 27” Curved Monitor">
                        A classic curved monitor for extra viewing pleasure.  It&apos;s at a reasonable price point
                        but makes some compromises in resolution and refresh rate to compensate. Still, I find it be a
                        great monitor for the price.
                    </Tool>
                    <Tool title="Logitech MX Master 2">
                        Something about all the gestures makes me feel like a wizard with
                        special powers. I really like feeling like a wizard with special
                        powers.
                    </Tool>
                </ToolsSection>
                <ToolsSection title="Development tools">
                    <Tool title="Visual Studio Code">
                        This isn&apos;t a full-blown IDE but VSCode is iconic and basically a staple in the toolkit of any developer.
                        With a variety of extensions, extensive customization options, shortcuts, and more, I find this to be one of
                        my most versatile programs that&apos;s capable of dealing with many problems outside of writing code.
                    </Tool>
                    <Tool title="iTerm2">
                        I’m honestly not even sure what features I get with this that
                        aren’t just part of the macOS Terminal but it’s what I use.
                    </Tool>
                </ToolsSection>
                <ToolsSection title="Design">
                    <Tool title="Figma">
                        We started using Figma as just a design tool but now it’s become
                        our virtual whiteboard for the entire company. Never would have
                        expected the collaboration features to be the real hook.
                    </Tool>
                </ToolsSection>
                <ToolsSection title="Productivity">
                    <Tool title="Notion">
                        This has been a great tool for Documentation and staying organized.  There are so many components
                        to take advantage of that also complement my notes really well.  I would recommend this to anyone, or
                        Evernote as an alternative (but it doesn&apos;t have as many components to use).
                    </Tool>
                </ToolsSection>
            </div>
        </SimpleLayout>
    </>)
}
