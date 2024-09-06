import { FC } from 'react';
import GoogleSignIn from './GoogleSignIn';
import Link from 'next/link';

type Props = {
  formType: string;
};

const FormFooter: FC<Props> = ({ formType }) => {
  return (
    <div className="flex gap-5 items-center justify-around">
      <GoogleSignIn />
      <span className="text-white font-extralight text-sm">
        {formType === 'login' ? (
          <>
            Do not have an account?{' '}
            <Link
              href="/register"
              className="text-accent hover:text-amber-200 hover:underline"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-accent hover:text-amber-200 hover:underline"
            >
              Login
            </Link>
          </>
        )}
      </span>
    </div>
  );
};

export default FormFooter;
