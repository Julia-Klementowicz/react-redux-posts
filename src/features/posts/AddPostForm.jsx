import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

function AddPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  function onSavePost(e) {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
      } catch (err) {
        console.error('Failed to save the post', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={onSavePost}>
        <label htmlFor='postAuthor'>Author: </label>
        <select
          id='postAuthor'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value='' />
          {userOptions}
        </select>
        <label htmlFor='postTitle'>Post Title</label>
        <input
          type='text'
          id='postTitle'
          name='postTitle'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='postContent'>Content: </label>
        <textarea
          name='postContent'
          id='postContent'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          cols='30'
          rows='10'
        />
        <input type='submit' value='Add a new post' disabled={!canSave} />
      </form>
    </section>
  );
}

export default AddPostForm;
