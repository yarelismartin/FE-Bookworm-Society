/* eslint-disable react/no-array-index-key */
import { Card, CardHeader, CardBody, Typography, Avatar } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import DOMPurify from 'dompurify';
import ReviewDropDown from '../ReviewDropDown';
import { deleteReview } from '../../api/ReviewData';

function StarIcon({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`h-[18px] w-[18px] ${className}`}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  );
}

StarIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default function ReviewCard({ reviewObj, onUpdate }) {
  const { user } = useAuth();
  const formattedDate = new Date(reviewObj.createdDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDelete = (reviewId) => {
    deleteReview(reviewId).then(onUpdate);
  };

  return (
    <Card color="transparent" shadow={false} className="w-full">
      <hr />
      <CardHeader color="transparent" floated={false} shadow={false} className="mx-0 flex items-center gap-4 pt-0 pb-8">
        <Avatar size="lg" variant="circular" src={reviewObj.user.imageUrl} alt="tania andrew" />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-semibold">
              {reviewObj.user.username}
            </Typography>
            {user.id === reviewObj.user.id && <ReviewDropDown onDelete={() => handleDelete(reviewObj.id)} />}
          </div>
          <div className="flex items-center justify-between">
            <Typography color="blue-gray" className="text-sm">
              {formattedDate}
            </Typography>
            <div className="5 flex items-center gap-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={`star-${reviewObj.id}-${i}`} className={i < reviewObj.rating ? 'text-[#e87400]' : 'text-[#c2c7cc]'} />
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0 break-words">
        <div
          className="prose break-words whitespace-normal review-content text-[#424242] lora-font"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(reviewObj.content) }}
        />
      </CardBody>
    </Card>
  );
}

ReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    createdDate: PropTypes.string,
    rating: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      imageUrl: PropTypes.string,
      username: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
