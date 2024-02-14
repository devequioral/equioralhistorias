import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '@/utils/error';
import { useRouter } from 'next/router';
import { Button } from '@nextui-org/react';

import { CircularProgress, Input } from '@nextui-org/react';

function ConfirmForm(props) {
  const { forceSubmitForm = 0, isLoading, profile } = props;
  const ref = React.useRef();
  const { product, addons } = props.order;
  const [allowSubmit, setAllowSubmit] = React.useState(true);

  React.useEffect(() => {
    if (forceSubmitForm > 0) {
      handleSubmit(_handleSubmit)();
    }
  }, [forceSubmitForm]);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const _handleSubmit = async ({
    address,
    invoice_to,
    contact_name,
    contact_phone,
  }) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    props.onSubmit(true);

    //FETCH DATA TO API/ORDERS/NEW
    fetch('/api/orders/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data_contact: {
          address,
          invoice_to,
          contact_name,
          contact_phone,
        },
        product,
        addons,
      }),
    })
      .then((response) => {
        //IF RESPONSE STATUS IS NOT 200 THEN THROW ERROR
        if (response.status !== 200) {
          throw new Error('No Pudimos Enviar la Cotización');
        }
        return response.json();
      })
      .then((data) => {
        setIsSubmitting(false);
        props.onSubmit(false);
        toast.success('Cotización enviada con éxito');
        router.push(
          `/dashboard/orders/new/complete/?order_id=${data.order.id}`
        );
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsSubmitting(false);
        props.onSubmit(false);
        toast.error('Error al enviar la cotización');
      });
  };
  return (
    <form className="main-container" onSubmit={handleSubmit(_handleSubmit)}>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="form-group">
            <Input
              id={`address`}
              type={`text`}
              label={`Dirección de envío`}
              defaultValue={profile?.address}
              {...register('address', {
                required: 'This Field is Required',
                maxLength: {
                  value: 600,
                  message: 'Max length is 600',
                },
              })}
            />
            {errors.address && (
              <div className={`form-error`}>{errors.address.message}</div>
            )}
          </div>

          <div className="form-group">
            <Input
              id={`invoice_to`}
              type={`text`}
              label={`Facturar a nombre de`}
              defaultValue={profile?.invoice_to}
              {...register('invoice_to', {
                required: 'This Field is Required',
                maxLength: {
                  value: 600,
                  message: 'Max length is 300',
                },
              })}
            />
            {errors.invoice_to && (
              <div className={`form-error`}>{errors.invoice_to.message}</div>
            )}
          </div>

          <div className="form-group">
            <Input
              id={`contact_name`}
              type={`text`}
              label={`Nombre de Contacto`}
              defaultValue={profile?.contact_name}
              {...register('contact_name', {
                required: 'This Field is Required',
                maxLength: {
                  value: 600,
                  message: 'Max length is 300',
                },
              })}
            />
            {errors.contact_name && (
              <div className={`form-error`}>{errors.contact_name.message}</div>
            )}
          </div>

          <div className="form-group">
            <Input
              id={`contact_phone`}
              type={`text`}
              label={`Teléfono de Contacto`}
              defaultValue={profile?.contact_phone}
              {...register('contact_phone', {
                required: 'This Field is Required',
                maxLength: {
                  value: 600,
                  message: 'Max length is 300',
                },
              })}
            />
            {errors.contact_phone && (
              <div className={`form-error`}>{errors.contact_phone.message}</div>
            )}
          </div>

          {/* <button className="login-button" ref={ref}>
            Enviar
          </button> */}
          <Button
            color={!allowSubmit ? 'default' : 'success'}
            disabled={!allowSubmit}
            isLoading={isSubmitting}
            type="submit"
            className={`text-white`}
          >
            Enviar
          </Button>

          <style jsx>{`
            .main-container {
              align-items: center;
              border-radius: 10px;
              background-color: #fff;
              display: flex;
              width: 100%;
              flex-direction: column;
              margin: 0 auto;
              padding: 30px 24px;
              max-width: 600px;
            }

            .form-group {
              display: flex;
              flex-direction: column;
              margin-top: 20px;
              width: 100%;
            }

            .form-label {
              color: rgba(0, 0, 0, 0.6);
              letter-spacing: 0.15px;
              font: 400 16px/144% Roboto, -apple-system, Roboto, Helvetica,
                sans-serif;
            }

            .form-input {
              padding: 10px;
              border-radius: 10px;
              border: 1px solid #d4d4d4;
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
              background-color: #82bb30;
              align-self: stretch;
              margin-top: 17px;
              justify-content: center;
              align-items: center;
              padding: 10px;
              font: 400 14px/175% Roboto, -apple-system, Roboto, Helvetica,
                sans-serif;
              border: none;
              cursor: pointer;
              max-width: 144px;
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
        </>
      )}
    </form>
  );
}

export default ConfirmForm;
