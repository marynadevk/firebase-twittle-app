'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'usehooks-ts';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase.config';
import { ERROR_MESSAGE } from '../constants/constants';
import { FormFooter, NewAvatar } from '@/components/index';
import { IRegistrationForm, IUser } from '@/interfaces/index';


enum Fields {
  fullName = 'fullName',
  email = 'email',
  password = 'password',
  confirmPassword = 'confirmPassword',
}

const validationSchema = Yup.object()
  .shape({
    fullName: Yup.string().required(ERROR_MESSAGE.required),
    email: Yup.string().email(ERROR_MESSAGE.email).required(ERROR_MESSAGE.required),
    password: Yup.string()
      .min(6, ERROR_MESSAGE.minLength)
      .max(20, ERROR_MESSAGE.maxLength)
      .required(ERROR_MESSAGE.required),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], ERROR_MESSAGE.passwordConfirm)
      .required(ERROR_MESSAGE.required),
    avatarUrl: Yup.string().url(ERROR_MESSAGE.invalidUrl).required(),
  })
  .required();

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [_user, setUser] = useLocalStorage<null | IUser>('user', null);
  const [_token, setToken] = useLocalStorage<null | string>('token', null);
  const router = useRouter();

  const methods = useForm<IRegistrationForm>({
    resolver: yupResolver<IRegistrationForm>(validationSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: IRegistrationForm) => {
    setLoading(true);

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const currentUser = userCredentials.user;
      await updateProfile(currentUser, {
        displayName: data.fullName,
        photoURL: data.avatarUrl,
      });

      const token = await currentUser.getIdToken();
      setToken(token);
      if (!currentUser) return;

      setUser({
        fullName: data.fullName || '',
        email: currentUser.email || '',
        uid: currentUser.uid,
        avatarUrl: data.avatarUrl || '',
      });
      router.push('/');
    } catch (error) {
      toast.error(ERROR_MESSAGE.signUp);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    injectStyle();
  }, []);

  return (
    <>
      <ToastContainer autoClose={500} />
      <div className="flex justify-center items-center h-screen font-primary p-10 m-2">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-2 flex-col space-y-4 w-full max-w-2xl shadow-lg p-10 bg-slate-800 text-white text-2xl text-center"
          >
            Registration
            <NewAvatar setValue={setValue} />
            {Object.values(Fields).map((field) => (
              <div key={field}>
                <label className="label">
                  <span className="text-base label-text text-white">
                    {field}
                  </span>
                </label>
                <input
                  type={
                    field === Fields.password ||
                    field === Fields.confirmPassword
                      ? 'password'
                      : 'text'
                  }
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
                'Sign Up'
              )}
            </button>
            <FormFooter formType="register" />
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default RegisterPage;
