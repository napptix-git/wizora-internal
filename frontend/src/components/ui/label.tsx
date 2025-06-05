import * as React from "react" // Import everything from React
import * as LabelPrimitive from "@radix-ui/react-label" // Importing Radix UI's label component
import { cva, type VariantProps } from "class-variance-authority" // Utility for handling class variants

import { cn } from "@/lib/utils" // Utility function for combining class names

// Default styles for the Label component using class-variance-authority
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)
// Above class ensures:
// - Small font size
// - Medium font weight
// - Disabled input's label becomes faded and unclickable

// Creating the Label component using forwardRef so we can pass refs to it
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>, // Type of DOM element
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & // Props without `ref`
    VariantProps<typeof labelVariants> // Accept class variant props
>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref} // Ref passed to DOM element for direct access
      className={cn(labelVariants(), className)} // Merge base styles + any custom class passed
      {...props} // Spread other props like htmlFor, children etc.
    />
  )
)

// Set display name for better DevTools debugging
Label.displayName = LabelPrimitive.Root.displayName

// Export the Label so it can be used in forms, etc.
export { Label }
