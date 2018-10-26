/**
 * NPM import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Footer from 'src/components/Footer';

/**
 * Code
 */

const mapStateToProps = state => ({
  footerTitle: state.footerTitle,
  footerFirstname: state.footerFirstname,
  footerLastname: state.footerLastname,
  footerEmail: state.footerEmail,
  footerPhone: state.footerPhone,
  footerMessage: state.footerMessage,
});

const mapDispatchToProps = dispatch => ({
  sendFooter: (footer) => {
    dispatch({
      type: 'SEND_FOOTER',
      footer,
    });
  },
});

const FooterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);

/**
 * Export
 */
export default FooterContainer;
