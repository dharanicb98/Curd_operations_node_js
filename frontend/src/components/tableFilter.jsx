import React, { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const TableFilters = ({ setData, tableData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const filteredData = tableData.filter(post => {
      return (
        (!title || post.title.toLowerCase().includes(title.toLowerCase())) &&
        (!description || post.body.toLowerCase().includes(description.toLowerCase()))
      );
    });
    setData(filteredData);
  }, [title, description, tableData, setData]);

  return (
    <CardContent>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="title-filter"
            label="Title"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="description-filter"
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default TableFilters;
