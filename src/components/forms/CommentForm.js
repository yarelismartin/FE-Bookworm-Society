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
    <div className=" p-2 w-full max-w-lg mx-auto mb-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="input-form">
          <Form.Control
            style={{
              border: '1.6px solid',
              borderColor: '#CBC9C9',
              fontSize: '14px',
            }}
            as="textarea"
            rows={5}
            className="lora-font"
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
        <div className="flex justify-end mt-2">
          <Button style={{ fontSize: '14px' }} type="submit" className="form-btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
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
