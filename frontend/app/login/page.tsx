'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ILoginFormState } from '@/interfaces/ILoginFormState';
import { auth } from '@/lib/firebase';
import { useLocalStorage } from 'usehooks-ts';
import { IUser } from '@/interfaces/IUser';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';
import { errMsg } from '../helpers/errorMessages';
import FormFooter from '@/components/FormFooter';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

enum Fields {
  email = 'email',
  password = 'password',
}

const validationSchema = Yup.object()
  .shape({
    email: Yup.string().email(errMsg.email).required(errMsg.required),
    password: Yup.string()
      .min(6, errMsg.minLength)
      .max(20, errMsg.maxLength)
      .required(errMsg.required),
  })
  .required();

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [token, setToken] = useLocalStorage<null | string>('token', null);
  const [user, setUser] = useLocalStorage<null | IUser>('user', null);
  const methods = useForm<ILoginFormState>({
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  injectStyle();

  const onSubmit = async (data: ILoginFormState) => {
    setLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredentials.user;
      const token = await user.getIdToken();

      setToken(token);
      setUser({
        fullName: user.displayName || '',
        email: user.email || '',
        uid: user.uid,
        avatarUrl: user.photoURL || '',
      });

      if (user) {
        router.push(`/`);
      }
    } catch {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={5000} />

      <div className="flex justify-center items-center h-screen font-primary p-10 m-2 ">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-2 flex-col space-y-4 w-full max-w-2xl shadow-lg p-10 bg-slate-800 text-white text-2xl text-center"
          >
            Login
            {Object.values(Fields).map((field) => (
              <div key={field}>
                <label className="label">
                  <span className="text-base label-text text-white">
                    {field}
                  </span>
                </label>
                <input
                  type={field === Fields.password ? 'password' : 'text'}
                  placeholder={field}
                  className="w-full input input-bordered text-stone-900"
                  {...register(field)}
                />
                {errors[field] && (
                  <p className="text-red-500 font-extralight text-xs">
                    {errors[field]?.message}
                  </p>
                )}
              </div>
            ))}
            <button type="submit" className="btn btn-outline btn-accent">
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                'Sign In'
              )}
            </button>
            <FormFooter formType="login" />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default LoginPage;
