export default function productReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_OPTION':
      const newState = JSON.parse(JSON.stringify(state)); // Deep copy
      newState.addons.map((addonItem) => {
        if (addonItem.id === action.addon.id) {
          addonItem.options.map((optionItem) => {
            if (optionItem.id === action.option.id) {
              optionItem.selected = action.action === 'add' ? true : false;
            }
          });
        }
      });
      localStorage.setItem(
        'ArcticBunker_draft_order',
        JSON.stringify(newState)
      );
      return newState;
    default:
      throw new Error();
  }
}
