import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

const AccountPage = () => {
  const { ready, user } = useContext(UserContext)

  let { subpage } = useParams()

  if (subpage === undefined) {
    subpage = 'myprofile'
  }

  const logout = async () => {
    await axios.post('/logout')
  }

  if (!ready) {
    return 'Loading...'
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />
  }

  const linkClasses = (type = null) => {
    let classes = 'py-2 px-6'
    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full'
    }
    return classes
  }

  return (
    <div>
      <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
        <Link className={linkClasses('myprofile')} to={'/account'}>
          My Profile
        </Link>
        <Link className={linkClasses('mybooking')} to={'/account/mybooking'}>
          My Booking
        </Link>
        <Link
          className={linkClasses('myaccomodations')}
          to={'/account/myaccomodations'}
        >
          My Accomodations
        </Link>
      </nav>
      {subpage === 'myprofile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className='primary max-w-sm mt-2'>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default AccountPage
