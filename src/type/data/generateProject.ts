import { ComponentModel } from "../../pages/ProjectGenerator"

export interface GetProjectDetailsRes {
  projectDetails: ProjectDetail[]
}

export interface ProjectDetail {
  projectId: number
  userId: number
  projectName: string
  description: string
  statusId: number
  createdAt: string
  lastModifiedAt: string
  createdBy: number
  lastModifiedBy: number
  metaData: ComponentModel[]
  zipFile: any
  prefix:string
  suffix:string
}

export interface GenerateProjectReq {
  name: string
  description: string
  status: number
  data: ComponentModel[]
  prefix:string
  suffix:string
}
