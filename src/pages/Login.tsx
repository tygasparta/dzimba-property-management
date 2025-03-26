import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../App';
import Logo from '../components/common/Logo';

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Logo size="large" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-zim-green hover:text-zim-green-dark">
              create a new account
            </Link>
          </p>
        </div> 