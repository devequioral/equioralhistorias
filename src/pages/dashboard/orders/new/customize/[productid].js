import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import Actions from '@/components/dashboard/orders/new/Actions';
import Options from '@/components/dashboard/orders/new/Options';
import Preview from '@/components/dashboard/orders/new/Preview';
import { useContext, useEffect, useReducer, useState, useRef } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import styles from '@/styles/dashboard/orders/NewOrderScreen.module.css';
import productJSON from '@/temp/product.json';
import categoriesAddonsModel from '@/models/categoriesAddonsModel';

import productReducer from '@/reducers/ProductReducers';
import { useRouter } from 'next/router';
import { CircularProgress } from '@nextui-org/react';

async function getProduct(productid) {
  //SIMULATE SLOW CONNECTION
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/get?productid=${productid}`;
  const res = await fetch(url);
  return await res.json();
}

async function getAddons(productid) {
  //SIMULATE SLOW CONNECTION
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/addons/list?productid=${productid}`;
  const res = await fetch(url);
  return await res.json();
}

function CustomizeOrderScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const router = useRouter();

  const productid = router.query.productid;
  //const productCurrent = productJSON.find((product) => product.id == productid);
  const [productCurrent, setProductCurrent] = useState(null);

  const [addons, setAddons] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const initialProduct =
    JSON.parse(localStorage.getItem('ArcticBunker_draft_order')) ||
    productCurrent;

  const [product, dispatch] = useReducer(productReducer, initialProduct);

  const onChangeOption = (option, addon, action) => {
    dispatch({ type: 'CHANGE_OPTION', option, addon, action });

    categoriesAddonsModel.map((category) => {
      if (category.name === option.category) {
        category.options.map((optionItem) => {
          if (optionItem.id === option.id) {
            optionItem.selected = action === 'add';
          }
        });
      }
    });
  };

  useEffect(() => {
    if (productid) {
      const fetchProduct = async () => {
        setIsLoading(true);
        const productBD = await getProduct(productid);
        const { records } = productBD.record;
        if (!productBD || records.length === 0) {
          setProductCurrent(null);
          setIsLoading(false);
          return;
        }

        let curProduct = records[0];

        const addonsBD = await getAddons(productid);
        const { records: recordsAddons } = addonsBD.records;

        if (!addonsBD || recordsAddons.length === 0) {
          setAddons(null);
        } else {
          setAddons(recordsAddons);
        }

        recordsAddons.map((addonItem) => {
          curProduct.addons.map((curProductAddonItem) => {
            if (addonItem.category === curProductAddonItem.name) {
              curProductAddonItem.options.push({
                help: addonItem.help,
                id: addonItem.id,
                percent: addonItem.percent,
                selected: false,
                text: addonItem.text,
              });
            }
          });
        });
        setProductCurrent(curProduct);

        const initialProduct =
          JSON.parse(localStorage.getItem('ArcticBunker_draft_order')) ||
          curProduct;

        dispatch({ type: 'SET_PRODUCT', product: initialProduct });

        setIsLoading(false);
      };
      fetchProduct();
    }
  }, [productid]);

  useEffect(() => {
    if (!localStorage.getItem('ArcticBunker_draft_order') && initialProduct) {
      localStorage.setItem(
        'ArcticBunker_draft_order',
        JSON.stringify(initialProduct)
      );
    }
  }, []);
  const onActionsEvent = (event) => {
    if (event === 'next') {
      router.push('/dashboard/orders/new/last-step');
    }
  };

  const addonsUpdated = useRef(false);

  useEffect(() => {
    if (!addons || !categoriesAddonsModel) return;
    if (addonsUpdated.current) return;
    addonsUpdated.current = true;

    addons.map((addon) => {
      categoriesAddonsModel.map((category) => {
        if (category.name === addon.category) {
          category.options.push({ ...addon, selected: false });
        }
      });
    });
  }, [addons, categoriesAddonsModel]);

  return (
    <>
      <Metaheader title="Personalizar Orden | Arctic Bunker" />
      <Layout theme={theme} toogleTheme={toggleTheme} sidebarCollapsed={true}>
        <div className={`container ${styles.container}`}>
          <div className={`row ${styles.row01}`}>
            <div className={`col col-12`}>
              <BreadCrumbs
                theme={theme}
                data={{
                  links: [
                    { href: '/dashboard', title: 'Inicio' },
                    { href: '/dashboard/orders', title: 'Cotizaciones' },
                    {
                      href: '/dashboard/orders/new',
                      title: 'Nueva Cotización',
                    },
                    { href: false, title: 'Personalizar Producto' },
                  ],
                }}
              />
            </div>
          </div>
          {isLoading ? (
            <div className={`${styles.loading}`}>
              <CircularProgress size="sm" aria-label="Loading..." />
            </div>
          ) : initialProduct ? (
            <>
              <div className={`row ${styles.row01}`}>
                <div className={`col col-12`}>
                  <Actions onActionsEvent={onActionsEvent} />
                </div>
              </div>
              <div className={`row ${styles.row02}`}>
                <div
                  className={`col  col-12 col-xs-12 col-sm-6 col-md-4 col-lg-4 ${styles.colOptions}`}
                >
                  <Options
                    theme={theme}
                    onChangeOption={onChangeOption}
                    product={product}
                    addons={addons}
                    categoriesAddonsModel={categoriesAddonsModel}
                  />
                </div>
                <div
                  className={`col col-12 col-sm-6 col-md-8 col-lg-8 ${styles.colPreview}`}
                >
                  <Preview
                    theme={theme}
                    product={product}
                    addons={addons}
                    categoriesAddonsModel={categoriesAddonsModel}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className={`row ${styles.row03}`}>
              <div className={`col col-12`}>
                <p>Producto no encontrado</p>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

CustomizeOrderScreen.auth = true;
export default CustomizeOrderScreen;
