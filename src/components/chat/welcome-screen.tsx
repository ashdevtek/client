import React from 'react'

const WelcomeScreen = () => {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
        Hey there! 👋 Docusage is here to lend a hand.
        </h1>
        <p className="leading-normal text-muted-foreground">
            Step into the realm of possibilities with your trusty chat bot! From troubleshooting to trivia, I'm equipped to handle it all.
            Send your query my way, and let's make magic happen!
        </p>
      </div>
    </div>
  )
}

export default WelcomeScreen