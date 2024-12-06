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
    return (
      <>
        <UnauthenticatedNavbar /> {/* NavBar only visible if user is logged in and is in every view */}
        {user.user == null ? '' : <AuthenticatedNavbar />}
        <div className="container">{user.id == null ? <RegistrationForm user={user} updateUser={updateUser} /> : { ...children }}</div>
      </>
    );
  }

  return <SignIn />;
}

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  children: PropTypes.node.isRequired,
};
