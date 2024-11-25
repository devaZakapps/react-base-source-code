import { getUserProfile } from "../api/userModal";
import { redirectToPage } from "../utils/utils";
import { useEffect, useState } from "react";
import TanStackTable, { CustomColumnDef, TableConfigData } from "../components/ui_library/tanStackTable";
import Icon from "../components/ui/icon";
import { useNavigate } from "react-router-dom";
import { getUserEmail } from "../api/axiosInstance";
import { getProjectsByUserApi } from "../api/generateProjectModal";
import { Button } from "../components/ui/button";
const Dashboard = () => {

  const navigate = useNavigate();
  const [tableColumnsData, setTableColumnsData] = useState<
    CustomColumnDef<Record<string, unknown>, unknown>[]
  >([]);
  const [tableData, setTableData] = useState<Record<string, unknown>[]>([]);
  const [tableConfigData, setTableConfigData] = useState<TableConfigData>({});



  useEffect(() => {

    // getUserDetails()
    // setTableData(userData);
    setTableColumnsData(userProjectTblColumns);
    setTableConfigData(userProjectTblConfig);


    getProjectsByUser()

  }, [])


  const getProjectsByUser = async () => {
    const email = getUserEmail()
    if (!email) {
      redirectToPage('/login', false);
    } else {
      const getProjectsByUserApiRes = await getProjectsByUserApi(email)
      if (getProjectsByUserApiRes.status == 200) {
        setTableData(getProjectsByUserApiRes.data.userData);
      }

    }
  }

  const userProjectTblColumns: CustomColumnDef<Record<string, unknown>, unknown>[] = [
    { header: 'Project ID', accessorKey: 'projectId', type: 'number' },
    {
      header: 'Project Name',
      accessorKey: 'projectName',
      type: 'string',
    },
    {
      header: 'Description',
      accessorKey: 'description',
      type: 'string',
    },

    {
      header: 'Project Status',
      accessorKey: 'projectStatus',
      type: 'string',
    },
    {
      header: 'Action',
      accessorKey: 'iconName',
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/projectgenerator/${row.original.projectId}`)}
          className="flex items-center space-x-2 hover:underline"
        >
          <Icon
            iconName="edit"
            className="h-3.5 w-3.5"
          />
        </button>
      ),
    },
  ];

  const userProjectTblConfig: TableConfigData = {
    isBorder: true,
    paginationData: {
      enablePagination: true,
      data: {
        pageIndex: 1,
        pageSize: 10,
        autoResetPageIndex: true,
      },
    },

  };



  return (
    <div className="flex gap-4 flex-col mt-2 p-2">
      <div className="">
        <Button variant={'primary'} size={"sm"}
          onClick={() => navigate(`/projectgenerator`)}
        >Create New</Button>
      </div>
      <TanStackTable
        data={tableData}
        columns={tableColumnsData}
        tableConfigData={tableConfigData}
      />
    </div>);
};

export default Dashboard;
