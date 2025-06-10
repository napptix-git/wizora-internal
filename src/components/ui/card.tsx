import * as React from "react" // Import everything from React

import { cn } from "@/lib/utils" // Utility function to merge Tailwind classes

// This is the main Card wrapper component
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref} // Pass the ref to this div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm", // Default card styling
        className // Custom styles passed via props
      )}
      {...props} // Spread other props like id, onClick, etc.
    />
  )
)
Card.displayName = "Card" // Helps in debugging or DevTools

// CardHeader: Top section inside the card
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)} // Padding and spacing
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

// CardTitle: Big title heading inside the card
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight", // Large bold title
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

// CardDescription: Small text under title, if needed
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)} // Small, faded text
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

// CardContent: Main content of the card (form, info, etc.)
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

// CardFooter: Bottom section of the card (usually buttons)
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)} // Align items in a row
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

// Export all parts of the Card component
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
