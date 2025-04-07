'use client';

import React from 'react';
import { useAuth } from '@/utils/context/authContext';
import { useParams } from 'next/navigation';
import ReviewForm from '../../../../../components/forms/ReviewForm';

export default function ReviewCreate() {
  const { user } = useAuth();
  const { bookId } = useParams();
  return (
    <div>
      <ReviewForm book={bookId} user={user.id} />
    </div>
  );
}
