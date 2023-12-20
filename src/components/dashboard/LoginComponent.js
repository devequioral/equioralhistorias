import Image from 'next/image';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getError } from '@/utils/error';

function LoginForm(props) {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/dashboard');
    }
  }, [router, session, redirect]);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const _handleSubmit = async ({ username, password }) => {
    if (isSubmitting) return;

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form className="main-container" onSubmit={handleSubmit(_handleSubmit)}>
      <header className="header">
        <Image
          src="/assets/images/logo.svg"
          width={267.9}
          height={62.7}
          alt="Logo"
        />
      </header>
      <div className="form-group">
        <label htmlFor="username" className="form-label">
          Usuario *
        </label>
        <input
          type="text"
          id="username"
          className="form-input"
          aria-label="Username"
          placeholder="username / email"
          {...register('username', {
            required: 'This Field is Required',
            maxLength: {
              value: 300,
              message: 'Max length is 300',
            },
          })}
        />
        {errors.username && (
          <div className={`form-error`}>{errors.username.message}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password *
        </label>
        <input
          type="password"
          id="password"
          className="form-input"
          aria-label="Password"
          placeholder="your password"
          {...register('password', {
            required: 'This Field is Required',
            maxLength: {
              value: 300,
              message: 'Max length is 300',
            },
          })}
        />
        {errors.password && (
          <div className={`form-error`}>{errors.password.message}</div>
        )}
      </div>
      <button className="login-button">Entrar</button>
      <p className="terms-message">
        Al Ingresar a nuestra plataforma usted está de acuerdo a nuestros{' '}
        <a
          href="#"
          className="terms-link"
          style={{ textDecorationLine: 'underline', color: '#228ece' }}
          aria-label="Terms and conditions"
        >
          términos y condiciones
        </a>
      </p>
      <div className="remember-me-group">
        <label className="remember-me-label">Recordar mis Datos</label>
        <div className="checkbox" />
      </div>
      <style jsx>{`
        .main-container {
          align-items: center;
          border-radius: 10px;
          background-color: #fff;
          display: flex;
          max-width: 294px;
          flex-direction: column;
          margin: 0 auto;
          padding: 30px 24px;
        }

        .header {
          padding: 10px;
          margin-bottom: 20px;
          text-align: center;
        }

        .header-logo {
          aspect-ratio: 4.28;
          object-fit: contain;
          object-position: center;
          width: 244px;
          max-width: 244px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          margin-top: 20px;
        }

        .form-label {
          color: rgba(0, 0, 0, 0.6);
          letter-spacing: 0.15px;
          font: 400 16px/144% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }

        .form-input {
          padding: 10px;
        }

        .form-error {
          color: rgba(244, 11, 11, 0.6);
          letter-spacing: 0.15px;
          font: 400 12px/144% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
          align-self: start;
        }

        .login-button {
          color: #fff;
          text-align: center;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          border-radius: 10px;
          box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.2);
          background-color: #4f3cc9;
          align-self: stretch;
          margin-top: 17px;
          justify-content: center;
          align-items: center;
          padding: 14px 60px;
          font: 400 14px/175% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
          border: none;
          cursor: pointer;
        }

        .terms-message {
          letter-spacing: 0.4px;
          align-self: stretch;
          margin-top: 18px;
          font: 400 10px/12px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }

        .terms-link {
          color: #228ece;
        }

        .remember-me-group {
          align-self: stretch;
          flex-direction: row;
          margin-top: 12px;
          justify-content: flex-start;
          align-items: center;
          display: flex;
          gap: 10px;
        }

        .remember-me-label {
          color: rgba(0, 0, 0, 0.62);
          letter-spacing: 0.4px;
          margin: auto 0;
          font: 400 10px/120% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }

        .checkbox {
          border: 1px solid rgba(0, 0, 0, 0.6);
          width: 14px;
          height: 13px;
          align-self: stretch;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </form>
  );
}

export default LoginForm;
