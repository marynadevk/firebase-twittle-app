'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'usehooks-ts';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase.config';
import { FormFooter } from '@/components/index';
import { startLoading, stopLoading } from '@/lib/features/loader/loaderSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { IUser, ILoginFormState } from '@/interfaces/index';
import { ERROR_MESSAGE } from '../constants/constants';

enum Fields {
  email = 'email',
  password = 'password',
}

const validationSchema = Yup.object()
  .shape({
    email: Yup.string()
      .email(ERROR_MESSAGE.email)
      .required(ERROR_MESSAGE.required),
    password: Yup.string()
      .min(6, ERROR_MESSAGE.minLength)
      .max(20, ERROR_MESSAGE.maxLength)
      .required(ERROR_MESSAGE.required),
  })
  .required();

const LoginPage = () => {
  const router = useRouter();
  const [_token, setToken] = useLocalStorage<null | string>('token', null);
  const [_user, setUser] = useLocalStorage<null | IUser>('user', null);
  const methods = useForm<ILoginFormState>({
    resolver: yupResolver(validationSchema),
  });
  const { isLoading } = useAppSelector((state) => state.loader);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: ILoginFormState) => {
    dispatch(startLoading());
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
      toast.error(ERROR_MESSAGE.invalidCred);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    injectStyle();
  }, []);

  return (
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
                <span className="text-base label-text text-white">{field}</span>
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
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Sign In'
            )}
          </button>
          <ToastContainer autoClose={1000} />
          <FormFooter formType="login" />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;
