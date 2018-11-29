/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import QuoteLeft from 'react-icons/lib/fa/quote-left';
import QuoteRight from 'react-icons/lib/fa/quote-right';
/**
 * Local import
 */


/**
 * Code
 */

const Commentaire = ({ com }) => (
  <div className="commentaire">
    <div className="commentaire-profil">
      <span>Satisfait ? {com.Vote ? 'Oui' : 'Non'}</span>
      <h6>{com.Author}</h6>
      <p className="date">{com.Released}</p>
      <div className="barre" />
    </div>
    <div className="commentaire-post">
      <h6>{com.Title}</h6>
      <QuoteLeft className="quote" />
      <p className="commentaire-post-comment">{com.Body}</p>
      <QuoteRight className="quote" />
    </div>
  </div>
);

/**
 * Export
 */
export default Commentaire;
