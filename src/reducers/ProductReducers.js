export default function productReducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCT':
      return action.product;
    case 'CHANGE_OPTION':
      const newState = JSON.parse(JSON.stringify(state)); // Deep copy
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
      localStorage.setItem('Equioral_draft_order', JSON.stringify(newState));
      return newState;
    default:
      throw new Error();
  }
}
