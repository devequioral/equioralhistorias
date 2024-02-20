import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import ModalComponent from '@/components/dashboard/ModalComponent';
import { Card, CardHeader, CardFooter, Button } from '@nextui-org/react';
import DetailMainBanner from '@/components/dashboard/mainbanner/DetailMainBanner';
import MediaUpload from '@/components/dashboard/MediaUpload';
import mainBannerModel from '@/models/mainBannerModel';
import { toast } from 'react-toastify';

async function getBannerData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mainbanner/get`
  );
  return await res.json();
}

export default function MainBanner(props) {
  const { role } = props;
  const flag = React.useRef(false);
  const [showModalRecord, setShowModalRecord] = React.useState(0);
  const [showModalChangeImage, setShowModalChangeImage] = React.useState(0);
  const [recordModal, setRecordModal] = React.useState(mainBannerModel);
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
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/mainbanner/update`;

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
      <div className="mainBanner">
        {loading && <div>Loading...</div>}
        {!loading && (
          <div className="cardContainer">
            <Card isFooterBlurred className="card">
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <div className="title">{recordModal.title}</div>
                <div className="description">{recordModal.description}</div>
              </CardHeader>
              {recordModal && recordModal.image && recordModal.image.src && (
                <Image
                  alt="Main Banner"
                  className=""
                  src={recordModal.image.src}
                  width={721}
                  height={291}
                />
              )}
              <CardFooter className="cardFooter absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 gap-3">
                {recordModal && recordModal.url && (
                  <Button radius="full" size="sm">
                    <Link href={recordModal.url}>Cotizar</Link>
                  </Button>
                )}
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
        .mainBanner {
          justify-content: center;
          display: flex;
          max-width: 721px;
          flex-direction: column;
          margin: 0 auto;
        }
        @media (max-width: 991px) {
          .mainBanner {
            margin: 0 auto;
          }
        }
        .cardContainer {
          height: auto;
        }
        .card {
          min-height: 306px;
        }
        .cardFooter {
          display: flex;
          flex-direction: row;
          gap: 50px;
        }
        .cntMainImage {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }

        .title {
          position: relative;
          color: #fff;
          max-width: 451px;
          font-size: clamp(18px, 2.5vw, 24px);
          line-height: 120%;
          font-family: 'Roboto', -apple-system, Roboto, Helvetica, sans-serif;
          font-weight: 700;
        }
        @media (max-width: 991px) {
          .title {
            max-width: 100%;
          }
        }
        .description {
          position: relative;
          color: #fff;
          letter-spacing: 0.15px;
          margin-top: 9px;
          max-width: 451px;
          font-size: clamp(14px, 1.5vw, 18px);
          line-height: 120%;
          font-family: 'Roboto', -apple-system, Roboto, Helvetica, sans-serif;
          font-weight: 400;
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
      `}</style>
    </>
  );
}
