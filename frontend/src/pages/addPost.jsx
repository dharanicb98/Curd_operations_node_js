import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, updatePost } from '../store/slices/postsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Box } from '@mui/material';

const AddEditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const postToEdit = useSelector((state) => 
    postId ? state.posts.posts.find((post) => post.id === parseInt(postId)) : null
  );

  const [title, setTitle] = useState(postToEdit ? postToEdit.title : '');
  const [body, setBody] = useState(postToEdit ? postToEdit.body : '');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!body) newErrors.body = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (event) => {

    event.preventDefault();
    if (!validateForm()) return;

    if (postId) {
      dispatch(updatePost({ id: parseInt(postId), updatedPost: { id: parseInt(postId), title, body } }));
    } 
    else {
      dispatch(addPost({ title, body }));
    }

    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container>
      <h1>{postId ? 'Edit Post' : 'Add Post'}</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
          InputProps={{
            style: errors.title ? { borderColor: 'red' } : {},
          }}
        />
        <TextField
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          error={!!errors.body}
          helperText={errors.body}
          InputProps={{
            style: errors.body ? { borderColor: 'red' } : {},
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            {postId ? 'Update Post' : 'Add Post'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleBack}>
            Back
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddEditPost;
