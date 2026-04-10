import { cn } from "@/lib/utils"
import { ForwardRefComponent, HTMLMotionProps, motion } from "motion/react"
import Link from "next/link"
import SmartImage from "./smart-image"

export interface ContentCardProps extends Omit<
  ForwardRefComponent<HTMLDivElement, HTMLMotionProps<"div">>,
  "$$typeof"
> {
  title: string
  url?: string
  onClick?: () => void
  image?: string
  index?: number
  classnames?: {
    motion?: string
    container?: string
    image?: string
    textContainer?: string
    text?: string
  }
}

export default function ContentCard(props: ContentCardProps) {
  const { classnames, ...motionProps } = props
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: props.index ? 0.4 + props.index * 0.1 : 0,
      }}
      viewport={{ once: true }}
      className={cn(classnames?.motion)}
      {...motionProps}
    >
      {props.url ? (
        <Link
          href={props.url}
          className={cn(
            "group relative overflow-hidden rounded-xl",
            props.classnames?.container
          )}
        >
          <Content {...props} />
        </Link>
      ) : (
        <button
          className={cn(
            "group relative w-full cursor-pointer overflow-hidden rounded-xl",
            props.classnames?.container
          )}
          onClick={props.onClick}
        >
          <Content {...props} />
        </button>
      )}
    </motion.div>
  )
}

export function Content(props: ContentCardProps) {
  return (
    <>
      <SmartImage
        src={props.image}
        alt={props.title}
        containerClassName={cn(
          "w-full aspect-video overflow-hidden rounded-xl",
          props.classnames?.image
        )}
        className="transition-transform duration-500 ease-in-out group-hover:scale-110"
        hideImageFallback
      />
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 transition-all duration-300 group-hover:bg-black/60",
          props.classnames?.textContainer
        )}
      >
        <h3
          className={cn(
            "line-clamp-2 text-center text-2xl font-semibold text-white transition-transform duration-300 group-hover:scale-110",
            props.classnames?.text
          )}
        >
          {props.title}
        </h3>
      </div>
    </>
  )
}
