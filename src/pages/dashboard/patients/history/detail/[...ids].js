import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import { ThemeContext } from '@/contexts/ThemeContext';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import historyModel from '@/models/historyModel';
import Image from 'next/image';
import { formatDate, capitalizeFirstLetter, shortUUID } from '@/utils/utils';
import { useRouter } from 'next/router';
import styles from '@/styles/dashboard/histories/HistoryDetail.module.css';

import {
  Card,
  CardHeader,
  Skeleton,
  Textarea,
  Button,
  CircularProgress,
} from '@nextui-org/react';

async function getPatient(patient_id) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/patients/get?id=${patient_id}`;
  const res = await fetch(url);
  return await res.json();
}

async function getHistory(history_id) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/patients/history/get?id=${history_id}`;
  const res = await fetch(url);
  return await res.json();
}

function HistoryDetail() {
  const router = useRouter();
  const { ids } = router.query;
  const [patient_id, history_id] = ids ? ids : [null, null];
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [urlGetRecords, setUrlGetRecords] = useState(null);
  const urlNewRecord = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/patients/history/new`;
  const urlUpdateRecord = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/patients/history/update`;
  historyModel.patient_id = patient_id;

  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState(null);
  const [changeField, setChangeField] = useState(false);
  const [savingRecord, setSavingRecord] = useState(false);

  useEffect(() => {
    async function fetchData(patient_id) {
      const patientBD = await getPatient(patient_id);
      if (
        patientBD &&
        patientBD.data &&
        patientBD.data.records &&
        patientBD.data.records.length > 0
      ) {
        setPatient(patientBD.data.records[0]);
      }
    }
    if (patient_id) {
      setUrlGetRecords(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/patients/history/list?patient_id=${patient_id}`
      );

      fetchData(patient_id);
    }
  }, [patient_id]);

  useEffect(() => {
    async function fetchData(history_id) {
      const historyBD = await getHistory(history_id);
      if (
        historyBD &&
        historyBD.data &&
        historyBD.data.records &&
        historyBD.data.records.length > 0
      ) {
        setHistory(historyBD.data.records[0]);
      }
    }
    if (history_id) {
      fetchData(history_id);
    }
  }, [history_id]);

  const viewHistoryDetail = (record) => {
    router.push(
      '/dashboard/patients/history/detail/' +
        record.patient_id +
        '/' +
        record.id
    );
  };

  let debounceTimer;

  const onChangeField = (field, value) => {
    console.log('onchangeField');
    setChangeField(true);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log('Debounce Timer');
      const new_history = { ...history };
      new_history[field] = value;
      setHistory(new_history);
    }, 3000);
  };

  const saveRecord = useCallback(async () => {
    if (!changeField) return;
    console.log('Saving Record', history);

    if (savingRecord) return;
    setSavingRecord(true);
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/patients/history/update`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ record_request: history }),
    });

    if (response.ok) {
      setChangeField(false);
      setSavingRecord(false);
    } else {
      setChangeField(false);
      setSavingRecord(false);
    }
  }, [history, savingRecord]);

  useEffect(() => {
    if (!history) return;
    saveRecord();
  }, [history, saveRecord]);

  return (
    <>
      <Metaheader title="Historia del Paciente | Equioral" />
      <Layout theme={theme} toogleTheme={toggleTheme}>
        <BreadCrumbs
          theme={theme}
          data={{
            links: [
              { href: '/dashboard', title: 'Home' },
              { href: '/dashboard/patients', title: 'Pacientes' },
              {
                href: `/dashboard/patients/history/${patient_id}`,
                title: 'Historias Clínicas',
              },
              { href: false, title: 'Detalle de Historia' },
            ],
          }}
        />
        <div className={`${styles.HistoryDetail}`}>
          <div className={`${styles.Container}`}>
            <div className={`${styles.Header}`}>
              <Card className="" style={{ width: 'auto', margin: '30px 0' }}>
                <CardHeader className={`${styles.CardHeader}`}>
                  <div className={`${styles.CardRow}`}>
                    <h4 className={`${styles.CardTitle}`}>ID Historia:</h4>
                    <h5 className={`${styles.CardText}`}>
                      {history ? (
                        history.id
                      ) : (
                        <Skeleton className={`${styles.Skeleton}`}>
                          <div
                            className={`${styles.SkeletonBody} ${styles.thin}`}
                          ></div>
                        </Skeleton>
                      )}
                    </h5>
                  </div>
                  <div className={`${styles.CardRow}`}>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-1 items-start justify-start">
                        <h4 className={`${styles.CardTitle}`}>Criadero:</h4>
                        <h5 className={`${styles.CardText}`}>
                          {patient ? (
                            patient.horse_farm
                          ) : (
                            <Skeleton className={`${styles.Skeleton}`}>
                              <div
                                className={`${styles.SkeletonBody} ${styles.thin}`}
                              ></div>
                            </Skeleton>
                          )}
                        </h5>
                      </div>
                      <div className="flex flex-row gap-1 items-start justify-start">
                        <h4 className={`${styles.CardTitle}`}>Teléfono:</h4>
                        <h5 className={`${styles.CardText}`}>
                          {patient ? (
                            patient.horse
                          ) : (
                            <Skeleton className={`${styles.Skeleton}`}>
                              <div
                                className={`${styles.SkeletonBody} ${styles.thin}`}
                              ></div>
                            </Skeleton>
                          )}
                        </h5>
                      </div>
                      <div className="flex flex-row gap-1 items-start justify-start">
                        <h4 className={`${styles.CardTitle}`}>Fecha:</h4>
                        <h5 className={`${styles.CardText}`}>
                          {history ? (
                            formatDate(history.createdAt)
                          ) : (
                            <Skeleton className={`${styles.Skeleton}`}>
                              <div
                                className={`${styles.SkeletonBody} ${styles.thin}`}
                              ></div>
                            </Skeleton>
                          )}
                        </h5>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-1 items-start justify-start">
                        <h4 className={`${styles.CardTitle}`}>Dueño:</h4>
                        <h5 className={`${styles.CardText}`}>
                          {patient ? (
                            patient.owner_name
                          ) : (
                            <Skeleton className={`${styles.Skeleton}`}>
                              <div
                                className={`${styles.SkeletonBody} ${styles.thin}`}
                              ></div>
                            </Skeleton>
                          )}
                        </h5>
                      </div>
                      <div className="flex flex-row gap-1 items-start justify-start">
                        <h4 className={`${styles.CardTitle}`}>Teléfono:</h4>
                        <h5 className={`${styles.CardText}`}>
                          {patient ? (
                            patient.owner_phone
                          ) : (
                            <Skeleton className={`${styles.Skeleton}`}>
                              <div
                                className={`${styles.SkeletonBody} ${styles.thin}`}
                              ></div>
                            </Skeleton>
                          )}
                        </h5>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              <Button
                color="success"
                variant="shadow"
                className={`${styles.ShareButton}`}
                startContent={
                  <Image
                    src="/assets/images/icon-share.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                }
              >
                Compartir Historia
              </Button>
            </div>
            <div className={`${styles.Body}`}>
              <div className={`${styles.FieldGroup}`}>
                <div className={`${styles.FieldGroupTitle}`}>
                  Observación Inicial{' '}
                  {changeField && (
                    <Button
                      color="primary"
                      variant="solid"
                      isDisabled={savingRecord ? true : false}
                      size="sm"
                      className={`${styles.SaveButton}`}
                    >
                      Save
                    </Button>
                  )}
                  {savingRecord && (
                    <>
                      <CircularProgress
                        color="primary"
                        aria-label="Saving..."
                        size="sm"
                        className={`${styles.CircularProgress}`}
                      />
                    </>
                  )}
                </div>
                {history ? (
                  <Textarea
                    isReadOnly={false}
                    placeholder={'Ingrese La Observación Inicial'}
                    onChange={(e) => {
                      onChangeField('first_observation', e.target.value);
                    }}
                    defaultValue={history ? history.first_observation : ''}
                  />
                ) : (
                  <Skeleton className={`${styles.Skeleton} ${styles.big}`}>
                    <div className={`${styles.SkeletonBody}`}></div>
                  </Skeleton>
                )}
              </div>
              <div className={`${styles.FieldGroup}`}>
                <div className={`${styles.FieldGroupTitle}`}>
                  Tratamiento{' '}
                  {changeField && (
                    <CircularProgress
                      color="success"
                      aria-label="Saving..."
                      size="sm"
                      className={`${styles.CircularProgress}`}
                    />
                  )}
                </div>
                {history ? (
                  <Textarea
                    isReadOnly={false}
                    placeholder={'Ingrese el Tratamiento'}
                    onChange={(e) => {
                      onChangeField('treatment', e.target.value);
                    }}
                    defaultValue={history ? history.treatment : ''}
                  />
                ) : (
                  <Skeleton className={`${styles.Skeleton} ${styles.big}`}>
                    <div className={`${styles.SkeletonBody}`}></div>
                  </Skeleton>
                )}
              </div>
              <div className={`${styles.Photos}`}>
                <div className={`${styles.ButtonPhotoCnt}`}>
                  <Button color="primary" variant="solid" size="sm">
                    Añadir Foto
                  </Button>
                  {changeField && (
                    <CircularProgress
                      color="success"
                      aria-label="Saving..."
                      size="sm"
                      className={`${styles.CircularProgress}`}
                    />
                  )}
                </div>
                <div className={`${styles.PhotosCnt}`}>
                  {history &&
                    Array.isArray(history.photos) &&
                    history.photos.map((photo, index) =>
                      index > 2 ? null : (
                        <Image
                          key={index}
                          src={photo.src}
                          width={100}
                          height={100}
                          alt=""
                          className={`${styles.Photo}`}
                        />
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

HistoryDetail.auth = { adminOnly: true };
export default HistoryDetail;
