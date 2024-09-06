'use client';

import { auth } from '@/lib/firebase';
import { IRegistrationForm } from '@/interfaces/IRegistrationForm';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { IUser } from '@/interfaces/IUser';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { errMsg } from '../helpers/errorMessages';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import FormFooter from '@/components/FormFooter';
import NewAvatar from '@/components/NewAvatar';

enum Fields {
  fullName = 'fullName',
  email = 'email',
  password = 'password',
  confirmPassword = 'confirmPassword',
}

const validationSchema = Yup.object()
  .shape({
    fullName: Yup.string().required(errMsg.required),
    email: Yup.string().email(errMsg.email).required(errMsg.required),
    password: Yup.string()
      .min(6, errMsg.minLength)
      .max(20, errMsg.maxLength)
      .required(errMsg.required),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      errMsg.passwordConfirm
    ).required(errMsg.required),
    avatarUrl: Yup.string().url(errMsg.invalidUrl),
  })
  .required();

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useLocalStorage<null | IUser>('user', null);
  const [token, setToken] = useLocalStorage<null | string>('token', null);
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
      console.log(data.avatarUrl, data.fullName);
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
      toast.error('Error signing up, try again');
    } finally {
      setLoading(false);
    }
  };

  injectStyle();

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
