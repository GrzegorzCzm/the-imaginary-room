/* [G.Cz]:  It will be good to have some initial state, and clear separation between actions (plain objects) and reducers. 
* E.g. for reducers https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#creating-the-root-reducer 
* E.g. for actions  https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#actions

So in general this file should be splited between 
content.reducer.js
content.actions.js
*/

const contentReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CONTENT": {
      return action.data;
    }
    default:
      return state;
  }
};

export const newContentAction = (content) => {
  return {
    type: "NEW_CONTENT",
    data: content,
  };
};

export const deleteContentAction = (nodeToDelete) => {
  return {
    type: "DELETE_CONTENT",
    data: nodeToDelete,
  };
};

export const updateContentAction = (newContent) => {
  return {
    type: "UPDATE_CONTENT",
    data: newContent,
  };
};

export const initializeContent = (nodes) => {
  return {
    type: "INIT_CONTENT",
    data: nodes,
  };
};

export const setContentAction = (newContent) => {
  return {
    type: "SET_CONTENT",
    data: newContent,
  };
};

export default contentReducer;
