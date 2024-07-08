// import React, { useEffect, useMemo, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { deletePost, fetchPosts } from '../store/slices/postsSlice';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button, Card, Container, Divider, Grid, IconButton, Box, CardHeader, Typography, TablePagination } from '@mui/material';
// import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getFacetedRowModel, getFacetedUniqueValues, getFacetedMinMaxValues, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
// import classnames from 'classnames';
// import { rankItem } from '@tanstack/match-sorter-utils';
// import TableFilters from '../components/tableFilter';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import CreateEditPostDialog from '../components/createEditPostDialog';

// const fuzzyFilter = (row, columnId, value, addMeta) => {
//   const itemRank = rankItem(row.getValue(columnId), value);
//   addMeta({
//     itemRank
//   });
//   return itemRank.passed;
// };

// const PostsList = () => {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts.posts);
//   const postStatus = useSelector((state) => state.posts.status);
//   const error = useSelector((state) => state.posts.error);

//   const navigate = useNavigate();

//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [postToEdit, setPostToEdit] = useState(null);

//   const columnHelper = createColumnHelper();

//   useEffect(() => {
//     if (postStatus === 'idle') {
//       dispatch(fetchPosts());
//     }
//   }, [postStatus, dispatch]);

//   useEffect(() => {
//     setData(posts);
//     setFilteredData(posts);
//   }, [posts]);

//   const handleDelete = (postId) => {
//     dispatch(deletePost(postId));
//   };

//   const handleNavigateEditPage = (postId) => {
//     navigate(`/edit/${postId}`)
//   }

//   const handleEdit = (post) => {
//     setPostToEdit(post);
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setPostToEdit(null);
//   };

//   const columns = useMemo(
//     () => [
//       columnHelper.accessor('id', {
//         header: 'Id',
//         cell: ({ row }) => <Typography sx={{color:"blue", cursor:"pointer", width:"50px"}} onClick={() => handleNavigateEditPage(row?.original?.id)}>{row.original.id}</Typography>
//       }),
//       columnHelper.accessor('title', {
//         header: 'Title',
//         cell: ({ row }) => <Typography sx={{width:"350px"}}>{row.original.title}</Typography>
//       }),
//       columnHelper.accessor('body', {
//         header: 'Description',
//         cell: ({ row }) => <Typography sx={{width:"550px"}}>{row.original.body}</Typography>
//       }),
//       columnHelper.accessor('Edit', {
//         header: 'Edit',
//         cell: ({ row }) => (
//           <IconButton onClick={() => handleEdit(row.original)}>
//             <EditIcon />
//           </IconButton>
//         )
//       }),
//       columnHelper.accessor('Delete', {
//         header: 'Delete',
//         cell: ({ row }) => (
//           <IconButton onClick={() => handleDelete(row.original.id)}>
//             <DeleteIcon />
//           </IconButton>
//         )
//       })
//     ],
//     [columnHelper]
//   );

//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     filterFns: {
//       fuzzy: fuzzyFilter
//     },
//     state: {
//       // rowSelection,
//       // globalFilter
//     },
//     initialState: {
//       pagination: {
//         pageSize: 5
//       }
//     },
//     globalFilterFn: fuzzyFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     getFacetedMinMaxValues: getFacetedMinMaxValues()
//   });

//   return (
//     <>
//       <Grid container spacing={2} sx={{ marginTop: "2px", marginBottom:"2px"}}>
//         <Grid >
//           <Container>
//             <Card>
//               <CardHeader title='Filters' />
//               <TableFilters setData={setFilteredData} tableData={data} />
//               <Divider />
//               <Box sx={{ marginBottom: "5px", marginTop: "5px", display: "flex", justifyContent: "end", alignItems: "center" }}>
//                 <Button onClick={() => setDialogOpen(true)}  variant="contained">Add Post</Button>
//               </Box>
//               {/* <Divider /> */}
//               <div className='overflow-x-auto' style={{overflowX:"auto", marginTop:"2px"}}>
//                 <table style={{ width: '100%', minWidth: '90%', borderCollapse: 'collapse' }}>
//                   <thead>
//                     {table.getHeaderGroups().map(headerGroup => (
//                       <tr key={headerGroup.id} style={{ backgroundColor: '#f5f5f5' }}>
//                         {headerGroup.headers.map(header => (
//                           <th key={header.id} style={{ border: '1px solid #ddd', padding: '8px', color: '#333' }}>
//                             {header.isPlaceholder ? null : (
//                               <div
//                                 className={classnames({
//                                   'flex items-center': header.column.getIsSorted(),
//                                   'cursor-pointer select-none': header.column.getCanSort()
//                                 })}
//                                 onClick={header.column.getToggleSortingHandler()}
//                               >
//                                 {flexRender(header.column.columnDef.header, header.getContext())}
//                                 {{
//                                   asc: <i className='ri-arrow-up-s-line text-xl' />,
//                                   desc: <i className='ri-arrow-down-s-line text-xl' />
//                                 }[header.column.getIsSorted()] ?? null}
//                               </div>
//                             )}
//                           </th>
//                         ))}
//                       </tr>
//                     ))}
//                   </thead>
//                   {
//                   table.getFilteredRowModel().rows.length === 0 ? (
//                     <tbody>
//                       <tr>
//                         <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
//                           No data available
//                         </td>
//                       </tr>
//                     </tbody>
//                   ) : (
//                     <tbody>
//                       {table
//                         .getRowModel()
//                         .rows.slice(0, table.getState().pagination.pageSize)
//                         .map(row => (
//                           <tr key={row.id} className={classnames({ selected: row.getIsSelected() })} style={{ borderBottom: '1px solid #ddd' }}>
//                             {row.getVisibleCells().map(cell => (
//                               <td key={cell.id} style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                               </td>
//                             ))}
//                           </tr>
//                         ))}
//                     </tbody>
//                   )}
//                 </table>
//               </div>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25, 50]}
//                 component='div'
//                 className='border-bs'
//                 count={table.getFilteredRowModel().rows.length}
//                 rowsPerPage={table.getState().pagination.pageSize}
//                 page={table.getState().pagination.pageIndex}
//                 SelectProps={{
//                   inputProps: { 'aria-label': 'rows per page' }
//                 }}
//                 onPageChange={(_, page) => {
//                   table.setPageIndex(page)
//                 }}
//                 onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
//               />
//             </Card>
//           </Container>
//         </Grid>
//       </Grid>
//       <CreateEditPostDialog open={dialogOpen} handleClose={handleDialogClose} postToEdit={postToEdit} />
//     </>
//   );
// };

// export default PostsList;


import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchPosts } from '../store/slices/postsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Divider, Grid, IconButton, Box, CardHeader, Typography, TablePagination } from '@mui/material';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getFacetedRowModel, getFacetedUniqueValues, getFacetedMinMaxValues, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import classnames from 'classnames';
import { rankItem } from '@tanstack/match-sorter-utils';
import TableFilters from '../components/tableFilter';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CreateEditPostDialog from '../components/createEditPostDialog';

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank
  });
  return itemRank.passed;
};

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [pageLoad, setPageLoad] = useState(false);

  const columnHelper = createColumnHelper();

  useEffect(() => {
    if (postStatus === 'idle') {
      console.log('called')
      dispatch(fetchPosts());
      setData(posts)
    }
  }, [postStatus, dispatch, pageLoad]);

  useEffect(() => {
    setData(posts);
    setFilteredData(posts);
  }, [posts, pageLoad]);

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  const handleNavigateEditPage = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const handleEdit = (post) => {
    setPostToEdit(post);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setPostToEdit(null);
    dispatch(fetchPosts());
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Id',
        cell: ({ row }) => (
          <Typography
            sx={{ color: 'blue', cursor: 'pointer', width: '50px' }}
            onClick={() => handleNavigateEditPage(row.original.id)}
          >
            {row.original.id}
          </Typography>
        ),
        meta: { width: '50px' },
      }),
      columnHelper.accessor('title', {
        header: 'Title',
        cell: ({ row }) => <Typography sx={{ width: '350px' }}>{row.original.title}</Typography>,
        meta: { width: '350px' },
      }),
      columnHelper.accessor('body', {
        header: 'Description',
        cell: ({ row }) => <Typography sx={{ width: '550px' }}>{row.original.body}</Typography>,
        meta: { width: '550px' },
      }),
      columnHelper.accessor('Edit', {
        header: 'Edit',
        cell: ({ row }) => (
          <IconButton onClick={() => handleEdit(row.original)}>
            <EditIcon />
          </IconButton>
        ),
        meta: { width: '100px' },
      }),
      columnHelper.accessor('Delete', {
        header: 'Delete',
        cell: ({ row }) => (
          <IconButton onClick={() => handleDelete(row.original.id)}>
            <DeleteIcon />
          </IconButton>
        ),
        meta: { width: '100px' },
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      // rowSelection,
      // globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });



  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: '2px', marginBottom: '2px' }}>
        <Grid item xs={12}>
          <Container>
            <Card>
              <CardHeader title='Filters' />
              <TableFilters setData={setFilteredData} tableData={data} />
              <Divider />
              <Box
                sx={{
                  marginBottom: '5px',
                  marginTop: '5px',
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                }}
              >
                <Button onClick={() => setDialogOpen(true)} variant='contained'>
                  Add Post
                </Button>
              </Box>
              <div className='overflow-x-auto' style={{ overflowX: 'auto', marginTop: '2px' }}>
                <table style={{ width: '100%', minWidth: '90%', borderCollapse: 'collapse' }}>
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id} style={{ backgroundColor: '#f5f5f5' }}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            style={{
                              border: '1px solid #ddd',
                              padding: '8px',
                              color: '#333',
                              width: header.column.columnDef.meta ? header.column.columnDef.meta.width : 'auto',
                            }}
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                className={classnames({
                                  'flex items-center': header.column.getIsSorted(),
                                  'cursor-pointer select-none': header.column.getCanSort(),
                                })}
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                  asc: <i className='ri-arrow-up-s-line text-xl' />,
                                  desc: <i className='ri-arrow-down-s-line text-xl' />,
                                }[header.column.getIsSorted()] ?? null}
                              </div>
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  {table.getFilteredRowModel().rows.length === 0 ? (
                    <tbody>
                      <tr>
                        {columns.map((column) => (
                          <td key={column.id} style={{ border: '1px solid #ddd', padding: '8px', width: column.meta ? column.meta.width : 'auto' }}>
                            &nbsp;
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                          No data available
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {table
                        .getRowModel()
                        .rows.slice(0, table.getState().pagination.pageSize)
                        .map((row) => (
                          <tr key={row.id} className={classnames({ selected: row.getIsSelected() })} style={{ borderBottom: '1px solid #ddd' }}>
                            {row.getVisibleCells().map((cell) => (
                              <td key={cell.id} style={{ border: '1px solid #ddd', padding: '8px', width: cell.column.columnDef.meta ? cell.column.columnDef.meta.width : 'auto' }}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            ))}
                          </tr>
                        ))}
                    </tbody>
                  )}
                </table>
              </div>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component='div'
                className='border-bs'
                count={table.getFilteredRowModel().rows.length}
                rowsPerPage={table.getState().pagination.pageSize}
                page={table.getState().pagination.pageIndex}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                }}
                onPageChange={(_, page) => {
                  table.setPageIndex(page);
                }}
                onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
              />
            </Card>
          </Container>
        </Grid>
      </Grid>
      <CreateEditPostDialog  setPageLoad={setPageLoad} open={dialogOpen} handleClose={handleDialogClose} postToEdit={postToEdit} />
    </>
  );
};

export default PostsList;
