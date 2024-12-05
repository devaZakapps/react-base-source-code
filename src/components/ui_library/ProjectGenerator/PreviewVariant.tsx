import { ComponentModel, Variant } from "../../../pages/ProjectGenerator"
// import { GenerateButtonComponent } from "./GeneratedComponents/generateComponents/generateButtonComponents"
// import { GenerateButtonComponent } from "./GeneratedComponents/generateComponents/generateButtonComponents"
// import { PreviewButton } from "./GeneratedComponents/ui/button"



export const PreviewComponent = ({ currentComponentModel, componentName, variant }: {
    currentComponentModel: ComponentModel
    componentName: string,
    variant: Variant
}) => {

    // const [primaryColor, setPrimaryColor] = useState('pink'); // Default color

    // useEffect(() => {
    //     // Dynamically update the CSS variable when primaryColor changes
    //     document.documentElement.style.setProperty('--primary-color', primaryColor);
    // }, [primaryColor]);

    console.log("variant: ", variant)
    console.log("currentComponentModel: ", currentComponentModel)
    // const [defaultValues, setDefaultValues] = useState(''); // Default color\

    // useEffect(() => {
    //     GenerateButtonComponent({
    //         prefix: "Button", suffix: "Component", data: currentComponentModel.variants
    //     })
    // }, [])


    // const inputData = [
    //     {
    //         name: "variant",
    //         value: {
    //             default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    //             destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    //             outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    //         },
    //     },
    //     {
    //         name: "size",
    //         value: {
    //             small: "py-1 px-2 text-xs",
    //             medium: "py-2 px-4 text-sm",
    //             large: "py-3 px-6 text-lg",
    //         },
    //     },
    // ];

    return (
        <div>
            {/* {componentName} */}
            <div
                // key={variantIndex}
                className="variant-container flex flex-col">
                {/* <PreviewButton
                    variant={variant}
                    currentComponentModel={currentComponentModel}
                /> */}
                {/* 
                <DynamicButton inputData={inputData} variant="default" size="small">
                    Default Small
                </DynamicButton> */}
                {/* <h3>Variant {variantIndex + 1}: {variant.name}</h3> */}

                {/* Map through the key-value pairs in variant.value */}


                {/* <Button variant={"default"}>Button</Button> */}

                {Object.entries(variant.value).map(([key, value], valueIndex) => (
                    <div key={valueIndex} className="flex gap-8 ">
                        <label className="w-32">
                            {key}
                        </label>
                        <div className="my-2">



                            <button
                                // buttonData={currentComponentModel}
                                className={`${value}`}
                            >{key}</button>
                        </div>

                    </div>
                ))}
            </div>
        </div >
    )
}