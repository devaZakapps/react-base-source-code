
import { useEffect, useState } from "react"
import { ComponentModel } from "../../../pages/ProjectGenerator"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Eye, Pencil, Plus, Save, X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../@/components/ui/dialog"

import { PreviewComponent } from "./PreviewVariant"


export const AddVariants = ({
    handleAddVariantSave,
    dependentComponentsArray,
    componentsSelectedArray,
    selectedComponentModel }:
    {
        dependentComponentsArray: string[],
        componentsSelectedArray: string[],
        handleAddVariantSave: any,
        selectedComponentModel: ComponentModel[]
    }) => {

    const [selectedComponentModelData, setSelectedComponentModel] = useState<ComponentModel[]>([])

    const [currentComponentModel, setCurrentComponentModel] = useState<ComponentModel>()


    useEffect(() => {
        console.log("inside addVariants selectedComponentModel: ", selectedComponentModel)
        console.log("inside addVariants dependentComponentsArray: ", dependentComponentsArray)
        console.log("inside addVariants componentsSelectedArray: ", componentsSelectedArray)
        filterComponentsByVariantsData(selectedComponentModel)
    }, [selectedComponentModel])



    const filterComponentsByVariantsData = (selectedComponentModel: ComponentModel[]) => {

        const variantComponents = selectedComponentModel.filter((item) => item.isVariant)
        setSelectedComponentModel(variantComponents)
        setCurrentComponentModel(variantComponents[0])

    }

    const handleComponentSelection = (item: string) => {
        const filteredComponents = selectedComponentModelData.filter((component: ComponentModel) =>
            component.value == item
        );
        setCurrentComponentModel(filteredComponents[0])
    }


    const handleVariantKeyChange = (variantIndex: number, newName: string) => {

        const updatedVariants = currentComponentModel?.variants?.map((variant, i) =>
            i === variantIndex ? { ...variant, name: newName } : variant
        );

        setCurrentComponentModel({
            ...currentComponentModel,
            variants: updatedVariants
        });
        // 
    }


    const handleAddVariantProp = () => {
        const tempObject = { ...currentComponentModel } as ComponentModel;; // Clone the current component model to avoid direct mutation
        const tempVariant = {
            name: `variant_` + (tempObject?.variants?.length ?? 0 + 1),
            value: {
                default: ""
            },
            isSaved: false
        };

        tempObject.variants = [...(tempObject.variants || []), tempVariant]; // Ensure variants is initialized as an array

        setCurrentComponentModel(tempObject); // Set the updated object as the new state
    }


    const handleVariantValueKeyChange = (variantIndex: number, valueIndex: number, newKey: string) => {

        // Make a shallow copy of the variants array to avoid direct mutation of state
        const updatedVariants = [...currentComponentModel?.variants];

        // Access the specific variant
        const variant = updatedVariants[variantIndex];

        // Create a shallow copy of the value object
        const updatedValue = { ...variant.value };

        // Get the current list of keys in the value object
        const keys = Object.keys(updatedValue);

        // Find the current key at the given index
        const oldKey = keys[valueIndex];

        // If the oldKey is different from the newKey, update the key in the value object
        if (oldKey !== newKey) {
            // Step 1: Create a new object to preserve order
            const newValue = {};

            // Step 2: Copy all the keys before the updated key
            for (let i = 0; i < keys.length; i++) {
                if (i === valueIndex) {
                    // Step 3: Add the new key (after removing the old one)
                    newValue[newKey] = updatedValue[oldKey];
                } else if (keys[i] !== oldKey) {
                    // Step 4: Add other existing keys without changing their order
                    newValue[keys[i]] = updatedValue[keys[i]];
                }
            }

            // Replace the old value object with the updated one
            variant.value = newValue;
        }

        // Update the state with the modified variant
        setCurrentComponentModel({
            ...currentComponentModel,
            variants: updatedVariants,
        });
    };

    const handleAddEmptyValueObject = (variantIndex: number) => {
        // Make a shallow copy of the variants array to avoid direct mutation of state
        if (!currentComponentModel?.variants) {
            console.error('Variants are not available');
            return;  // Exit early or handle this case
        }
        const updatedVariants = [...currentComponentModel.variants];

        // Access the variant and its value object
        const variant = updatedVariants[variantIndex];
        const value = variant.value;

        // // Generate a new unique key (you can also use a counter or timestamp if preferred)
        // const newKey = `newKey_${Date.now()}`;

        // Get the length of the value object
        const valueLength = Object.keys(variant.value).length;

        // Generate a new key based on the length of the value object
        const newKey = `custom${valueLength}`;

        // Add an empty object to the value object
        value[newKey] = "";

        // Update the state with the modified variant
        setCurrentComponentModel({
            ...currentComponentModel,
            variants: updatedVariants,
        });
    };

    const handleDeleteVariant = (variantIndex: number) => {
        // Ensure variants exist before proceeding
        if (!currentComponentModel?.variants) {
            console.error('Variants are not available');
            return;
        }

        const updatedVariants = currentComponentModel.variants.filter(
            (_, index) => index !== variantIndex // Filter out the variant at variantIndex
        );

        // Update the state with the modified variants array
        setCurrentComponentModel({
            ...currentComponentModel,
            variants: updatedVariants,
        });
    };

    const handleVariantValueChange = (variantIndex: number, key: string, newValue: string) => {
        const updatedVariants = currentComponentModel?.variants?.map((variant, i) => {
            if (i === variantIndex) {
                return {
                    ...variant,
                    value: {
                        ...variant.value,
                        [key]: newValue // Dynamically update the specific key within value
                    }
                };
            }
            return variant;
        });

        setCurrentComponentModel({
            ...currentComponentModel,
            variants: updatedVariants
        });
    };

    const handleDeleteValueObject = (variantIndex: number, valueKey: string) => {
        // Ensure variants exist before proceeding
        if (!currentComponentModel?.variants) {
            console.error('Variants are not available');
            return;
        }

        // Clone the variants array to avoid direct mutation
        const updatedVariants = [...currentComponentModel.variants];

        // Find the variant to update
        const variant = updatedVariants[variantIndex];

        // Clone the value object to avoid direct mutation
        const updatedValue = { ...variant.value };

        // Check if there is more than one key and if it's not the 'default' key
        const valueKeys = Object.keys(updatedValue);

        // Prevent deletion if the object has only the 'default' key
        if (valueKeys.length === 1 && valueKeys[0] !== 'default') {
            alert('At least one value must remain, and the key must be "default"!');
            return;
        }

        // If the key to be deleted is 'default', or there are other keys, proceed with deletion
        if (valueKey !== 'default') {
            delete updatedValue[valueKey]; // Delete the specific key-value pair
        }

        // Update the variant's value with the modified value object
        variant.value = updatedValue;

        // Update the state with the modified variants array
        setCurrentComponentModel({
            ...currentComponentModel,
            variants: updatedVariants,
        });
    };

    const handleEditClick = (variantIndex: number) => {

        // Create a shallow copy of the variants array to avoid direct mutation of state
        const updatedVariants = [...currentComponentModel?.variants];

        // Access the specific variant
        const variant = updatedVariants[variantIndex];

        // Update the isSaved to false (indicating edit mode)
        variant.isSaved = false;

        // Update the state with the modified variant
        setCurrentComponentModel({
            ...currentComponentModel,
            variants: updatedVariants,
        });
    };

    const handleSaveClick = (variantIndex: number) => {

        // Create a shallow copy of the variants array to avoid direct mutation of state
        const updatedVariants = [...currentComponentModel?.variants];

        // Access the specific variant
        const variant = updatedVariants[variantIndex];

        // Update the isSaved to true (indicating saved state)
        variant.isSaved = true;

        // Update the state with the modified variant
        setCurrentComponentModel({
            ...currentComponentModel,
            variants: updatedVariants,
        });
    };

    const isSaveEnabled = () => {
        return !currentComponentModel?.variants?.every(variant => variant.isSaved === true);
    }



    return (
        <div className="flex">
            <div className="w-[15%] p-2 flex flex-col ">
                {
                    selectedComponentModelData.map((item: ComponentModel, index) => {
                        return (

                            <div
                                className={`${currentComponentModel?.value == item.value ? "bg-[#3b87f2] text-white" : ""}`}
                                key={index}
                                onClick={() => { handleComponentSelection(item.value) }}
                            >
                                {item.isVariant ? item.name : ""}
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-[100%] p-2 ">
                <h3>Title: {currentComponentModel?.name}</h3>
                <div>
                    <div className="my-2">
                        <div className="flex gap-2 items-center my-2">
                            <h4>Variant Props</h4>
                            <Button variant={"icon"}
                                onClick={handleAddVariantProp}
                            ><Plus /></Button>
                        </div>


                        {
                            currentComponentModel?.variants?.map((variant, variantIndex) => {
                                return (
                                    <div key={variantIndex} className="flex flex-col gap-2">
                                        <div className="flex gap-1 items-center">
                                            <span>Key: </span>
                                            <Input
                                                variant={'primary'}
                                                disabled={variant.isSaved}
                                                value={variant.name}
                                                onChange={(event) => handleVariantKeyChange(variantIndex, event.target.value)}
                                            ></Input>

                                            <Dialog>
                                                <DialogTrigger>
                                                    <Button variant={"icon"} >
                                                        <Eye />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        {currentComponentModel?.variants && currentComponentModel.variants[variantIndex] && (
                                                            <>
                                                                <DialogTitle>{variant.name.toUpperCase()} </DialogTitle>
                                                                <DialogDescription className="min-h-9 min-w-10 flex flex-col gap-7">
                                                                    <PreviewComponent
                                                                        currentComponentModel={currentComponentModel}
                                                                        componentName={currentComponentModel.name}
                                                                        variant={currentComponentModel.variants[variantIndex]}
                                                                    >
                                                                    </PreviewComponent>

                                                                </DialogDescription>
                                                            </>

                                                        )}

                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>

                                            {
                                                variant.isSaved ?
                                                    <Button variant={"icon"}
                                                        onClick={() => handleEditClick(variantIndex)}
                                                    ><Pencil></Pencil></Button>
                                                    :
                                                    <Button variant={"icon"}
                                                        onClick={() => handleSaveClick(variantIndex)}
                                                    ><Save></Save></Button>

                                            }
                                            <Button variant={"icon"}
                                                onClick={() => handleDeleteVariant(variantIndex)} // Call the delete function
                                            ><X /></Button>
                                        </div>
                                        <div
                                            className="w-[100%">
                                            {Object.entries(variant.value).map(([key, value], index, array) => (
                                                <div
                                                    className="w-[100%]"
                                                    key={index}
                                                    style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                                    <Input
                                                        variant={'primary'}
                                                        type="text"
                                                        value={key}
                                                        disabled={key === "default" || variant.isSaved}
                                                        placeholder="Key"
                                                        className="w-[30%]"
                                                        onChange={(event) => handleVariantValueKeyChange(variantIndex, index, event.target.value)} // Handle key change

                                                    />
                                                    <Input
                                                        className="w-[70%]"
                                                        variant={'primary'}
                                                        type="text"
                                                        value={value}
                                                        placeholder="Value"
                                                        disabled={variant.isSaved}

                                                        onChange={(event) => handleVariantValueChange(variantIndex, key, event.target.value)}
                                                    />
                                                    {/* <Button variant={"icon"} ><Eye /></Button> */}
                                                    {/* <Button variant={"icon"}><Pencil></Pencil></Button> */}
                                                    {/* <Button variant={"icon"} ><Save></Save></Button> */}
                                                    {
                                                        variant.isSaved ?
                                                            ""
                                                            :
                                                            <>
                                                                {index === array.length - 1 && (
                                                                    <Button variant={"icon"}
                                                                        disabled={key.trim() == "" || value.trim() == ""}
                                                                        onClick={() => handleAddEmptyValueObject(variantIndex)}
                                                                    ><Plus /></Button>
                                                                )}

                                                                <Button variant={"icon"}

                                                                    className={
                                                                        `${key == "default" ? "hidden" : ""}`
                                                                    }
                                                                    onClick={() => handleDeleteValueObject(variantIndex, key)} // Call delete value object
                                                                ><X /></Button>
                                                            </>
                                                    }


                                                    {/* <Button variant={"icon"}
                                                        onClick={() => handleAddEmptyValueObject(variantIndex)}
                                                    ><Plus /></Button> */}

                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                )
                            })

                        }
                        <div>
                            <Button
                                variant={"primary"}
                                size={"sm"}
                                disabled={isSaveEnabled()}
                                // onClick={handleAddVariantSave(currentComponentModel?.name, currentComponentModel)}
                                onClick={() => {
                                    handleAddVariantSave(currentComponentModel?.name, currentComponentModel?.variants)
                                }}
                            >Save</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}