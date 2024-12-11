import * as React from "react";
import { cn } from "@/lib/utils";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border w-full border-zinc-400/[0.5] bg-white text-zinc-950 shadow dark:border-zinc-400/[0.5] dark:bg-zinc-950 dark:text-zinc-50",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(
  ({ className, images, title, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    >
      {images && images.length > 0 && (
        <Carousel showThumbs={false} showStatus={false} infiniteLoop>
          {images.map((image, index) => (
            <div key={index} className="h-[200px] w-full">
              <img
                width={50}
                height={50}
                src={image}
                alt={`Slide ${index + 1}`}
                className="rounded-t-xl h-full w-full object-contain"
              />
            </div>
          ))}
        </Carousel>
      )}
      {title && (
        <h3 className="text-center font-bold text-lg mt-4 dark:text-zinc-50">
          {title}
        </h3>
      )}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold leading-none text-center tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-center gap-6 items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardFooter, CardTitle, CardContent };
