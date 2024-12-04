
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

export const GenerateButtonComponent = (prefix, suffix, reqData) => {

    let data = reqData.variants;

    const formattedJson = data.reduce((acc, item) => {
        const valueStrings = Object.entries(item.value)
            .map(
                ([key, val], index, arr) =>
                    `        ${key}: "${val}"${index === arr.length - 1 ? '' : ','}`
            )
            .join('\n');

        return (
            acc +
            `    ${item.name}: {\n${valueStrings}\n    }${item === data[data.length - 1] ? '' : ','}\n`
        );
    }, '');
    const formattedDefaultVariants = data.reduce((acc, variant) => {
        acc[variant.name] = "default";
        return acc;
    }, {});

    console.log("defaultVariants: ", formattedDefaultVariants)
    const variantNames = data.map(variant => variant.name);

    // The button component template
    const buttonComponent = `
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            ${formattedJson}
        },
        defaultVariants:  ${JSON.stringify(formattedDefaultVariants, null, 14)},
    }
);

export interface ButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className,  ${variantNames.length > 0 ? `${variantNames.join(',')},` : ''} asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({${variantNames.length > 0 ? `${variantNames.join(',')},` : ''} className }))}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName =  "${prefix}Button${suffix}";
export { Button as ${prefix}Button${suffix}, buttonVariants };`;
    // Convert `import.meta.url` to a file path
    const modulePath = fileURLToPath(import.meta.url);
    const outputDir = path.join(path.dirname(modulePath), '../..', 'output');

    // Ensure the `output` folder exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Define the path and content for the new file
    const filePath = path.join(outputDir, `${prefix}Button${suffix}.tsx`);

    // Write content to the file
    fs.writeFileSync(filePath, buttonComponent, 'utf8');
    return {
        status: 200,
        data: { message: 'Button component generated successfully', filePath }
    }
};

