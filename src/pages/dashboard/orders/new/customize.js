import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import { useState } from 'react';
import Actions from '@/components/dashboard/orders/new/Actions';
import Options from '@/components/dashboard/orders/new/Options';
import Preview from '@/components/dashboard/orders/new/Preview';

import styles from '@/styles/dashboard/orders/NewOrderScreen.module.css';

function CustomizeOrderScreen() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <>
      <Metaheader title="Personalizar Orden | Arctic Bunker" />
      <Layout theme={theme} toogleTheme={toggleTheme} sidebarCollapsed={true}>
        <div className={`container ${styles.container}`}>
          <div className={`row ${styles.row01}`}>
            <div className={`col col-12`}>
              <Actions />
            </div>
          </div>
          <div className={`row ${styles.row02}`}>
            <div
              className={`col  col-12 col-xs-12 col-sm-6 col-md-4 col-lg-4 ${styles.colOptions}`}
            >
              <Options
                theme={theme}
                data={{
                  title: 'ARCTIC BUNKER',
                  subtitle: 'Personalice su producto',
                  categories: [
                    {
                      text: 'Seguridad',
                      icon: {
                        src: '/assets/images/icon-security.svg',
                        width: 20,
                        height: 20,
                      },
                      options: [
                        {
                          text: 'Autenticador Biométrico',
                          help: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quae.',
                        },
                        {
                          text: 'Lector de Tarjeta Magnética',
                          help: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quae.',
                        },
                        {
                          text: 'CCTV 24 horas',
                          help: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quae.',
                        },
                      ],
                    },
                    {
                      text: 'Energía',
                      icon: {
                        src: '/assets/images/icon-energy.svg',
                        width: 20,
                        height: 20,
                      },
                      options: [
                        {
                          text: 'Actualización de energía',
                          help: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quae.',
                        },
                        {
                          text: 'Protección electromagnética',
                          help: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quae.',
                        },
                        {
                          text: 'UPS Adicional 8 horas',
                          help: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quae.',
                        },
                      ],
                    },
                    {
                      text: 'Protección Desastres',
                      icon: {
                        src: '/assets/images/icon-fire.svg',
                        width: 20,
                        height: 20,
                      },
                      options: [
                        {
                          text: 'Alarma y extinción de incendios',
                          help: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quae.',
                        },
                        {
                          text: 'Sellos ignífugos para pase de cables',
                          help: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quae.',
                        },
                        {
                          text: 'Sistema de anti vibración',
                          help: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quae.',
                        },
                      ],
                    },
                    {
                      text: 'Refrigeración',
                      icon: {
                        src: '/assets/images/icon-cold.svg',
                        width: 20,
                        height: 20,
                      },
                      options: [
                        {
                          text: 'Sistema de Enfriamiento Adicional',
                          help: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quae.',
                        },
                        {
                          text: 'Sistema Automático de Refrigeración',
                          help: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quae.',
                        },
                        {
                          text: 'Sellos Anti Calentamiento',
                          help: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quae.',
                        },
                      ],
                    },
                  ],
                }}
              />
            </div>
            <div
              className={`col col-12 col-sm-6 col-md-8 col-lg-8 ${styles.colPreview}`}
            >
              <Preview
                theme={theme}
                data={{
                  productImage: {
                    src: '/assets/images/temp/product-01-medium-t.png',
                    width: 158,
                    height: 319,
                  },
                  previewItems: [
                    {
                      pieChart: {
                        color: '#82BB30',
                        value: 60,
                      },
                      title: 'Seguridad',
                      description:
                        'Su sistema esta seguro, pero puede seguir agregando complementos de seguridad para hacerlo más seguro.',
                    },
                    {
                      pieChart: {
                        color: '#303EBB',
                        value: 60,
                      },
                      title: 'Energía',
                      description:
                        'Su sistema tiene suficiente energía para operar, pero puede seguir agregando complementos de energía para hacerlo más eficiente.',
                    },
                    {
                      pieChart: {
                        color: '#EEA435',
                        value: 60,
                      },
                      title: 'Protección',
                      description:
                        'Su sistema tiene suficiente protección contra desastres, pero puede seguir agregando complementos de energía para protegerlo más.',
                    },
                    {
                      pieChart: {
                        color: '#35B6EE',
                        value: 60,
                      },
                      title: 'Refrigeración',
                      description:
                        'Su sistema tiene suficiente refrigeración, pero puede seguir agregando complementos de refrigeración para protegerlo más.',
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

CustomizeOrderScreen.auth = true;
export default CustomizeOrderScreen;
