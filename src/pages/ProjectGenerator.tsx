import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
} from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../@/components/ui/tabs';
import { Dependencies } from '../components/ui_library/ProjectGenerator/ComponentDependencies';
import { AddVariants } from '../components/ui_library/ProjectGenerator/AddVariants';
import { getProjectDetailsApi } from '../api/generateProjectModal';
import { GetProjectDetailsRes } from '../type/data/generateProject';
import { Input } from '../components/ui/input';



export interface ComponentModel {
  name: string
  value: string
  installCmd: string
  component: string
  dependencies: Dependencies
  configFiles: ConfigFile[]
  isVariant: boolean
  variants?: Variant[];
}

export interface Variant {
  name: string;
  value: Record<string, string>;
  isSaved: boolean

}

export interface Dependencies {
  components: string[]
  hooks: string[]
  external: string[]
}

export interface ConfigFile {
  fileName: string
  changes: string
}

export const SampleComponentModelData: ComponentModel[] = [
  {
    name: "Sidebar",
    value: "sidebar",
    installCmd: "npx shadcn@latest add sidebar",
    component: "sidebar",
    dependencies: {
      components: [
        "button",
        "separator",
        "sheet",
        "tooltip",
        "input",
        "skeleton",
      ],
      hooks: [
        "use-mobile"
      ],
      external: [
        "@radix-ui/react-dialog",
        "@radix-ui/react-separator",
        "@radix-ui/react-slot",
        "@radix-ui/react-tooltip"
      ]
    },
    configFiles: [
      {
        fileName: "index.css",  // Path to the CSS file to modify
        changes: `
          :root
            --sidebar-background: 0 0% 98%;
              --sidebar-foreground: 240 5.3% 26.1%;
              --sidebar-primary: 240 5.9% 10%;
              --sidebar-primary-foreground: 0 0% 98%;
              --sidebar-accent: 240 4.8% 95.9%;
              --sidebar-accent-foreground: 240 5.9% 10%;
              --sidebar-border: 220 13% 91%;
              --sidebar-ring: 217.2 91.2% 59.8%;

          .dark
              --sidebar-background: 240 5.9% 10%;
              --sidebar-foreground: 240 4.8% 95.9%;
              --sidebar-primary: 224.3 76.3% 48%;
              --sidebar-primary-foreground: 0 0% 100%;
              --sidebar-accent: 240 3.7% 15.9%;
              --sidebar-accent-foreground: 240 4.8% 95.9%;
              --sidebar-border: 240 3.7% 15.9%;
              --sidebar-ring: 217.2 91.2% 59.8%;
        `
      },
      {
        fileName: "tailwind.config.js",  // Path to the Tailwind config file
        changes: `
        sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
        `
      }
    ],
    isVariant: false,
    variants: [],
  },
  {
    name: "Button",
    value: "button",
    installCmd: "npx shadcn@latest add button",
    component: "button",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-slot"
      ]
    },
    configFiles: [],
    isVariant: true,
    variants: [
      {
        name: "variant",
        value: {
          default:
            'font-bold bg-[#092C4C] text-white hover:bg-[#061F35]  active:bg-[#092C4C]/60 disabled:bg-[#E0E0E0]',
          // outline:
          //   'font-bold text-black border-2 border-[#092C4C] hover:bg-[#092C4C]/20 active:bg-[#092C4C]/60 active:border-[#092C4C]/30 disabled:border-[#BDBDBD] disabled:border-1 disabled:text-[#E0E0E0]',
          // iconText:
          //   'font-bold text-white bg-[#092C4C] hover:bg-[#061F35] active:bg-[#092C4C]/70 disabled:bg-[#E0E0E0] disabled:text-white',
          // icon: 'text-white font-bold bg-[#092C4C] hover:bg-[#061F35] active:bg-[#092C4C]/60 disabled:bg-[#E0E0E0] disabled:text-white',
        },
        isSaved: true
      },
      {
        name: "size",
        value: {
          default: 'w-[241px] h-12 rounded-lg px-4 py-2',
          // sm: 'w-[275px] h-[55px] rounded-lg px-3',
          // md: 'w-[310px] h-[62px] rounded-lg',
          // lg: 'w-[344px] h-[68px] rounded-lg px-8',
          // iconText: 'w-[283px] h-[55px] rounded-lg',
          // icon: 'h-14 w-14 rounded-full',
        },
        isSaved: true
      },
    ],
  },
  {
    name: 'Accordion',
    value: 'accordion',
    installCmd: '',
    component: "accordion",
    dependencies: {
      components: [],
      hooks: [],
      external: ["@radix-ui/react-accordion"]
    },
    configFiles: [
      {
        fileName: "tailwind.config.js",  // Path to the Tailwind config file
        changes: `
        keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
        `
      }
    ],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Alert',
    value: 'alert',
    installCmd: '',
    component: 'alert.tsx',
    dependencies: {
      components: [],
      hooks: [],
      external: []
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'AlertDialog',
    value: 'alertdialog',
    installCmd: '',
    component: "alert-dialog",
    dependencies: {
      components: [
        "button"
      ],
      hooks: [],
      external: [
        "@radix-ui/react-alert-dialog",
        "@radix-ui/react-slot"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'AspectRatio',
    value: 'aspectratio',
    installCmd: '',
    component: "aspect-ratio",
    dependencies: {
      components: [],
      hooks: [],
      external: ["@radix-ui/react-aspect-ratio"]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Avatar',
    value: 'avatar',
    installCmd: '',
    component: "avatar",
    dependencies: {
      components: [],
      hooks: [],
      external: ["@radix-ui/react-avatar"]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Badge',
    value: 'badge',
    installCmd: '',
    component: "badge",
    dependencies: {
      components: [],
      hooks: [],
      external: []
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Breadcrumb',
    value: 'breadcrumb',
    installCmd: '',
    component: "breadcrumb",
    dependencies: {
      components: [],
      hooks: [],
      external: ["@radix-ui/react-slot"]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Calendar',
    value: 'calendar',
    installCmd: '',
    component: "calendar",
    dependencies: {
      components: [
        "button"
      ],
      hooks: [],
      external: [
        "@radix-ui/react-slot",
        "date-fns",
        "react-day-picker"
      ]
    },
    configFiles: [],
    isVariant: true,
    variants: [],
  },
  {
    name: 'Card',
    value: 'card',
    installCmd: '',
    component: "card",
    dependencies: {
      components: [],
      hooks: [],
      external: []
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Carousel',
    value: 'carousel',
    installCmd: '',
    component: "carousel",
    dependencies: {
      components: [
        "button"
      ],
      hooks: [],
      external: [
        "@radix-ui/react-slot",
        "embla-carousel-react"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Chart',
    value: 'chart',
    installCmd: '',
    component: "chart",
    dependencies: {
      components: [
        "card"
      ],
      hooks: [],
      external: [
        "recharts"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Checkbox',
    value: 'checkbox',
    installCmd: '',
    component: "checkbox",
    dependencies: {
      components: [],
      hooks: [],
      external: ["@radix-ui/react-checkbox"]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Collapsible',
    value: 'collapsible',
    installCmd: '',
    component: "collapsible",
    dependencies: {
      components: [],
      hooks: [],
      external: ["@radix-ui/react-collapsible"]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Combobox',
    value: 'combobox',
    installCmd: '',
    component: "",
    dependencies: {
      components: [],
      hooks: [],
      external: []
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Command',
    value: 'command',
    installCmd: '',
    component: "command",
    dependencies: {
      components: [
        "dialog"
      ],
      hooks: [],
      external: [
        "@radix-ui/react-dialog",
        "cmdk"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'ContextMenu',
    value: 'contextmenu',
    installCmd: '',
    component: "context-menu",
    dependencies: {
      components: [],
      hooks: [],
      external: ["@radix-ui/react-context-menu"]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'DataTable',
    value: 'datatable',
    installCmd: '',
    component: "",
    dependencies: {
      components: [],
      hooks: [],
      external: []
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'DatePicker',
    value: 'datepicker',
    installCmd: '',
    component: "",
    dependencies: {
      components: [],
      hooks: [],
      external: []
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Dialog',
    value: 'dialog',
    installCmd: '',
    component: "dialog",
    dependencies: {
      components: [],
      hooks: [],
      external: ["@radix-ui/react-dialog"]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Drawer',
    value: 'drawer',
    installCmd: '',
    component: "drawer",
    dependencies: {
      components: [],
      hooks: [],
      external: ["@radix-ui/react-dialog",
        "vaul"]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'DropdownMenu',
    value: 'dropdownmenu',
    installCmd: '',
    component: "dropdown-menu",
    dependencies: {
      components: [],
      hooks: [],
      external: []
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Form',
    value: 'form',
    installCmd: '',
    component: "",
    dependencies: {
      components: [],
      hooks: [],
      external: []
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'HoverCard',
    value: 'hovercard',
    installCmd: '',
    component: "hover-card",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-hover-card"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Input',
    value: 'input',
    installCmd: '',
    component: "input",
    dependencies: {
      components: [],
      hooks: [],
      external: []
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'InputOTP',
    value: 'inputotp',
    installCmd: '',
    component: "input-otp",
    dependencies: {
      components: [],
      hooks: [],
      external: ["input-otp"]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Label',
    value: 'label',
    installCmd: '',
    component: "label",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-label"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Menubar',
    value: 'menubar',
    installCmd: '',
    component: "menubar",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-menubar"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'NavigationMenu',
    value: 'navigationmenu',
    installCmd: '',
    component: "navigation-menu",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-navigation-menu"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Pagination',
    value: 'pagination',
    installCmd: '',
    component: "pagination",
    dependencies: {
      components: [
        "button"
      ],
      hooks: [],
      external: [
        "@radix-ui/react-slot"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Popover',
    value: 'popover',
    installCmd: '',
    component: "popover",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-popover"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Progress',
    value: 'progress',
    installCmd: '',
    component: "progress",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-progress"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'RadioGroup',
    value: 'radiogroup',
    installCmd: '',
    component: "radio-group",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-radio-group"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'ResizablePanelGroup',
    value: 'resizablepanelgroup',
    installCmd: '',
    component: "radio-group",
    dependencies: {
      components: [
        "resizable"
      ],
      hooks: [],
      external: [
        "react-resizable-panels"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'ScrollArea',
    value: 'scrollarea',
    installCmd: '',
    component: "scroll-area",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-scroll-area"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Select',
    value: 'select',
    installCmd: '',
    component: "select",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-select"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Separator',
    value: 'separator',
    installCmd: '',
    component: "separator",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-separator"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Sheet',
    value: 'sheet',
    installCmd: '',
    component: "sheet",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-dialog"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Skeleton',
    value: 'skeleton',
    installCmd: '',
    component: "skeleton",
    dependencies: {
      components: [],
      hooks: [],
      external: []
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Slider',
    value: 'slider',
    installCmd: '',
    component: "slider",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-slider"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Sonner',
    value: 'sonner',
    installCmd: '',
    component: "sonner",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "next-themes",
        "sonner"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Switch',
    value: 'switch',
    installCmd: '',
    component: "switch",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-switch"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Table',
    value: 'table',
    installCmd: '',
    component: "table",
    dependencies: {
      components: [],
      hooks: [],
      external: []
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Tabs',
    value: 'tabs',
    installCmd: '',
    component: "tabs",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-tabs"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Textarea',
    value: 'textarea',
    installCmd: '',
    component: "textarea",
    dependencies: {
      components: [],
      hooks: [],
      external: []
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Toast',
    value: 'toast',
    installCmd: '',
    component: "toast",
    dependencies: {
      components: [
        "toaster"
      ],
      hooks: [
        "use-toast.ts"
      ],
      external: [
        "@radix-ui/react-toast"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Toggle',
    value: 'toggle',
    installCmd: '',
    component: "toggle",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-toggle"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'ToggleGroup',
    value: 'togglegroup',
    installCmd: '',
    component: "toggle-group",
    dependencies: {
      components: [
        "toggle"
      ],
      hooks: [],
      external: [
        "@radix-ui/react-toggle",
        "@radix-ui/react-toggle-group"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  },
  {
    name: 'Tooltip',
    value: 'tooltip',
    installCmd: '',
    component: "tooltip",
    dependencies: {
      components: [],
      hooks: [],
      external: [
        "@radix-ui/react-tooltip"
      ]
    },
    configFiles: [],
    isVariant: false,
    variants: [],
  }
];

export const SampleTabData = [
  {
    name: "Project Details",
    value: "projectDetails"
  },
  {
    name: "Component Selection",
    value: "componentSelection"
  },
  {
    name: "Add Variants",
    value: "addVariants"
  },
  {
    name: "Dependencies",
    value: "dependencies"
  },
  // {
  //   name: "Submit",
  //   value: "submit"
  // }
]

export interface TabData {
  name: string
  value: string
}


// const ProjectGenerator: React.FC = (projectId: number | undefined) => {
const ProjectGenerator: React.FC = () => {

  const [componentModel, setComponentModel] = useState<ComponentModel[]>([])

  console.log("componentModel debug: ", componentModel)
  const [selectedComponentModel, setSelectedComponentModel] = useState<ComponentModel[]>([])

  const [componentsSelected, setComponentsSelected] = useState<string[]>([])
  const [selectedDependentComponents, setSelectedDependentComponents] = useState<string[]>([])


  const [currentTab, setCurrentTab] = useState<string>()
  const [tabData, setTabData] = useState<TabData[]>([])
  const [isSubmitEnable, setIsSubmitEnable] = useState<boolean>(false)
  const [isPreviousEnable, setIsPreviousEnable] = useState<boolean>(false)



  console.log("checkbbox component componentsSelected: ", componentsSelected)
  console.log("checkbbox component selectedDependentComponents: ", selectedDependentComponents)
  useEffect(() => {
    getProjectDetails(15)

  }, [])


  const getProjectDetails = async (projectId: number | undefined) => {
    if (projectId) {
      console.log("inside getProjectDetails: ", projectId)
      const response = await getProjectDetailsApi(projectId)
      if (response.status == 200) {
        const responseData: GetProjectDetailsRes = response.data
        console.log("response - getProjectDetailsApi: ", responseData.projectDetails)
        console.log("response - getProjectDetailsApi: ", responseData.projectDetails[0].projectId)

        if (responseData.projectDetails[0].projectId == undefined) {
          console.log("inside if")
          console.log("inside if setComponentModel", SampleComponentModelData)

          setComponentModel(SampleComponentModelData)
          setTabData(SampleTabData)
          setCurrentTab(SampleTabData[0].value)

          //Need to comment
          // setComponentsSelected(['accordion', 'alertdialog', 'card', 'calendar', 'breadcrumb', 'badge', 'button'])
          setComponentsSelected([])
        } else {
          console.log("responseData: ", responseData.projectDetails[0].metaData)
          console.log("inside else setComponentModel", responseData.projectDetails)
          console.log("inside else setComponentModel", responseData.projectDetails[0].metaData)



          // const initalData = SampleComponentModelData;

          // const updatedData = responseData.projectDetails[0].metaData.map((backendItem) => {
          //   // Find a matching object in the UI data by name
          //   const uiItem = initalData.find((uiItem) => uiItem.name === backendItem.name);
          //   console.log("updatedData - uiItem: ", uiItem)

          //   // If a match is found, replace the backend object with the UI object
          //   return uiItem ? { ...backendItem, ...uiItem } : backendItem;
          // });

          // console.log("updatedData: ", updatedData)

          const initialData = SampleComponentModelData;

          // const updatedData = responseData.projectDetails[0].metaData.map((backendItem) => {
          //   // Normalize names for comparison
          //   const uiItem = initialData.find(
          //     (uiItem) => uiItem.name.trim().toLowerCase() === backendItem.name.trim().toLowerCase()
          //   );

          //   console.log("Matching UI Item: ", uiItem);

          //   // If a match is found, replace the backend object with the UI object
          //   return uiItem ? { ...backendItem, ...uiItem } : backendItem;
          // });


          const selectedData: string[] = []
          const dependentData: string[] = []

          const updatedData = initialData.map((uiItem) => {

            const backendItem = responseData.projectDetails[0].metaData.find(
              (backendItem) => backendItem.name.trim().toLowerCase() === uiItem.name.trim().toLowerCase()
            );

            console.log("Matching backendItem: ", backendItem);
            if (backendItem) {
              selectedData.push(backendItem.value)
              if (backendItem?.dependencies?.components?.length > 0) {
                backendItem?.dependencies?.components.forEach((item) => {
                  console.log("depednednt component creation: ", item)
                  dependentData.push(item)
                })

              }
            }


            return backendItem ? { ...uiItem, ...backendItem } : uiItem;
          });

          console.log("Updated Data: ", updatedData);
          setComponentModel(updatedData)
          setCurrentTab(SampleTabData[0].value)
          setTabData(SampleTabData)

          //Need to comment
          // setComponentsSelected(['accordion', 'alertdialog', 'card', 'calendar', 'breadcrumb', 'badge', 'button'])
          setComponentsSelected(selectedData)
          setSelectedDependentComponents(dependentData)

        }

      }



    } else {
      setComponentModel(SampleComponentModelData)
      setTabData(SampleTabData)
      setCurrentTab(SampleTabData[0].value)

      //Need to comment
      // setComponentsSelected(['accordion', 'alertdialog', 'card', 'calendar', 'breadcrumb', 'badge', 'button'])
      setComponentsSelected([])
    }
  }

  // Handle checkbox change
  const HandleCheckboxChange = (value: string) => {
    console.log("HandleCheckboxChange: ", value);

    let selectedComponentOutputArray: string[] = [];

    if (componentsSelected.includes(value)) {
      selectedComponentOutputArray = componentsSelected.filter(item => item !== value);
    } else {
      selectedComponentOutputArray = [...componentsSelected, value];
    }


    // Update the state with the new array

    // console.log("inside HandleCheckboxChange selectedComponentOutputArray: ", selectedComponentOutputArray)
    // console.log("inside HandleCheckboxChange selectedDependentComponentOutputArray: ", selectedDependentComponentOutputArray)

    setComponentsSelected(selectedComponentOutputArray);
    // setSelectedDependentComponents(selectedDependentComponentOutputArray)
  };

  console.log("inside HandleCheckboxChange selectedComponentOutputArray: ", componentsSelected)
  console.log("inside HandleCheckboxChange selectedDependentComponentOutputArray: ", selectedDependentComponents)


  const HandleNextClick = () => {
    console.log("inside HandleNextClick", componentsSelected)
    console.log("componentsSelected", componentsSelected)
    console.log("currentTab", currentTab)
    console.log("tabData", tabData)

    const index = tabData?.findIndex(item => item.value === currentTab);
    // if (index + 1> tabData?.length){

    // }
    if (tabData.length > 0) {
      if (index + 2 == tabData.length) {
        setCurrentTab(tabData[index + 1].value)
        setIsSubmitEnable(true)
      } else {
        setCurrentTab(tabData[index + 1].value)
      }
      if (index == 0) {
        setIsPreviousEnable(true)
      }
    }


    if (index == 0) {
      const filteredComponents = componentModel.filter((component: ComponentModel) =>
        componentsSelected.includes(component.value)
      );

      setSelectedComponentModel(filteredComponents)
    }

  }

  console.log("previous enable: ", isPreviousEnable)

  const HandlePreviousClick = () => {
    console.log("inside HandlePreviousClick", componentsSelected)
    console.log("inside HandlePreviousClick componentsSelected", componentsSelected)
    console.log("inside HandlePreviousClick currentTab", currentTab)
    console.log("inside HandlePreviousClick tabData", tabData)

    const index = tabData?.findIndex(item => item.value === currentTab);
    // if (index + 1> tabData?.length){
    console.log("inside HandlePreviousClick index", index)

    if (index == tabData.length - 1) {
      setIsSubmitEnable(false)
      setCurrentTab(tabData[index - 1].value)
    } else if (index == 1) {
      setIsPreviousEnable(false)
      setCurrentTab(tabData[index - 1].value)
    } else {
      setCurrentTab(tabData[index - 1].value)
    }


    // if (index != 0) {

    //   // setIsSubmitEnable(true)
    // }

    // }
    // if (tabData.length > 0) {
    //   if (index + 2 == tabData.length) {
    //     setCurrentTab(tabData[index + 1].value)
    //     setIsSubmitEnable(true)
    //   } else {
    //     setCurrentTab(tabData[index + 1].value)

    //   }
    // }


  }

  const HandleSaveAsDraftClick = () => {
    console.log("inside HandleSaveAsDraftClick", componentsSelected)
  }


  const HandleSubmitClick = () => {
    console.log("inside HandleSubmitClick", componentsSelected)
    console.log("inside HandleSubmitClick selectedComponentModel", selectedComponentModel)
    console.log("inside HandleSubmitClick selectedComponentModel", selectedComponentModel[1].variants)
  }


  // const handleTabChange = () => {
  //   // console.log("Tab clicked:", value);
  //   // const filteredComponents = componentModel.filter((component: ComponentModel) =>
  //   //   componentsSelected.includes(component.value)
  //   // );

  //   // setSelectedComponentModel(filteredComponents)
  //   // setCurrentTab(value)
  //   return 0

  // }

  console.log("inside projectGenerator  SelectedComponentModel: ", selectedComponentModel)


  const handleAddVariantSave = (componentName: string, newVariant: any) => {
    console.log("inside handleAddVariantSave componentName : ", componentName)
    console.log("inside handleAddVariantSave  newVariant: ", newVariant)
    console.log("inside handleAddVariantSave  SelectedComponentModel: ", selectedComponentModel)

    // Create a new state variable to store the updated data
    const updatedComponentModels = selectedComponentModel.map(component => {
      if (component.name === componentName) {
        // Replace the variants with the new ones
        return { ...component, variants: newVariant };
      }
      // Return unchanged component
      return component;
    });
    console.log("updatedComponentModels: ", updatedComponentModels)
    // Update state
    setSelectedComponentModel(updatedComponentModels);

  }



  return (
    <Card >
      <CardContent>
        <Tabs value={currentTab} className="w-full">
          <TabsList >
            {
              tabData?.map((item, index) => {
                return (
                  <TabsTrigger key={index} value={item.value}
                    onClick={() => 0}

                  >{item.name}</TabsTrigger>

                )
              })
            }
            {/* <TabsTrigger value="password">Password</TabsTrigger> */}
          </TabsList>
          <TabsContent value='projectDetails'>
            <div>
              <div>
                Project Name: <Input>
                </Input>
                Project Description: <Input>
                </Input>
                Prefix: <Input>
                </Input>
                SuffixL<Input></Input>
              </div>
            </div>

          </TabsContent>
          <TabsContent value="componentSelection">
            <div className='grid gap-1.5 grid-cols-6 p-2.5'>
              {
                componentModel.length > 0
                  ?
                  componentModel.map((item, index) => {
                    return (
                      <div key={index} className="flex items-center space-x-2 p-3">
                        <Checkbox
                          name={item.name}
                          id={`${item.name}-${index}`}
                          value={item.value}
                          onCheckedChange={() => HandleCheckboxChange(item.value)}
                          checked={componentsSelected.includes(item.value) || selectedDependentComponents.includes(item.value)}
                        />
                        <label
                          htmlFor={`${item.name}-${index}`}
                          className={`text-sm 
                          ${componentsSelected.includes(item.value)
                              ?
                              `${selectedDependentComponents.includes(item.value) ? "text-red-700" : "text-yellow-400"} font-medium` :
                              `${selectedDependentComponents.includes(item.value) ? "text-purple-600 font-medium" : ""}`
                            }
                          

                          leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                        >
                          {item.name}
                        </label>
                      </div>
                    )
                  })
                  :
                  <></>

              }
            </div>
          </TabsContent>
          <TabsContent value="dependencies">
            <Dependencies
              // componentsSelected={componentsSelected}
              selectedComponentModel={selectedComponentModel}

            ></Dependencies>

          </TabsContent>
          <TabsContent value="addVariants">

            <AddVariants
              handleAddVariantSave={handleAddVariantSave}
              selectedComponentModel={selectedComponentModel}

            ></AddVariants>
          </TabsContent>
          {/*  */}
          <TabsContent value="submit">Redy to Submit</TabsContent>
        </Tabs>




      </CardContent>
      <CardFooter>
        <div className='flex w-full justify-end gap-x-3'>
          <Button variant={'secondary'} size={"md"}
            disabled={componentsSelected.length > 0 ? false : true}
            onClick={HandleSaveAsDraftClick}
          >
            Save as Draft
          </Button>
          <Button variant={'secondary'} size={"md"}
            disabled={!isPreviousEnable}
            onClick={HandlePreviousClick}

          >
            Previous
          </Button>
          {
            isSubmitEnable ?
              <Button variant={'secondary'} size={"md"}
                onClick={HandleSubmitClick}
                disabled={componentsSelected.length > 0 ? false : true}
              >
                Submit
              </Button>
              :
              <Button variant={'secondary'} size={"md"}
                onClick={HandleNextClick}
                disabled={componentsSelected.length > 0 ? false : true}
              >
                Next
              </Button>
          }

        </div>
      </CardFooter>
    </Card >

  )
};

export default ProjectGenerator;
