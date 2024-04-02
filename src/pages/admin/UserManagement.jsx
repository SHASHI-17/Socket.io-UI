import { useFetchData } from '6pp';
import { Avatar, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { dashboardData } from '../../components/constants/sample';
import AdminLayout from '../../components/layout/AdminLayout';
import Table from '../../components/shared/Table';
import { useErrors } from '../../hooks/hooks';
import { server } from '../../lib/config';

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar} />
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 150
  },
];

const UserManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/admin/users`,
    "dashboard-users"
  );

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((i) => ({
          ...i,
          id: i._id,
          avatar: i.avatar,
        }))
      );
    }
  }, [data]);

  useEffect(() => {
    setRows(dashboardData.users.map(i => ({ ...i, id: i._id, avatar: i.avatar })))
  }, [])

  return (
    <AdminLayout>
      {loading ?<Skeleton height={'100vh'}/> : <Table heading={"All Users"} columns={columns} rows={rows} />}
    </AdminLayout>
  )
}

export default UserManagement