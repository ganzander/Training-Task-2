"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

const SelectInput = React.forwardRef(
  ({ className, options, placeholder, value, onChange, ...props }, ref) => {
    // Set a default placeholder message if placeholder is null, undefined, or empty
    const effectivePlaceholder = placeholder ?? "Select an option";

    return (
      <div className="p-[2px] rounded-lg transition duration-300 group/input">
        <select
          ref={ref}
          className={cn(
            `flex h-10 w-full border-none bg-white dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm placeholder:text-neutral-700 dark:placeholder:text-text-white/[0.5] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] transition duration-400`,
            className
          )}
          value={value ?? ""}
          onChange={onChange}
          {...props}
        >
          {/* Render placeholder as default option if defined */}
          {effectivePlaceholder && (
            <option value="" disabled hidden>
              {effectivePlaceholder}
            </option>
          )}

          {/* Map through options */}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-black dark:text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";
export { SelectInput };
