import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import { useState } from 'react';
import Actions from '@/components/dashboard/orders/new/Actions';
import Options from '@/components/dashboard/orders/new/Options';

function NewOrderScreen() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <>
      <Metaheader />
      <Layout theme={theme} toogleTheme={toggleTheme}>
        <div className={`container`}>
          <div className={`row`}>
            <div className={`col col-12`}>
              <Actions />
            </div>
          </div>
          <div className={`row`}>
            <div className={`col col-12 col-lg-4`}>
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
                  ],
                }}
              />
            </div>
            <div className={`col col-12 col-lg-8`}></div>
          </div>
        </div>
      </Layout>
    </>
  );
}

NewOrderScreen.auth = true;
export default NewOrderScreen;
