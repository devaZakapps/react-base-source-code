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
import { generateProjectApi, getProjectDetailsApi } from '../api/generateProjectModal';
import { GenerateProjectReq, GetProjectDetailsRes } from '../type/data/generateProject';
import { useParams } from 'react-router-dom';
import { ProjectDetails } from '../components/ui_library/ProjectGenerator/ProjectDetails';

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
    component: 'alert',
    dependencies: {
      components: [],
      hooks: [],
      external: []
    },
    configFiles: [],
    isVariant: true,
    variants: [
      {
        name: "variant",
        value: {
          default: "bg-background text-foreground",
          destructive:
            "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        },
        isSaved: true
      }
    ],
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
    isVariant: true,
    variants: [
      {
        name: "variant",
        value: {
          default:
            "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
          secondary:
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
          destructive:
            "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
          outline: "text-foreground",
        },
        isSaved: true
      }
    ],
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
            "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
          outline:
            "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
          secondary:
            "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
        },
        isSaved: true
      },
      {
        name: "size",
        value: {
          default: "h-9 px-4 py-2",
          sm: "h-8 rounded-md px-3 text-xs",
          lg: "h-10 rounded-md px-8",
          icon: "h-9 w-9",
        },
        isSaved: true
      },
    ],
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
    variants: [
      {
        name: "classNames",
        value: {
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          day_range_start: "day-range-start",
          day_range_end: "day-range-end",
          day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          day: `cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
          )`,
          cell: ` cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          )`,
          nav_button: `cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )`,
        },
        isSaved: true
      }
    ],
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
  // {
  //   name: 'Combobox',
  //   value: 'combobox',
  //   installCmd: '',
  //   component: "",
  //   dependencies: {
  //     components: [],
  //     hooks: [],
  //     external: []
  //   },
  //   configFiles: [],
  //   isVariant: false,
  //   variants: [],
  // },
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
  // {
  //   name: 'DataTable',
  //   value: 'datatable',
  //   installCmd: '',
  //   component: "",
  //   dependencies: {
  //     components: [],
  //     hooks: [],
  //     external: []
  //   },
  //   configFiles: [],
  //   isVariant: false,
  //   variants: [],
  // },
  // {
  //   name: 'DatePicker',
  //   value: 'datepicker',
  //   installCmd: '',
  //   component: "",
  //   dependencies: {
  //     components: [],
  //     hooks: [],
  //     external: []
  //   },
  //   configFiles: [],
  //   isVariant: false,
  //   variants: [],
  // },
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
  // {
  //   name: 'Form',
  //   value: 'form',
  //   installCmd: '',
  //   component: "",
  //   dependencies: {
  //     components: [],
  //     hooks: [],
  //     external: []
  //   },
  //   configFiles: [],
  //   isVariant: false,
  //   variants: [],
  // },
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
    isVariant: true,
    variants: [
      {
        name: "side",
        value: {
          top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          bottom:
            "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
          right:
            "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
        },
        isSaved: true,
      }
    ],
  },
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
    isVariant: true,
    variants: [
      {
        name: "variant",
        value: {
          default: "border bg-background text-foreground",
          destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
        },
        isSaved: true
      }
    ],
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
    isVariant: true,
    variants: [
      {
        name: "variant",
        value: {
          default: "bg-transparent",
          outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        },
        isSaved: true
      },
      {
        name: "size",
        value: {
          default: "bg-transparent",
          outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        },
        isSaved: true
      }
    ],
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

export interface ProjectDetailsData {
  projectName: string
  projectDescription: string
  prefix: string
  suffix: string

}


// const ProjectGenerator: React.FC = (projectId: number | undefined) => {
const ProjectGenerator: React.FC = () => {
  const { projectId } = useParams();

  const [componentModel, setComponentModel] = useState<ComponentModel[]>([])


  const [selectedComponentModel, setSelectedComponentModel] = useState<ComponentModel[]>([])
  const [componentsSelected, setComponentsSelected] = useState<string[]>([])
  const [selectedDependentComponents, setSelectedDependentComponents] = useState<string[]>([])


  const [currentTab, setCurrentTab] = useState<string>()
  const [tabData, setTabData] = useState<TabData[]>([])
  const [isSubmitEnable, setIsSubmitEnable] = useState<boolean>(false)
  const [isPreviousEnable, setIsPreviousEnable] = useState<boolean>(false)


  const [projectDetails, setProjectDetails] = useState<ProjectDetailsData>({
    projectName: "",
    projectDescription: "",
    prefix: "",
    suffix: ""
  })

  const [projectDetailError, setProjectDetailError] = useState<ProjectDetailsData>({
    projectName: "",
    projectDescription: "",
    prefix: "",
    suffix: ""
  })


  console.log("componentModel debug: ", componentModel)
  console.log("checkbbox component componentsSelected: ", componentsSelected)
  console.log("checkbbox component selectedDependentComponents: ", selectedDependentComponents)
  useEffect(() => {

    setTabData(SampleTabData)
    setCurrentTab(SampleTabData[0].value)
    // Convert projectId to a number if it exists, otherwise keep it undefined
    const parsedProjectId = projectId ? parseInt(projectId, 10) : undefined;
    getProjectDetails(parsedProjectId)

  }, [projectId])


  const getProjectDetails = async (projectId: number | undefined) => {
    if (projectId) {
      const response = await getProjectDetailsApi(projectId)
      if (response.status == 200) {
        const responseData: GetProjectDetailsRes = response.data
        if (responseData.projectDetails[0].projectId == undefined) {

          setComponentModel(SampleComponentModelData)
          // setTabData(SampleTabData)
          // setCurrentTab(SampleTabData[0].value)

          //Need to comment
          // setComponentsSelected(['accordion', 'alertdialog', 'card', 'calendar', 'breadcrumb', 'badge', 'button'])
          setComponentsSelected([])
        } else {


          const initialData = SampleComponentModelData;

          const selectedData: string[] = []
          const dependentData: string[] = []

          const updatedData = initialData.map((uiItem) => {

            const backendItem = responseData.projectDetails[0].metaData.find(
              (backendItem) => backendItem.name.trim().toLowerCase() === uiItem.name.trim().toLowerCase()
            );

            if (backendItem) {
              selectedData.push(backendItem.value)
              if (backendItem?.dependencies?.components?.length > 0) {
                backendItem?.dependencies?.components.forEach((item) => {
                  dependentData.push(item)
                })

              }
            }

            return backendItem ? { ...uiItem, ...backendItem } : uiItem;
          });

          // setCurrentTab(SampleTabData[0].value)
          // setTabData(SampleTabData)
          setComponentModel(updatedData)
          setComponentsSelected(selectedData)
          setSelectedDependentComponents(dependentData)
          setSelectedComponentModel(responseData.projectDetails[0].metaData)

          const tempProjectDetails: ProjectDetailsData = {
            projectName: responseData.projectDetails[0].projectName,
            projectDescription: responseData.projectDetails[0].description,
            prefix: responseData.projectDetails[0].prefix,
            suffix: responseData.projectDetails[0].suffix
          }
          setProjectDetails(tempProjectDetails)

        }

      }



    } else {
      setComponentModel(SampleComponentModelData)

      setSelectedDependentComponents([])
      setSelectedComponentModel([])
      //Need to comment
      // setComponentsSelected(['accordion', 'alertdialog', 'card', 'calendar', 'breadcrumb', 'badge', 'button'])
      setComponentsSelected([])
    }
  }

  // handle checkbox change
  const handleCheckboxChange = (value: string) => {

    let selectedComponentOutputArray: string[] = [];

    let tempDependentComponents: string[] = []
    // let updatedDependentComponents = [...selectedDependentComponents]

    setSelectedComponentModel((prevState) => {
      const isComponentAvailable = prevState.some(
        (component) => component.value === value
      );

      if (isComponentAvailable) {
        // Remove the component if it already exists
        const tempComponent = prevState.filter((component) => component.value !== value);

        // tempComponent.forEach(
        //   (component) => tempDependentComponents = [...tempDependentComponents, ...component.dependencies.components]
        // )

        return tempComponent
      } else {
        // Find the matching component in componentModel
        const tempComponent = componentModel.find((component) => component.value === value);

        if (tempComponent) {

          // tempDependentComponents = [...tempDependentComponents, ...tempComponent.dependencies.components]


          // Add the new component to the array
          return [...prevState, tempComponent];
        } else {
          console.warn(`Component with value "${value}" not found in componentModel.`);
          return prevState; // No change if not found
        }
      }
    });

    if (componentsSelected.includes(value)) {
      selectedComponentOutputArray = componentsSelected.filter(item => item !== value);
    } else {
      selectedComponentOutputArray = [...componentsSelected, value];
    }

    selectedComponentOutputArray.forEach((tempCurrentSelectedComponent) => {
      const tempComponent = componentModel.find((component) => component.value === tempCurrentSelectedComponent);
      if (tempComponent) {
        tempDependentComponents = [...tempDependentComponents, ...tempComponent.dependencies.components]
      }
    })


    console.log("inside handleCheckboxChange tempDependentComponents: ", tempDependentComponents)



    // Update the state with the new array
    setComponentsSelected(selectedComponentOutputArray);
    setSelectedDependentComponents(tempDependentComponents)
  };



  const handleNextClick = () => {
    console.log("inside handleNextClick ")

    const index = tabData?.findIndex(item => item.value === currentTab);

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


    if (index == 1) {

      const requiredComponentsArray = Array.from(new Set([...componentsSelected, ...selectedDependentComponents]));
      console.log("inside handleNextClick - requiredComponentsArray ", requiredComponentsArray)

      const tempSelcetedComponentModal = selectedComponentModel.filter((component) =>
        requiredComponentsArray.includes(component.value)
      );

      console.log("inside handleNextClick - tempSelcetedComponentModal ", tempSelcetedComponentModal)


      // Create a new array to avoid mutating the existing state
      const updatedSelectedComponentsModal = [...tempSelcetedComponentModal];


      requiredComponentsArray.forEach((value) => {

        const isComponentModalAlreadySelected = selectedComponentModel.some((selectedComponent) => selectedComponent.value == value)

        if (!isComponentModalAlreadySelected) {
          const componentModalToAdd = componentModel.find((newComponentModal) => newComponentModal.value == value)
          if (componentModalToAdd) {
            updatedSelectedComponentsModal.push(componentModalToAdd)
          }
        }
        console.log("inside handleNextClick - updatedSelectedComponentsModal ", updatedSelectedComponentsModal)

        setSelectedComponentModel(updatedSelectedComponentsModal);
      })

    }

  }


  const handlePreviousClick = () => {

    const index = tabData?.findIndex(item => item.value === currentTab);

    if (index == tabData.length - 1) {
      setIsSubmitEnable(false)
      setCurrentTab(tabData[index - 1].value)
    } else if (index == 1) {
      setIsPreviousEnable(false)
      setCurrentTab(tabData[index - 1].value)
    } else {
      setCurrentTab(tabData[index - 1].value)
    }

  }

  const handleSaveAsDraftClick = async () => {
    const payload: GenerateProjectReq = {
      name: projectDetails.projectName,
      description: projectDetails.projectDescription,
      status: 1,
      data: selectedComponentModel,
      prefix: projectDetails.prefix,
      suffix: projectDetails.suffix
    }

    const generateProjectApiRespose = await generateProjectApi(payload)
    if (generateProjectApiRespose.status == 200) {

      // Check the Content-Type to differentiate between binary data and JSON
      const contentType = generateProjectApiRespose.headers['content-type'];

      if (contentType.includes('application/zip')) {
        // Handle the zip file response
        const blob = new Blob([generateProjectApiRespose.data], { type: 'application/zip' });

        // Create a downloadable link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${payload.name}.zip`; // File name for download
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        console.log('Zip file downloaded successfully');
      } else if (contentType.includes('application/json')) {
        // Handle the JSON response
        const jsonResponse = JSON.parse(new TextDecoder().decode(generateProjectApiRespose.data));
        console.log('JSON response:', jsonResponse);
      } else {
        throw new Error('Unexpected content type received');
      }
    }

  }

  const handleSubmitClick = async () => {
    const payload: GenerateProjectReq = {
      name: projectDetails.projectName,
      description: projectDetails.projectDescription,
      status: 2,
      data: selectedComponentModel,
      prefix: projectDetails.prefix,
      suffix: projectDetails.suffix
    }

    const generateProjectApiRespose = await generateProjectApi(payload)
    if (generateProjectApiRespose.status == 200) {
      console.log("generateProjectApiRespose", generateProjectApiRespose.data)

      // Check the Content-Type to differentiate between binary data and JSON
      const contentType = generateProjectApiRespose.headers['content-type'];

      if (contentType.includes('application/zip')) {
        // Handle the zip file response
        const blob = new Blob([generateProjectApiRespose.data], { type: 'application/zip' });

        // Create a downloadable link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${payload.name}.zip`; // File name for download
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        console.log('Zip file downloaded successfully');
      } else if (contentType.includes('application/json')) {
        // Handle the JSON response
        const jsonResponse = JSON.parse(new TextDecoder().decode(generateProjectApiRespose.data));
        console.log('JSON response:', jsonResponse);
      } else {
        throw new Error('Unexpected content type received');
      }
    }

  }

  const handleAddVariantSave = (componentName: string, newVariant: any) => {
    // Create a new state variable to store the updated data
    const updatedComponentModels = selectedComponentModel.map(component => {
      if (component.name === componentName) {
        // Replace the variants with the new ones
        return { ...component, variants: newVariant };
      }
      // Return unchanged component
      return component;
    });
    // Update state
    setSelectedComponentModel(updatedComponentModels);

  }

  const enableNext = () => {
    let flag: boolean = true


    console.log("inside enableNext")
    console.log("inside enableNext :componentModel", selectedComponentModel)

    if (currentTab == "projectDetails") {
      // Check if there are any errors in the error object
      const hasErrors =
        Object.values(projectDetailError).some((error) => error !== "") || projectDetails.projectName.trim() === "" ||
        projectDetails.projectDescription.trim() === "";
      // const hasErrors = Object.values(projectDetailError).some((error) => error !== "");



      flag = !hasErrors
    } else if (currentTab == "componentSelection") {
      flag = selectedComponentModel.length > 0
    }
    return flag
  }

  const handleProjectDetailsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //  Validate the input
    const error = validateField(name, value);

    // Update the errors and the state
    setProjectDetailError((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    // Dynamically update the state
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // // Validation function
  // const validateField = (name: string, value: string): string => {
  //   if (name === "projectName") {
  //     // Allow alphanumeric and dashes for zip file compatibility
  //     const isValid = /^[a-zA-Z0-9_-]+$/.test(value);
  //     return isValid ? "" : "Invalid project name. Use only letters, numbers, dashes, or underscores.";
  //   }

  //   if (name === "prefix" || name === "suffix") {
  //     // Allow valid JSX element names (alphanumeric, underscores)
  //     const isValid = /^[a-zA-Z0-9_]+$/.test(value);
  //     return isValid ? "" : "Invalid name. Use only letters, numbers, or underscores.";
  //   }

  //   if (name === "projectDescription") {
  //     // Ensure no special characters
  //     const isValid = /^[a-zA-Z0-9\s]+$/.test(value);
  //     return isValid ? "" : "Description must not contain special characters.";
  //   }

  //   return ""; // No error by default
  // };


  const validateField = (name: string, value: string): string => {
    if (name === "projectName") {
      if (value.trim() === "") {
        return "Project name is required.";
      }
      // Allow alphanumeric and dashes for zip file compatibility
      const isValid = /^[a-zA-Z0-9_-]+$/.test(value);
      return isValid ? "" : "Invalid project name. Use only letters, numbers, dashes, or underscores.";
    }

    if (name === "prefix" || name === "suffix") {
      // Allow valid JSX element names (alphanumeric, underscores); can be empty
      if (value.trim() === "") {
        return ""; // Empty prefix or suffix is allowed
      }
      const isValid = /^[a-zA-Z0-9_]+$/.test(value);
      return isValid ? "" : "Invalid name. Use only letters, numbers, or underscores.";
    }

    if (name === "projectDescription") {
      if (value.trim() === "") {
        return "Project description is required.";
      }
      // Ensure no special characters
      const isValid = /^[a-zA-Z0-9\s]+$/.test(value);
      return isValid ? "" : "Description must not contain special characters.";
    }

    return ""; // No error by default
  };


  return (
    <div className='p-2'>
      <Card className='' >
        <CardContent className='p-2'>
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
              <ProjectDetails
                projectDetailError={projectDetailError}
                projectDetailData={projectDetails}
                handleProjectDetailsInputChange={handleProjectDetailsInputChange}
              />
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
                            onCheckedChange={() => handleCheckboxChange(item.value)}
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
                dependentComponentsArray={selectedDependentComponents}
                componentsSelectedArray={componentsSelected}
                selectedComponentModel={selectedComponentModel}

              ></Dependencies>

            </TabsContent>
            <TabsContent value="addVariants">

              <AddVariants
                dependentComponentsArray={selectedDependentComponents}
                componentsSelectedArray={componentsSelected}
                handleAddVariantSave={handleAddVariantSave}
                selectedComponentModel={selectedComponentModel}
              // ComponentsSelected={ComponentsSelected}

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
              onClick={handleSaveAsDraftClick}
            >
              Save as Draft
            </Button>
            <Button variant={'secondary'} size={"md"}
              disabled={!isPreviousEnable}
              onClick={handlePreviousClick}
            >
              Previous
            </Button>
            {
              isSubmitEnable ?
                <Button variant={'secondary'} size={"md"}
                  onClick={handleSubmitClick}
                  disabled={componentsSelected.length > 0 ? false : true}
                >
                  Submit
                </Button>
                :
                <Button variant={'secondary'} size={"md"}
                  onClick={handleNextClick}
                  disabled={!enableNext()}
                >
                  Next
                </Button>
            }

          </div>
        </CardFooter>
      </Card >
    </div>

  )
};

export default ProjectGenerator;
