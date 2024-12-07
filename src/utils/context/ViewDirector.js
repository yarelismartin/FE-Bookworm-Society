import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import Loading from '@/components/Loading';
import SignIn from '@/components/SignIn';
import UnauthenticatedNavbar from '@/components/UnauthenticatedNavbar';
import RegistrationForm from '@/components/forms/RegistrationForm';
import AuthenticatedNavbar from '../../components/AuthenticatedNavbar';

function ViewDirectorBasedOnUserAuthStatus({ children }) {
  const { user, userLoading, updateUser } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    const isNotRegistered = user.id == null;
    return (
      <>
        {isNotRegistered ? <UnauthenticatedNavbar /> : <AuthenticatedNavbar />}
        <div className="container">{isNotRegistered ? <RegistrationForm user={user} updateUser={updateUser} /> : children}</div>
      </>
    );
  }

  return <SignIn />;
}

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  children: PropTypes.node.isRequired,
};
