/**
 * InitialState
 */
const initialState = {
  currentCity: '',
  zoom: 14,
  view: 'profil',
  searchBarValue: '',
};

/**
 * Reducer
 */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CITY':
      return {
        ...state,
        currentCity: action.city,
      };
    case 'CURRENT_LOCATION':
      return {
        ...state,
        coords: action.position,
      };
    case 'INPUT_CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'RESP_CREATE':
      return {
        ...state,
        data: action.data,
      };
    case 'CHANGE_VIEW':
      return {
        ...state,
        view: action.view,
      };
    case 'ALL_POINTS':
      return {
        ...state,
        nodes: action.nodes,
        allNodes: action.nodes,
      };
    case 'POINT_BDD':
      return {
        ...state,
        nodesBdd: action.nodesBdd,
        allNodesBdd: action.nodesBdd,
      };
    case 'CATEGORIES':
      return {
        ...state,
        categories: action.categories,
      };
    // case 'GET_RATE': {
    //   const votespour = action.machin;
    // const votescontre = action.machin
    //   const rate = (votespour + votescontre) / 2
    //   return {
    //     ...state,
    //     rate,
    //   };
    // }
    // case 'GET_COMMENTS':
    //   return {
    //     ...state,
    //     comments: action.comments,
    //   };
    // case 'GET_ACCESS':
    //   return {
    //     ...state,
    //     access: action.accessibilities,
    //   };
    case 'SEND_CATEGORY':
      return {
        ...state,
        currentCategoryId: action.categoryId,
      };
    case 'CURRENT_CATEGORY_POINT':
      return {
        ...state,
        currentCategoryPoint: action.categoryPoint,
      };
    case 'GET_VOTES': {
      const total = action.positive + action.negative;
      const exactVote = ((action.positive - action.negative) - total) * 100;
      const vote = Math.round(exactVote);
      return {
        ...state,
        vote,
      };
    }
    // case 'SET_VOTE':
    //   return {
    //     ...state,
    //     [action.name]: 0,
    //   };
    // case 'UP_VOTE':
    //   if (state[action.name] >= 100) {
    //     return {
    //       ...state,
    //       [action.name]: 100,
    //     };
    //   } return {
    //     ...state,
    //     [action.name]: state[action.name] + 1,
    //   };
    // case 'DOWN_VOTE':
    //   if (state[action.name] <= 0) {
    //     return {
    //       ...state,
    //       [action.name]: 0,
    //     };
    //   } return {
    //     ...state,
    //     [action.name]: state[action.name] - 1,
    //   };
    case 'TOKEN':
      return {
        ...state,
        // token: action.token,
        token: action.token,
      };
    case 'LOGS':
      return {
        ...state,
        // token: action.token,
        logged: true,
        userId: action.userId,
        currentUser: action.username,
        userEmail: action.email,
      };
    case 'FAIL_LOGIN':
      return {
        ...state,
        logged: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        userId: null,
        currentUser: null,
        username: null,
        password: null,
        userEmail: null,
        logged: false,
      };
    case 'ADDRESS':
      return {
        ...state,
        [action.id]: action.address,
      };
    case 'CHANGE_SEARCH_VALUE':
      return {
        ...state,
        searchBarValue: action.value,
      };
    case 'SIGNUP_RESPONSE':
      return {
        ...state,
        response: action.response,
      };
    case 'CLEAR_POINT':
      return {
        ...state,
        currentCategoryPoint: null,
      };
    case 'SEARCH_RESULT':
      return {
        ...state,
        resultLat: action.lat,
        resultLon: action.lon,
        resultName: action.name,
      };
    case 'CLEAR_RESULT':
      return {
        ...state,
        resultLat: null,
        resultLon: null,
        resultName: null,
      };
    case 'CLEAR_NODES':
      return {
        ...state,
        nodes: false,
      };
    case 'GET_POINT_INFO':
      return {
        ...state,
        currentPoint: {
          id: action.id,
          name: action.name,
          address: action.address,
          phone: action.phone,
          weelchair: action.weelchair,
          website: action.website,
          categoryId: action.catId,
          category: action.category,
          lat: action.lat,
          lon: action.lon,
        },
      };
    case 'STORE_INFO_BDD': {
      const total = action.positive + action.negative;
      const exactVote = ((action.positive - action.negative) / total) * 100;
      const vote = Math.round(exactVote);
      return {
        ...state,
        currentPointBdd: action.currentPointBdd,
        vote,
      };
    }
    case 'CLEAN_CURRENT_POINT':
      return {
        ...state,
        currentPoint: false,
      };
    case 'CLEAR_SEARCH_BAR':
      return {
        ...state,
        searchBarValue: '',
      };
    case 'STORE_IMAGES':
      return {
        ...state,
        photos: action.photos,
      };
    case 'STORE_AVATAR':
      return {
        ...state,
        avatar: action.avatar,
      };
    case 'USER_INFO':
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case 'CLEAR_FOOTER':
      return {
        ...state,
        footerTitle: '',
        footerLastname: '',
        footerFirstname: '',
        footerEmail: '',
        footerPhone: '',
        footerMessage: '',
      };
    case 'COMMENT':
      return {
        ...state,
        comments: action.comments,
      };
    case 'FILTER_POINTS': {
      const newPoints = state.allNodes.filter((node) => {
        if (action.value === 'all') {
          return node.category.id !== action.value;
        }
        return node.category.id === action.value;
      });

      const newPointsBdd = state.allNodesBdd.filter((node) => {
        if (action.value === 'all') {
          return node.Placetype !== action.value;
        }
        return node.Placetype === action.value;
      });

      return {
        ...state,
        nodes: newPoints,
        nodesBdd: newPointsBdd,
      };
    }
    default:
      return state;
  }
};

/**
 * actionCreators
 */

export const changeInputValue = ({ name, value }) => ({
  type: 'INPUT_CHANGE',
  value,
  name,
});

export const changeView = ({ view }) => ({
  type: 'CHANGE_VIEW',
  view,
});

export const allPoints = nodes => ({
  type: 'ALL_POINTS',
  nodes,
});

export const allCategories = categories => ({
  type: 'CATEGORIES',
  categories,
});

export const currentCategoryPoint = categoryPoint => ({
  type: 'CURRENT_CATEGORY_POINT',
  categoryPoint,
});

export const searchBarValue = value => ({
  type: 'CHANGE_SEARCH_VALUE',
  value,
});

export const filterPoints = value => ({
  type: 'FILTER_POINTS',
  value,
});
/**
 * Export
 */
export default reducer;
