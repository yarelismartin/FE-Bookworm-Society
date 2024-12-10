'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import { Card, CardHeader, CardBody, Typography, Button, Avatar, CardFooter } from '@material-tailwind/react';
import { addUserToClub, getSingleBookClub } from '../api/BookClubData';

export default function BookClubDetails({ bookClubId }) {
  const [bookClub, setBookClub] = useState({});
  const { user } = useAuth();

  const getBookClub = () => {
    getSingleBookClub(bookClubId, user.id).then(setBookClub);
  };

  const handleAddingUser = () => {
    addUserToClub(bookClubId, user.id).then(() => {
      getBookClub();
    });
  };

  useEffect(() => {
    getBookClub();
  }, []);

  return (
    <div label="Have Read">
      <Card className="w-full max-w-[48rem] flex-row">
        <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
          <img alt={bookClub.name} src={bookClub.imageUrl} className="h-full w-full object-cover" />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {bookClub.name}
          </Typography>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            {bookClub.meetUpType}
          </Typography>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            {bookClub.dateCreated}
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            {bookClub.description}
          </Typography>
          <CardFooter className="pt-0">
            {bookClub.isMemberOrHost ? (
              <Button ripple={false} fullWidth className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                Leave This Club
              </Button>
            ) : (
              <Button ripple={false} fullWidth onClick={handleAddingUser} className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                Become A Member
              </Button>
            )}
          </CardFooter>
        </CardBody>
      </Card>
      <Card className="w-[45%]">
        <CardHeader shadow={false} floated={false} className="h-60">
          <img alt="book" src={bookClub.book?.imageUrl} className="h-full w-full object-cover" />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {bookClub.book?.title}
            </Typography>
          </div>

          <Typography variant="small" color="gray" className="font-normal opacity-75">
            By: {bookClub.book?.author}
          </Typography>
        </CardBody>
      </Card>
      <Card className="w-96">
        <CardBody>
          <div className="mb-4 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="">
              Memebers
            </Typography>
          </div>
          <div className="divide-y divide-gray-200">
            <div key={bookClub.host?.id} className="flex items-center justify-between pb-3 pt-3 last:pb-0">
              <div className="flex items-center gap-x-3">
                <Avatar size="sm" src={bookClub.host?.imageUrl} alt={bookClub.host?.imageUrl} />
                <div>
                  <Typography variant="small" color="gray">
                    @{bookClub.host?.username}
                  </Typography>
                </div>
              </div>
            </div>
            {bookClub.members?.map((member) => (
              <div key={member.id} className="flex items-center justify-between pb-3 pt-3 last:pb-0">
                <div className="flex items-center gap-x-3">
                  <Avatar size="sm" src={member.imageUrl} alt={member.imageUrl} />
                  <div>
                    <Typography variant="small" color="gray">
                      @{member.username}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

BookClubDetails.propTypes = {
  bookClubId: PropTypes.number,
};

/* pass is a memeber or host to the tab page and have useeffect call it and pass th ebool value if its true then show all tabs otherwise dont */
