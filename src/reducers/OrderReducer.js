export default function orderReducer(state, action) {
  switch (action.type) {
    case 'SET_ORDER':
      localStorage.setItem(
        'Equioral_draft_order',
        JSON.stringify(action.order)
      );
      return action.order;
    case 'CHANGE_OPTION':
      const newState = JSON.parse(JSON.stringify(state)); // Deep copy

      //CHANGE ADDONS
      if (action.action === 'add') {
        const index = newState.addons.findIndex(
          (addon) => addon.id === action.option.id
        );
        if (index === -1) {
          newState.addons.push(action.option);
        }
      } else {
        const index = newState.addons.findIndex(
          (addon) => addon.id === action.option.id
        );
        if (index !== -1) {
          newState.addons.splice(index, 1);
        }
      }

      //CHANGE CATEGORIES ADDONS
      newState.categoriesAddons.map((category) => {
        if (category.name === action.option.category) {
          category.options.map((optionItem) => {
            if (optionItem.id === action.option.id) {
              optionItem.selected = action.action === 'add';
            }
          });
        }
      });

      localStorage.setItem('Equioral_draft_order', JSON.stringify(newState));
      return newState;
    default:
      throw new Error();
  }
}
