// CreateEditPostDialog.js

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { addPost, updatePost } from '../store/slices/postsSlice';

const CreateEditPostDialog = ({ open, handleClose, postToEdit, setPageLoad }) => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (postToEdit) {
      setFormData({ title: postToEdit.title, body: postToEdit.body });
    }
    else {
      setFormData({ title: '', body: '' });
    }
  }, [postToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.body) newErrors.body = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (postToEdit) {
      dispatch(updatePost({ id: postToEdit.id, updatedPost: formData }));
    } 
    else {
      dispatch(addPost(formData));
    }
    setPageLoad((prev) => !prev)
    setErrors({})
    handleClose();
    setFormData({ title: '', body: ''})
  };



  const closeDialog = () => {
    setErrors({})
    handleClose();
    setFormData({ title: '', body: ''})
  }

 

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
      <DialogTitle>{postToEdit ? 'Edit Post' : 'Create New Post'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
            <TextField
                autoFocus
                margin="dense"
                id="title"
                name="title"
                label="Title"
                type="text"
                fullWidth
                value={formData?.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                InputProps={{
                  style: errors.title ? { borderColor: 'red' } : {},
                }}
            />

            <TextField
                margin="dense"
                id="body"
                name="body"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={formData?.body}
                onChange={handleChange}
                error={!!errors.body}
                helperText={errors.body}
                InputProps={{
                  style: errors.body ? { borderColor: 'red' } : {},
                }}
            />

            <DialogActions>
                <Button onClick={closeDialog} variant="outlined" color="secondary"> Cancel </Button>
                <Button type='submit' variant="contained" color="primary">{postToEdit ? 'Save Changes' : 'Create'}</Button>
            </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditPostDialog;

