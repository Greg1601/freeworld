import React from 'react';
import classNames from 'classnames';
import WheelChair from 'react-icons/lib/fa/wheelchair';
import Parking from 'react-icons/lib/md/local-parking';
import WCs from 'react-icons/lib/md/wc';
import Elevator from 'react-icons/lib/md/rv-hookup';
import Stairs from 'react-icons/lib/md/directions-walk';

class Accessibilite extends React.Component {
  // state = {
  //   checked: false,
  // }
  render() {
    // const currentClassNames = classNames('accessibilite-block-block', {
    //   'accessibilite-block-off': this.state.checked,
    // });
    return(
      <div className="accessibilite">
        <div>
          <h5>Accessibilité</h5>
        </div>
        <div className="accessibilite-block">
          <div className="accessibilite-block-block">
            <WheelChair className="accessibilite-icon" />
            <h6>Entrée</h6>
          </div>
          <div className="accessibilite-block-block">
            <Parking className="accessibilite-icon" />
            <h6>Parking</h6>
          </div>
          <div className="accessibilite-block-block">
            <WCs className="accessibilite-icon" />
            <h6>WC</h6>
          </div>
          <div className="accessibilite-block-block">
            <Elevator className="accessibilite-icon" />
            <h6>Ascenseur</h6>
          </div>
          <div className="accessibilite-block-block accessibilite-block-off">
            <Stairs className="accessibilite-icon" />
            <h6>Rampe</h6>
          </div>
        </div>
      </div>
    );
  }
}


export default Accessibilite;
