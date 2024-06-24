import React from 'react'

const WelcomeScreen = () => {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
        Hey there! 👋 Docusage is here to lend a hand.
        </h1>
        <p className="leading-normal text-muted-foreground">
        Tired of endless scrolling and skimming?  Don't worry, I'm a whiz at digging through documents!  I can summarize the main points, pull out specific data, or help you find that needle in a haystack. Let's make your document tasks a breeze!
        </p>
      </div>
    </div>
  )
}

export default WelcomeScreen