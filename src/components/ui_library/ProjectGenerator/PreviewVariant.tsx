import { ComponentModel, Variant } from "../../../pages/ProjectGenerator"
import { PreviewButton } from "./GeneratedComponents/ui/button"
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
    // const [defaultValues, setDefaultValues] = useState(''); // Default color




    return (
        <div>
            {/* {componentName} */}
            <div
                // key={variantIndex}
                className="variant-container flex flex-col">
                <PreviewButton
                    variant={variant}
                    currentComponentModel={currentComponentModel}
                />
                {/* <h3>Variant {variantIndex + 1}: {variant.name}</h3> */}

                {/* Map through the key-value pairs in variant.value */}
                {/* {Object.entries(variant.value).map(([key, value], valueIndex) => (
                    <div key={valueIndex} className="flex gap-8 ">
                        <label className="w-32">
                            {key}
                        </label>
                        <div className="my-2">

                            <PreviewButton
                                buttonData={currentComponentModel}
                                className={`${value}`}
                            >{key}</PreviewButton>
                        </div>

                    </div>
                ))} */}
            </div>
        </div >
    )
}