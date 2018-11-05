/**
 * NPM import
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import Arrow from 'react-icons/lib/fa/arrow-left';

/**
 * Local import
 */

import CarousselImage from 'src/components/Lieu/CarousselImage';
import Minimap from 'src/components/Recherche/Minimap';
import CentresInteret from 'src/components/CentresInteret';
import Accessibilite from 'src/components/Lieu/Accessibilite';
import Commentaires from 'src/containers/Commentaires';
import SignalForm from 'src/components/Lieu/SignalForm';
import Rating from 'src/components/Lieu/Rating';
import CategoryName from 'src/utils/categoryName';
import UploadApi from 'src/containers/UploadApi';
import Upload from 'src/containers/Upload';
/**
 * Code
 */

class Lieu extends React.Component {
  state = {
    show: false,
  };

  componentDidMount() {
    // this.props.getComment(this.props.currentPointBdd.Id)
    window.scrollTo(0, 0);
  }
  componentWillUnmount() {
    this.props.cleanCurrentPoint();
  }
  showSignalForm = (evt) => {
    evt.preventDefault();
    this.setState({ show: !this.state.show });
  }
  render() {
    const {
      name,
      currentPoint,
      photos,
      currentPointBdd,
      placeId,
      vote,
      currentUser,
    } = this.props;
    const { show } = this.state;
    if (currentPoint) {
      return (
        <div className="lieu">
          <div>
            {(!this.props.photos && this.props.currentPoint) ? this.props.getImages(this.props.currentPoint.id) : ''}
              <div className="lieu-info">
                <div className="lieu-info-block">
                  <h3>{(currentPoint.name) || 'Aucun'} </h3>
                  <div className="lieu-info-infos">
                    <h5>Coordonnées</h5>
                    <p><span className="title">Adresse</span>: {currentPoint.address}</p>
                    <p><span className="title">Tel</span>: {currentPoint.phone || 'Aucun'}</p>
                    <p><span className="title">site</span>: {currentPoint.website || 'Aucun'}</p>
                    <p><span className="title">Accessibilite</span>: {currentPoint.weelchair}</p>
                  </div>
                </div>
                <div className="infoslieu-minimap">
                  <Minimap
                    lat={currentPoint.lat}
                    lon={currentPoint.lon}
                    categoryId={currentPoint.categoryId}
                  />
                </div>
              </div>
          </div>
          <div className="pagelieu">
            <div className="pagelieu-block">
              <div>
                <UploadApi pointId={currentPoint.id} />
              </div>
              {(photos && photos.length > 0) ?
                <CarousselImage photos={photos} /> : ''
                }
            </div>
          </div>
        </div>
      );
    }
    else if (currentPointBdd) {
      return (
        <div className="lieu">
          <div>
            <div className="lieu-info">
              <div className="lieu-info-block">
                <div className="lieu-info-block">
                  <h4>{(currentPointBdd.Name) || 'Aucun'} </h4>
                  <p>{currentPointBdd.Address}</p>
                </div>
                <div className="lieu-info-infos">
                  <h5>Coordonnées</h5>
                </div>
                <div className="lieu-info-rate">
                  <h5>Appréciation</h5>
                  <Rating vote={vote} />
                </div>
              </div>
              <div className="infoslieu-minimap">
                <Minimap
                  lat={currentPointBdd.Latitude}
                  lon={currentPointBdd.Longitude}
                  categoryId={currentPointBdd.Placetype}
                />
              </div>
            </div>
          </div>
          <div className="pagelieu">
            <div className="pagelieu-block">
              {(currentPointBdd.Image && currentPointBdd.Image.length > 0) ?
                <CarousselImage photos={currentPointBdd.Image} /> :
                <div>
                  <Upload pointId={currentPointBdd.Id} />
                </div>
                }
              <Commentaires currentUser={currentUser} placeId={currentPointBdd.Id} />
            </div>
            <div className="pagelieu-block pagelieu-fix">
              <CentresInteret currentCatId={currentPointBdd.Placetype} />
              <Accessibilite />
              <div className="pagelieu-block-signal">
                <h3>
                  Vous avez constaté une erreur dans les informations ?
                </h3>
                {(show) ?
                  <div className="pagelieu-block-signal-form" >
                    <Arrow
                      onClick={this.showSignalForm}
                      className="buttonplus-icon"
                    />
                    <SignalForm />
                  </div>
                    :
                  <div>
                    <Button
                      onClick={this.showSignalForm}
                      variant={this.props.contained}
                      className="pagelieu-button"
                    >
                          Signaler
                    </Button>
                  </div>
                  }
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>je charge</div>;
  }
}

/**
 * Export
 */
export default Lieu;
