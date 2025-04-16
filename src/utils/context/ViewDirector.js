import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import Loading from '@/components/Loading';
import SignIn from '@/components/SignIn';
import RegistrationForm from '@/components/forms/RegistrationForm';
import UnauthenticatedNavbar from '../../components/navbars/UnauthenticatedNavbar';
import AuthenticatedNavbar from '../../components/navbars/AuthenticatedNavbar';
import ResponsiveNavBar from '../../components/navbars/ResponsiveNavBar';

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
        {/* Desktop Navbar */}
        <div className="hidden md:block">{isNotRegistered ? <UnauthenticatedNavbar /> : <AuthenticatedNavbar userId={user.id} userImage={user.imageUrl} />}</div>

        {/* Mobile Responsive Navbar */}
        <div className="block md:hidden">{isNotRegistered ? <UnauthenticatedNavbar /> : <ResponsiveNavBar userId={user.id} />}</div>

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
