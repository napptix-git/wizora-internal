import * as React from "react" // Import everything from React

import { cn } from "@/lib/utils" // Utility function to join class names smartly

// Creating the Input component with forwardRef (to allow parent access to the input element)
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type} // Input type: "email", "password", "text", etc.
        ref={ref} // Ref is used to directly access this input from a parent if needed
        className={cn(
          // Default Tailwind styling for all input fields
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className // Merge any additional custom classes passed via props
        )}
        {...props} // Spread any other props (like value, onChange, etc.)
      />
    )
  }
)

// Setting display name for better debugging in React DevTools
Input.displayName = "Input"

// Export the component so it can be used in other files
export { Input }
