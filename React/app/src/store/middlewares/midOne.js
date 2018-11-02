import axios from 'axios';
import { allPoints, allCategories, currentCategoryPoint } from 'src/store/reducer';

const WebSocket = store => next => (action) => {
  const googleKey = 'AIzaSyBfAdB5uii_xxgMB56wY6q3hicOgmx71Rk';
  const wheelKey = 'y8_6o6axJFWXEe5ZRC4n';
  switch (action.type) {
    case 'CURRENT_CITY':
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${action.coords[0]},${action.coords[1]}&key=${googleKey}`)
        .then((response) => {
          store.dispatch({
            type: 'CITY',
            city: response.data.results[0].address_components[2].long_name,
          });
        })
        .catch(error => console.log(error));
      break;
    case 'GOOGLE_GEOCODE':
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${action.address},&key=${googleKey}`)
        .then(response =>
          axios.post('http://127.0.0.1:8000/place/new', {
            placename: action.placename,
            placecity: action.placecity,
            placeaddress: action.placeaddress,
            placedescription: action.placedescription,
            placetype: action.placetype,
            entree: action.entree,
            rampe: action.rampe,
            ascenseur: action.ascenseur,
            wc: action.wc,
            place: action.place,
            userId: action.userId,
            lat: response.data.results[0].geometry.location.lat,
            lng: response.data.results[0].geometry.location.lng,
          })
            .then(response => store.dispatch({
              type: 'RESP_CREATE',
              data: response.data,
            }))
            .catch(error => console.log(error)));
      break;
    // case 'LOGIN_REQUEST':
    //   axios.post('http://127.0.0.1:8000/api/login_check', {
    //     email: action.email,
    //     password: action.password,
    //   })
    //     .then(response =>
    //       store.dispatch({
    //         type: 'T',
    //         token: response.data.token,
    //       },
    //       axios.post('http://127.0.0.1:8000/getLogs', {
    //         token: response.data.token,
    //       })
    //         .then(response => store.dispatch({
    //           type: 'TOKEN',
    //           userId: response.data.id,
    //           username: action.username,
    //           email: response.data.email,
    //         }))
    //         .catch(() => store.dispatch({
    //           type: 'FAIL_LOGIN',
    //         }))
    //       ));
    //   break;
    case 'LOGIN_REQUEST':
      axios.post('http://127.0.0.1:8000/api/login_check', {
        email: action.email,
        password: action.password,
      })
        .then(response =>
          store.dispatch({
            type: 'TOKEN',
            token: response.data.token,
          },
          axios.post('http://127.0.0.1:8000/user/getLogs', {
            token: response.data.token,
            email: action.email,
          })
            .then(response => store.dispatch({
              type: 'LOGS',
              userId: response.data.userId,
              username: response.data.username,
              email: response.data.email,
            }))
            .catch(() => store.dispatch({
              type: 'FAIL_LOGIN',
            }))
          ));
      break;
    case 'SIGNUP_REQUEST':
      axios.post('http://127.0.0.1:8000/register', {
        username: action.username,
        password: action.password,
        email: action.email,
        description: action.description,
        city: action.city,
      })
        .then(response => store.dispatch({
          type: 'SIGNUP_RESPONSE',
          response,
        }))
        .catch(error => console.log(error));
      break;
    case 'SEND_COMMENT':
      axios.post('http://127.0.0.1:8000/post/new', {
        comment: action.comment,
        titlecomment: action.titlecomment,
        userId: action.userId,
        placeId: action.placeId,
        vote: action.vote,
      })
        .then(response => console.log(action.userId))
        .catch(error => console.log(error));
      break;
    case 'GET_COMMENT':
      axios.post('http://127.0.0.1:8000/post/list', {
        placeId: action.id,
      })
        .then(response => store.dispatch({
          type: 'COMMENT',
          comments: response.data,
        }))
        .catch(error => console.log(error));
      break;
    case 'GET_POINTS':
      axios.get(`http://wheelmap.org/api/nodes?api_key=${wheelKey}&bbox=${action.coords[1] - 0.09},${action.coords[0] - 0.09},${action.coords[1] + 0.09},${action.coords[0] + 0.09}&per_page=500&wheelchair=yes`)
        .then(response => store.dispatch(allPoints(response.data.nodes)))
        .catch(error => console.log(error));
      break;

    case 'GET_POINT_BDD':
      axios.post('http://127.0.0.1:8000/place/list')
        .then(response => store.dispatch({
          type: 'POINT_BDD',
          nodesBdd: response.data,
        }))
        .catch(error => console.log(error));
      break;

    case 'GET_CATEGORY':
      axios.get(`http://wheelmap.org/api/categories?api_key=${wheelKey}&locale=en&page=1&per_page=100`)
        .then(response => store.dispatch(allCategories(response.data.categories)))
        .catch(error => console.log(error));
      break;

    case 'GET_CATEGORY_POINT':
      axios.get(`http://wheelmap.org/api/categories/${action.categoryId}/nodes?api_key=${wheelKey}&bbox=${action.coords[1] - 0.09},${action.coords[0] - 0.09},${action.coords[1] + 0.09},${action.coords[0] + 0.09}&per_page=500&wheelchair=yes`)
        .then(response => store.dispatch(currentCategoryPoint(response.data.nodes)))
        .catch(error => console.log(error));
      break;

    case 'GET_ADDRESS':
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${action.lat},${action.lon}&key=${googleKey}`)
        .then(response => store.dispatch({
          type: 'ADDRESS',
          id: action.id,
          address: response.data.results[0].formatted_address,
        }))
        .catch(error => console.log(error));
      break;

    case 'SEND_SEARCH':
      axios.post(`http://127.0.0.1:8000/city/search/${action.value}`)
        .then(response => store.dispatch({
          type: 'SEARCH_RESULT',
          lat: response.data.latitudeDeg,
          lon: response.data.longitudeDeg,
          name: response.data.realName,
        }))
        .catch(error => console.log(error));
      break;

    case 'GET_USER_INFO':
      axios.post('http://127.0.0.1:8000/user/show', {
        userId: action.userId,
        token: action.token,
      })
        .then(response => store.dispatch({
          type: 'USER_INFO',
          userInfo: response.data,
        }))
        .catch(error => console.log(error));
      break;

    case 'GET_INFO':
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${action.point.lat},${action.point.lon}&key=${googleKey}`)
        .then(response => store.dispatch({
          type: 'GET_POINT_INFO',
          id: action.point.id,
          address: response.data.results[0].formatted_address,
          name: action.point.name,
          phone: action.point.phone,
          wheelchair: action.point.weelchair,
          website: action.point.website,
          catId: action.point.category.id,
          category: action.point.category.localized_name,
          lat: action.point.lat,
          lon: action.point.lon,
        }))
        .catch(error => console.log(error));
      break;
    case 'SEND_FOOTER':
      axios.post('http://127.0.0.1:8000/question/new', {
        title: action.footer.title,
        lastname: action.footer.lastName,
        firstname: action.footer.firstName,
        email: action.footer.email,
        phone: action.footer.phone,
        message: action.footer.message,
      })
        .then(() => store.dispatch({
          type: 'CLEAR_FOOTER',
        }))
        .catch(error => console.log(error));
      break;
    case 'GET_IMAGES':
      axios.get(`http://wheelmap.org/api/nodes/${action.id}/photos?api_key=${wheelKey}`)
        .then(response => store.dispatch({
          type: 'STORE_IMAGES',
          photos: response.data.photos,
        }))
        .catch(error => console.log(error));
      break;
    case 'GET_INFO_BDD':
      axios.post('http://127.0.0.1:8000/place/show', {
        id: action.id,
      })
        .then(response => store.dispatch({
          type: 'STORE_INFO_BDD',
          currentPointBdd: response.data,
          currentPointBddId: response.data.Id,
        }))
        .catch(error => console.log(error));
      break;
    case 'SEND_IMAGE':
      axios.post('http://127.0.0.1:8000/user/upload', {
        image: action.imageUrl,
        id: action.id,
      })
        .then(() => store.dispatch({
          type: 'STORE_AVATAR',
          avatar: action.imageUrl,
        }))
        .catch(error => console.log(error));
      break;
    case 'SEND_IMAGE_LIEU':
      axios.post('http://127.0.0.1:8000/place/upload', {
        image: action.image,
        id: action.id,
      })
        .catch(error => console.log(error));
      break;
    case 'SEND_API':
      axios.post(`http://wheelmap.org/api/nodes/${action.id}/photos?api_key=${wheelKey}
`, { photo: action.image })
        .catch(error => console.log(error));
      break;
    default:
      next(action);
  }
};

/**
 * actionCreators
 */

export default WebSocket;
