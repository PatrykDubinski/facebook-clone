export const initialState = {
  user: "null",
  menu: "main",
  chat: false,
  openMenu: false,
  roomId: "",
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_MENU: "SET_MENU",
  OPEN_CHAT: "OPEN_CHAT",
  CLOSE_CHAT: "CLOSE_CHAT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        menu: action.menu,
      };
    case actionTypes.OPEN_CHAT:
      return {
        ...state,
        chat: action.chat,
        roomId: action.roomId,
      };
    case actionTypes.CLOSE_CHAT:
      return {
        ...state,
        chat: action.chat,
        roomId: "",
      };
    default:
      return state;
  }
};

export default reducer;
