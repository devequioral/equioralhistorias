import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Card, CardHeader, CardFooter, Button } from '@nextui-org/react';
import secondaryBannerModel from '@/models/secondaryBannerModel';
import ModalComponent from '@/components/dashboard/ModalComponent';
import DetailMainBanner from '@/components/dashboard/mainbanner/DetailMainBanner';
import MediaUpload from '@/components/dashboard/MediaUpload';
import { toast } from 'react-toastify';

async function getBannerData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/secondarybanner/get`
  );
  return await res.json();
}

export default function MyComponent(props) {
  const { data, role } = props;
  const flag = React.useRef(false);
  const [showModalRecord, setShowModalRecord] = React.useState(0);
  const [showModalChangeImage, setShowModalChangeImage] = React.useState(0);
  const [recordModal, setRecordModal] = React.useState(secondaryBannerModel);
  const [loading, setLoading] = React.useState(false);

  const [recordChange, setRecordChange] = React.useState(false);
  const [allowUploadImage, setAllowUploadImage] = React.useState(false);
  const [recordImage, setRecordImage] = React.useState(null);
  const [savingRecord, setSavingRecord] = React.useState(false);
  const [savingImage, setSavingImage] = React.useState(false);
  const [validation, setValidation] = React.useState({});

  const onRecordChange = (value) => {
    setRecordChange(value);
  };

  const onFieldChange = (key, value) => {
    const newRecord = { ...recordModal };
    newRecord[key] = value;
    setRecordModal(newRecord);
    setRecordChange(true);
  };

  const showChangeImage = (image) => {
    setShowModalChangeImage((currCount) => currCount + 1);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (flag.current) return;
      flag.current = true;

      const fetchRecords = async () => {
        setLoading(true);
        const mainBannerBD = await getBannerData();
        if (
          mainBannerBD &&
          mainBannerBD.record &&
          mainBannerBD.record.records &&
          mainBannerBD.record.records.length > 0
        ) {
          setRecordModal({
            ...mainBannerBD.record.records[0],
          });
        } else {
          setRecordModal({});
        }
        setLoading(false);
      };
      fetchRecords();
    }
  }, []);

  const saveBanner = async () => {
    if (savingRecord) return;
    setSavingRecord(true);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/secondarybanner/update`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ record: recordModal }),
    });

    if (response.ok) {
      toast.success('Registro Guardado con éxito');
      setShowModalRecord(0);
      setSavingRecord(false);
    } else {
      const { message, validation } = await response.json();
      if (validation) setValidation(validation);
      //toast.error(message);
      setSavingRecord(false);
    }
  };

  const uploadImage = async () => {
    if (savingImage) return;
    setSavingImage(true);
    const body = new FormData();
    body.append('file', recordImage);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/admin/media/upload',
      {
        method: 'POST',
        body,
      }
    );

    if (response.ok) {
      const { url, fields, mediaKey, urlMedia } = await response.json();
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('file', recordImage);

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (uploadResponse.ok) {
        //toast.success('Imágen Guardada con éxito');
        const newRecord = { ...recordModal };
        newRecord.image.src = urlMedia;
        setRecordModal(newRecord);
        setRecordChange(true);
      } else {
        toast.error('La imágen no se pudo guardar');
      }
      setShowModalChangeImage(0);
      setSavingImage(false);
    } else {
      setSavingImage(false);
    }
  };
  return (
    <>
      <div className="secondaryBanner">
        {loading && <div>Loading...</div>}
        {!loading && (
          <div className="cardContainer">
            <Card isFooterBlurred className="card">
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <div className="cardHeader">
                  <div className="title">{recordModal.title}</div>
                  <div className="description">{recordModal.description}</div>
                </div>
              </CardHeader>
              <Image
                alt="Secondary Banner"
                className="img"
                src={recordModal.image.src}
                width={306}
                height={428}
                style={{
                  height: '100%',
                  width: 'auto',
                  maxWidth: '210px',
                  objectFit: 'contain',
                }}
              />
              <CardFooter className="cardFooter absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 gap-3">
                <Button radius="full" size="sm">
                  <Link href={recordModal.url}>Cotizar</Link>
                </Button>
                {role === 'admin' && (
                  <Button
                    isIconOnly
                    color="default"
                    aria-label="Edit"
                    size="sm"
                    onClick={() => {
                      setShowModalRecord((currCount) => currCount + 1);
                    }}
                  >
                    <Image
                      src="/assets/images/icon_pencil.svg"
                      width={20}
                      height={20}
                      alt="Edit"
                    />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        )}
        <ModalComponent
          show={showModalRecord}
          onSave={saveBanner}
          title="Editar Banner"
          onCloseModal={() => {
            setRecordChange(false);
          }}
          allowSave={recordChange}
          savingRecord={savingRecord}
          size={'md'}
        >
          <DetailMainBanner
            onRecordChange={(value) => {
              onRecordChange(value);
            }}
            record={recordModal}
            onFieldChange={(key, value) => {
              onFieldChange(key, value);
            }}
            onChangeImage={(image) => {
              showChangeImage(image);
            }}
            validation={validation}
            schema={{
              title: 'Detalle del Banner',
              fields: [
                {
                  key: 'id',
                  label: 'Banner ID',
                  type: 'hidden',
                },
                {
                  key: 'title',
                  label: 'Titulo',
                  type: 'text',
                  isRequired: true,
                },
                {
                  key: 'description',
                  label: 'Descripción',
                  type: 'text',
                  isRequired: true,
                },
                {
                  key: 'image',
                  label: 'Imágen',
                  type: 'image',
                  preview: true,
                },
                {
                  key: 'url',
                  label: 'Url',
                  type: 'text',
                  isRequired: true,
                },
              ],
            }}
          />
        </ModalComponent>
        <ModalComponent
          show={showModalChangeImage}
          onSave={uploadImage}
          title="Cambiar Imágen"
          onCloseModal={() => {
            setAllowUploadImage(false);
          }}
          allowSave={allowUploadImage}
          savingRecord={savingImage}
        >
          <MediaUpload
            onImageChange={(image) => {
              setRecordImage(image);
              setAllowUploadImage(true);
            }}
          />
        </ModalComponent>
      </div>
      <style jsx>{`
        .secondaryBanner {
          display: flex;
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
        }
        .cardContainer {
          width: 100%;
        }
        .img {
          height: 100%;
          width: auto;
          max-width: 210px;
          object-fit: contain;
        }

        .cardHeader {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          height: 100%;
          margin-top: 50px;
        }

        .title {
          position: relative;
          color: #333;
          max-width: 451px;
          font-size: clamp(18px, 2.5vw, 24px);
          line-height: 120%;
          font-family: 'Roboto', -apple-system, Roboto, Helvetica, sans-serif;
          font-weight: 700;
          text-align: right;
        }
        @media (max-width: 991px) {
          .title {
            max-width: 100%;
          }
        }
        .description {
          position: relative;
          color: #333;
          letter-spacing: 0.15px;
          margin-top: 9px;
          max-width: 451px;
          font-size: clamp(14px, 1.5vw, 18px);
          line-height: 120%;
          font-family: 'Roboto', -apple-system, Roboto, Helvetica, sans-serif;
          font-weight: 400;
          text-align: right;
        }
        @media (max-width: 510px) {
          .description {
            display: none;
          }
        }
        @media (max-width: 991px) {
          .description {
            max-width: 100%;
          }
        }

        .div-2 {
          gap: 20px;
          display: flex;
          position: relative;
          justify-content: flex-end;
        }
        @media (max-width: 991px) {
          .div-2 {
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 180px;
          margin-left: 0px;
          position: absolute;
          top: -20px;
          left: 0;
          z-index: 1;
        }

        @media (max-width: 492px) {
          .column {
            display: none;
          }
        }
        .img {
          aspect-ratio: 0.71;
          object-fit: contain;
          object-position: center;
          width: 153px;
          overflow: hidden;
          max-width: 100%;
          flex-grow: 1;
        }

        @media (max-width: 640px) {
          .img {
            position: absolute;
            z-index: 1;
          }
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 75%;
          margin-left: 20px;
          z-index: 2;
        }
        @media (max-width: 991px) {
          .column-2 {
            width: 70%;
          }
        }
        @media (max-width: 492px) {
          .column-2 {
            width: 100%;
          }
        }
        .div-3 {
          display: flex;
          flex-direction: column;
          margin: auto 0;
        }
        @media (max-width: 991px) {
          .div-3 {
            max-width: 80%;
            margin: 40px auto 0;
          }
        }
        @media (max-width: 640px) {
          .div-3 {
            max-width: 50%;
            margin-left: auto;
            z-index: 2;
          }
        }
        .div-4 {
          color: #153d68;
          align-self: center;
          white-space: nowrap;
          font: 700 32px/100% Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-4 {
            white-space: initial;
            text-align: center;
          }
        }
        @media (max-width: 640px) {
          .div-4 {
            text-align: center;
          }
        }
        .div-5 {
          color: rgba(0, 0, 0, 0.6);
          text-align: center;
          letter-spacing: 0.15px;
          width: 90%;
          margin-top: 32px;
          font: 400 12px/14px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-5 {
            max-width: 95%;
          }
          .div-5 {
            display: none;
          }
        }
        .div-6 {
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.2);
          background-color: #4f3cc9;
          align-self: center;
          display: flex;
          margin-top: 27px;
          gap: 8px;
          padding: 8px 14px;
        }
        .img-2 {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 20px;
          overflow: hidden;
          max-width: 100%;
          margin: auto 0;
        }
        .div-7 {
          color: #fff;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          align-self: stretch;
          flex-grow: 1;
          white-space: nowrap;
          font: 400 14px/25px Roboto, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-7 {
            white-space: initial;
          }
        }
      `}</style>
    </>
  );
}
