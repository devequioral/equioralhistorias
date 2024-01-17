const categoriesAddonsModel = [
  {
    id: 'addon-01',
    name: 'Seguridad',
    description:
      'Su sistema esta seguro, pero puede seguir agregando complementos de seguridad para hacerlo más seguro.',
    icon: {
      src: '/assets/images/icon-security.svg',
      width: 20,
      height: 20,
    },
    defaultPercent: 60,
    color: '#82BB30',
    options: [],
  },
  {
    id: 'addon-02',
    name: 'Energía',
    description:
      'Su sistema tiene suficiente energía para operar, pero puede seguir agregando complementos de energía para hacerlo más eficiente.',
    icon: {
      src: '/assets/images/icon-energy.svg',
      width: 20,
      height: 20,
    },
    defaultPercent: 60,
    color: '#303EBB',
    options: [],
  },
  {
    id: 'addon-03',
    name: 'Protección Desastres',
    description:
      'Su sistema tiene suficiente protección contra desastres, pero puede seguir agregando complementos de energía para protegerlo más.',
    icon: {
      src: '/assets/images/icon-fire.svg',
      width: 20,
      height: 20,
    },
    defaultPercent: 60,
    color: '#EEA435',
    options: [],
  },
  {
    id: 'addon-04',
    name: 'Refrigeración',
    description:
      'Su sistema tiene suficiente protección contra desastres, pero puede seguir agregando complementos de energía para protegerlo más.',
    icon: {
      src: '/assets/images/icon-cold.svg',
      width: 20,
      height: 20,
    },
    defaultPercent: 60,
    color: '#35B6EE',
    options: [],
  },
];

export default categoriesAddonsModel;
