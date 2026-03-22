import React from "react"
import clsx from "clsx"

type Variant = "primary" | "outline" | "glass"

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: Variant
  fullWidth?: boolean
  href?: string
  download?: string | boolean
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  href,
  download,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-8 py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"

  const variants: Record<Variant, string> = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-600/40",
    outline:
      "border border-white/20 hover:bg-white/10",
    glass:
      "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10",
  }

  const classes = clsx(
    baseStyles,
    variants[variant],
    fullWidth && "w-full",
    className
  )

  // If href exists → render anchor
  if (href) {
    return (
      <a
        href={href}
        download={download}
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    )
  }

  // Otherwise render button
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}