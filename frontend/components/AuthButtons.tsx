import Link from 'next/link';
import React from 'react';

const AuthButtons = () => {
  return (
    <div className="flex flex-col flex-grow gap-2">
      <button className="btn btn-outline btn-accent">
        <Link className="w-full" href="/register">
          Sign up
        </Link>
      </button>
      <button className="btn btn-outline btn-accent">
        <Link className="w-full" href="/login">
          Sign in
        </Link>
      </button>
    </div>
  );
};

export default AuthButtons;
