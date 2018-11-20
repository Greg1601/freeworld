/*
 * Npm import
 */
import { connect } from 'react-redux';


/*
 * Local import
 */
import FormLieu from 'src/components/Profil/FormLieu';
import { changeInputValue } from 'src/store/reducer';

/*
 * Code
 */
// State
const mapStateToProps = state => ({
  placename: state.placename,
  placecity: state.placecity,
  placeaddress: state.placeaddress,
  postalcode: Number(state.postalcode),
  placedescription: state.placedescription,
  categories: state.categories,
  userId: state.userId,
  data: state.data,
});

// Actions
const mapDispatchToProps = (dispatch, ownProps) => ({
  nominatimGeo: (userId, address, placename, placecity, postalcode, placeaddress, placedescription, placetype, entree, rampe, ascenseur, wc, place) => {
    dispatch({
      type: 'NOMINATIM_GEOCODE',
      userId,
      address,
      placename,
      placecity,
      postalcode,
      placeaddress,
      placedescription,
      placetype,
      entree,
      rampe,
      ascenseur,
      wc,
      place,
    });
  },
  onChangeInput: (value) => {
    dispatch(changeInputValue({ name: ownProps.name, value }));
  },
});


/*
 * Export default
 */
export default connect(mapStateToProps, mapDispatchToProps)(FormLieu);
