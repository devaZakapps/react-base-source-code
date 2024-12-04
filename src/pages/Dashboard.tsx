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
  const [userData, setUserData] = useState<Record<string, unknown>[]>([]);
  const [tableConfigData, setTableConfigData] = useState<TableConfigData>({});

  const [search, setSearch] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {

    // getUserDetails()
    // setTableData(userData);
    setTableColumnsData(userProjectTblColumns);
    setTableConfigData(userProjectTblConfig);


    getProjectsByUser()

  }, [])

  const handleSearch = (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);

    const filteredData = userData.filter(
      (item) =>
        item.projectName.toLowerCase().includes(value)
    );
    // const filteredData = skuList.filter((item) =>
    //   Object.values(item).some((searchValue) =>
    //     searchValue.toString().toLowerCase().includes(value)
    //   )
    // );
    if (filteredData.length === 0 && value !== '') {
      setError('Search term does not match SKU ID or Title');
      setTableData(userData);
    } else {
      setError('');
      setTableData(filteredData);
    }
  };


  const getProjectsByUser = async () => {
    const email = getUserEmail()
    if (!email) {
      redirectToPage('/login', false);
    } else {
      const getProjectsByUserApiRes = await getProjectsByUserApi(email)
      if (getProjectsByUserApiRes.status == 200) {
        setTableData(getProjectsByUserApiRes.data.userData);
        setUserData(getProjectsByUserApiRes.data.userData)
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
        <div className="flex">
          <Button
            variant={"icon"}
            size={"icon"}
            onClick={() =>
              navigate(`/projectGenerator/${row.original.projectId}`)
            }
          // className="flex items-center space-x-2 hover:underline"
          >
            <Icon iconName="edit" className="h-3.5 w-3.5" />
          </Button>
          <Button
            size={"icon"}
            variant={"icon"}
            onClick={() =>
              alert("Download functionality is under progress.")
            }
          // className="flex items-center space-x-2 hover:underline"
          >
            <Icon iconName="download" className="h-3.5 w-3.5" />
          </Button>

        </div>

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
    <div className="flex gap-4 flex-col mt-2 p-3">
      <div className="flex justify-between">
        <div>
          <input
            value={search}
            className="h-7 w-[229px] p-[9px_8px] rounded-[2px] border border-[#A6A6A6] bg-white"
            type="search"
            placeholder="Search Project Name"
            onChange={handleSearch}
          ></input>
        </div>
        <Button
          variant={'primary'}
          size={'sm'}
          onClick={() =>
            navigate(`/projectGenerator`)
          }
        >
          Create New
        </Button>
      </div>
      <TanStackTable
        data={tableData}
        columns={tableColumnsData}
        tableConfigData={tableConfigData}
      />
    </div>
  );
};

export default Dashboard;
