export default function productReducer(state, action) {
  switch (action.type) {
    case 'SET_PRODUCT':
      return action.product;
    case 'CHANGE_OPTION':
      const newState = JSON.parse(JSON.stringify(state)); // Deep copy
      if (action.action === 'add') {
        if (!newState.addons.includes(action.addon.id)) {
          newState.addons.push(action.addon.id);
        }
      } else {
        if (newState.addons.includes(action.addon.id)) {
          newState.addons.splice(newState.addons.indexOf(action.addon.id), 1);
        }
      }
      localStorage.setItem(
        'ArcticBunker_draft_order',
        JSON.stringify(newState)
      );
      return newState;
    default:
      throw new Error();
  }
}
