import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { ComponentModel, Variant } from '../../../../../pages/ProjectGenerator';

// Function to generate default variants dynamically
const generateDefaultVariants = (data: ComponentModel) => {
  const variants: { [key: string]: any } = {};

  data.variants?.forEach((variant) => {
    variants[variant.name] = variant.value;
  });

  return variants;
};

// Function to create variants dynamically based on the updated variants object
const createButtonVariants = (variants: { [key: string]: any }) =>
  cva('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0', {
    variants,
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  });

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof createButtonVariants> {
  asChild?: boolean;
  dynamicVariants: { [key: string]: any }; // Receive dynamicVariants as a prop
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, dynamicVariants, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const buttonVariants = createButtonVariants(dynamicVariants); // Use dynamicVariants here

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// PreviewButton Component
export const PreviewButton = ({
  currentComponentModel,
  variant
}: {
  currentComponentModel: ComponentModel,
  variant: Variant
}) => {
  const [dynamicVariants, setDynamicVariants] = React.useState<{ [key: string]: any }>({});

  console.log("dynamicVariants ---", dynamicVariants)
  // Function to generate dynamic variants from buttonData
  React.useEffect(() => {
    if (currentComponentModel) {
      const variants = generateDefaultVariants(currentComponentModel);
      setDynamicVariants(variants);
    }
  }, [currentComponentModel]);

  console.log("variant in PreviewButton: ", variant)
  const { name, value } = variant;

  return (
    <div>
      {/* Passing dynamicVariants to Button */}

      <div>
        {/* {componentName} */}
        <div
          // key={variantIndex}
          className="variant-container flex flex-col">

          {/* {
            Object.keys(variant).length === 0 ?
              "Empty" :
              Object.entries(variant?.value).map(([key, value], valueIndex) => (
                <div key={valueIndex} className="flex gap-8">
                  <label className="w-32">{key}</label>
                  <div className="my-2">
                    <Button className={`${value}`}>{key}</Button>
                  </div>
                </div>
              ))
          } */}



          <Button variant="secondary">
            Secondary
          </Button>


          {/* <div className="flex flex-wrap gap-4">
            {Object.entries(value).map(([key, styles]) => (
              <div key={key} className="flex gap-8">
                <label className="w-32">{key}</label>
                <div className="my-2">
                  <Button key={key} {...{ [name]: key }}>
                    {key}
                  </Button>
                </div>
              </div>
            ))}
          </div> */}


          {/* <div className="flex flex-wrap gap-4">
            {Object.entries(value).map(([key, styles]) => (
              <Button key={key} {...{ [name]: key }}>
                {key}
              </Button>
            ))}
          </div> */}

          {/* <h3>Variant {variantIndex + 1}: {variant.name}</h3> */}
          {/* {
            JSON.stringify(dynamicVariants) == '{ }' ?


              Object.entries(dynamicVariants?.value).map(([key, value], valueIndex) => (
                <div key={valueIndex} className="flex gap-8 ">
                  <label className="w-32">
                    {key}
                  </label>
                  <div className="my-2">

                    <Button
                      className={`${value}`}
                    >{key}</Button>
                  </div>

                </div>
              ))


              :
              "Empty"
          } */}
        </div>
      </div >


    </div>
  );
};

export default Button;
