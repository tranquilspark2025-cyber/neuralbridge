import type React from "react"
import Image from "next/image"

export const Logo = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className="relative h-8 md:h-10">
      <Image
        src="/images/design-mode/Screenshot%202025-11-09%20at%2010.52.04.png"
        alt="NeuralBridge"
        width={240}
        height={48}
        className="h-full w-auto"
        priority
      />
    </div>
  )
}
