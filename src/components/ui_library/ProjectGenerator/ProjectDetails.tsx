import { ProjectDetailsData } from "../../../pages/ProjectGenerator"
import { Input } from "../../ui/input"



export const ProjectDetails = (
    { projectDetailData,
        handleProjectDetailsInputChange,
        projectDetailError
    }: {
        projectDetailError: ProjectDetailsData,
        projectDetailData: ProjectDetailsData,
        handleProjectDetailsInputChange: any
    }
) => {



    return (
        <div className="flex flex-col gap-3 p-2">
            <div className="flex items-center">
                <div className="w-[20%]">Project Name:</div>
                <div>
                    <Input
                        name="projectName"
                        className={`${projectDetailError.projectName != "" ? "border-red-700 " : ""}`}
                        onChange={(event) => handleProjectDetailsInputChange(event)}
                        value={projectDetailData.projectName}
                    />
                    <span
                        className={`${projectDetailError.projectName != "" ? "text-red-700 " : ""}`}>{projectDetailError.projectName}</span>
                </div>
            </div>
            <div className="flex items-center">
                <div className="w-[20%]">Project Description:</div>
                <div>
                    <Input
                        name="projectDescription"
                        className={`${projectDetailError.projectDescription != "" ? "border-red-700 " : ""}`}
                        onChange={(event) => handleProjectDetailsInputChange(event)}
                        value={projectDetailData.projectDescription}
                    />
                    <span
                        className={`${projectDetailError.projectDescription != "" ? "text-red-700 " : ""}`}>{projectDetailError.projectDescription}</span>
                </div>
            </div>
            <div className="flex items-center">
                <div className="w-[20%]">Prefix: </div>
                <div>
                    <Input
                        name="prefix"
                        className={`${projectDetailError.prefix != "" ? "border-red-700 " : ""}`}
                        onChange={(event) => handleProjectDetailsInputChange(event)}
                        value={projectDetailData.prefix}
                    />
                    <span
                        className={`${projectDetailError.prefix != "" ? "text-red-700 " : ""}`}>{projectDetailError.prefix}</span>
                </div>
            </div>
            <div className="flex items-center">
                <div className="w-[20%]">Suffix:</div>
                <div>
                    <Input
                        name="suffix"
                        className={`${projectDetailError.suffix != "" ? "border-red-700 " : ""}`}
                        onChange={(event) => handleProjectDetailsInputChange(event)}
                        value={projectDetailData.suffix}
                    />
                    <span
                        className={`${projectDetailError.suffix != "" ? "text-red-700 " : ""}`}>{projectDetailError.suffix}</span>
                </div>
            </div>
        </div>
    )
}