/**
 * NPM import
 */
import React from 'react';
import Pointer from 'react-icons/lib/fa/map-marker';
import PaperPlane from 'react-icons/lib/fa/paper-plane';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

/**
 * Local import
 */

import Accueil from 'src/containers/Accueil';
import ImagesBlock from 'src/containers/ImagesBlock';
import NavRapide from 'src/components/Home/NavRapide';
import Carte from 'src/containers/Carte';
import Caroussel from 'src/components/Home/Caroussel';


/**
 * Code
 */

 const styles = theme => ({
   close: {
     width: theme.spacing.unit * 4,
     height: theme.spacing.unit * 4,
   },
   snackbar: {
     marginTop: '5em',
   }
 });

 class Home extends React.Component {
   state = {
    open: false,
  };
   componentDidMount() {
     window.scrollTo(0, 0);
     this.checkLog();
   }

   checkLog = () => {
     if (this.props.logged) {
       this.setState({ open: true })
     }
   }
   handleClose = (event, reason) => {
   if (reason === 'clickaway') {
     return;
   }

   this.setState({ open: false });
 };

   render() {
     const { classes, username } = this.props;
     return(
       <div id="app">
         <Snackbar
           anchorOrigin={{
             vertical: 'top',
             horizontal: 'right',
           }}
           className={classes.snackbar}
           open={this.state.open}
           autoHideDuration={4000}
           onClose={this.handleClose}
           ContentProps={{
             'aria-describedby': 'message-id',
           }}
           message={<span id="message-id">Bonjour, {username}</span>}
           action={[
             <IconButton
               key="close"
               aria-label="Close"
               color="inherit"
               className={classes.close}
               onClick={this.handleClose}
               >
                 <CloseIcon />
               </IconButton>,
             ]}
           />
           <Accueil />
           <main>
             <ImagesBlock />
             <NavRapide />
             <div className="app-location">
               <Pointer className="pointer" />
               <span>A proximité de votre position</span>
             </div>
             <Carte />
             <div className="app-location">
               <PaperPlane className="pointer" />
               <span>Prochains événements</span>
             </div>
             <Caroussel />
           </main>
         </div>
     )
   }
 }
/**
 * Export
 */
export default withStyles(styles)(Home)
