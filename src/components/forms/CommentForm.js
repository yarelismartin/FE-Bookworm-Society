import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createAComment } from '../../api/CommentData';

const initalComment = {
  content: '',
};

export default function CommentForm({ postId, userId, onUpdate }) {
  const [commentInput, setCommentInput] = useState(initalComment);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.content.trim()) {
      alert('Please fill out this field.');
    } else {
      const payload = { ...commentInput, postId, userId };
      createAComment(payload).then(() => {
        setCommentInput(initalComment);
        onUpdate();
      });
    }
  };

  return (
    <div
      style={{
        border: '1px solid',
        margin: '20px auto',
        padding: '15px 15px',
        borderRadius: '10px',
        borderColor: 'black',
        width: '80%',
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="input-form" style={{ marginTop: '0px' }}>
          <Form.Control
            style={{
              border: '1.6px solid',
              borderColor: '#CBC9C9',
              fontSize: '14px',
            }}
            as="textarea"
            rows={5}
            placeholder="Make a comment..."
            name="content"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }}
            value={commentInput.content}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <hr style={{ backgroundColor: '#CBC9C9', margin: '10px' }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
          <Button style={{ fontSize: '14px' }} type="submit">
            Comment
          </Button>
        </div>
      </Form>
    </div>
  );
}
// comment
// postid
// userid
CommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
