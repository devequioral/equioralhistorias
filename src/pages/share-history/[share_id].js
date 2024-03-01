import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/dashboard/histories/HistoryDetail.module.css';
import { useRouter } from 'next/router';

async function getPatient(patient_id) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/patients/get?id=${patient_id}`;
  const res = await fetch(url);
  return await res.json();
}

async function getHistory(share_id) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/history/share/get?share_id=${share_id}`;
  const res = await fetch(url);
  return await res.json();
}

export default function shareHistory() {
  const router = useRouter();
  const { share_id } = router.query;
  const targetPdfRef = React.useRef(null);
  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    async function fetchData(share_id) {
      const historyBD = await getHistory(share_id);
      if (
        historyBD &&
        historyBD.data &&
        historyBD.data.records &&
        historyBD.data.records.length > 0
      ) {
        setHistory(historyBD.data.records[0]);
      }
    }
    if (share_id) {
      fetchData(share_id);
    }
  }, [share_id]);

  console.log('share_id:', share_id);
  return (
    <div ref={targetPdfRef} className={`${styles.PdfTarget}`}>
      <div className={`${styles.PdfHeader}`}>
        <div className={`${styles.PdfLeftHeader}`}>
          <div className={`${styles.PdfHeaderInfo}`}>
            <div className={`${styles.PdfRowInfo}`}>
              <div className={`${styles.PdfInfo}`}>
                <h1>Id Historia: </h1>
                <p>{history ? history.id : ''}</p>
              </div>
            </div>
            <div className={`${styles.PdfRowInfo}`}>
              <div className={`${styles.PdfInfo}`}>
                <h1>Criadero: </h1>
                <p>{patient ? patient.horse_farm : ''}</p>
              </div>
              <div className={`${styles.PdfInfo}`}>
                <h1>Dueño: </h1>
                <p>{patient ? patient.owner_name : ''}</p>
              </div>
            </div>
            <div className={`${styles.PdfRowInfo}`}>
              <div className={`${styles.PdfInfo}`}>
                <h1>Caballo: </h1>
                <p>{patient ? patient.horse : ''}</p>
              </div>
              <div className={`${styles.PdfInfo}`}>
                <h1>Teléfono: </h1>
                <p>{patient ? patient.owner_phone : ''}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.PdfRightHeader}`}>
          <div className={`${styles.PdfLogo}`}>
            <Image
              src="/assets/images/theme-light/logo.png"
              width={176}
              height={89}
              alt="Logo"
            />
          </div>
        </div>
      </div>
      <div className={`${styles.PdfBody}`}>
        <div className={`${styles.PdfFieldGroup}`}>
          <div className={`${styles.PdfFieldGroupTitle}`}>
            Observación Inicial
          </div>
          <div className={`${styles.PdfFieldGroupText}`}>
            {history ? history.first_observation : ''}
          </div>
        </div>
        <div className={`${styles.PdfFieldGroup}`}>
          <div className={`${styles.PdfFieldGroupTitle}`}>Tratamiento</div>
          <div className={`${styles.PdfFieldGroupText}`}>
            {history ? history.treatment : ''}
          </div>
        </div>
        <div className={`${styles.PdfPhotos}`}>
          {history &&
            Array.isArray(history.photos) &&
            history.photos.map((photo, index) => (
              <Image
                key={index}
                src={photo.src}
                width={100}
                height={100}
                alt=""
                className={`${styles.PdfPhoto}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
