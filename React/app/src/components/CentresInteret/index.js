import React from 'react';
import CategoryName from 'src/utils/categoryName';

const CentresInteret = ({ currentCatId }) => (
  <div className="centresinteret">
    <div className="centresinteret-title">
      <h5>Centres d'intérêt</h5>
    </div>
    <div className="centresinteret-tags">
      <h6>{CategoryName(currentCatId)}</h6>
    </div>
  </div>
);


export default CentresInteret;
