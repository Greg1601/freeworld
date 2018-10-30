/**
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { NavLink } from 'react-router-dom';
/**
 * Local import
 */


/**
 * Code
 */
const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    padding: '0 0.5em',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  bar: {
    backgroundColor: 'black',
    position: 'fixed',
    top: 0,
  },
};

class Header extends React.Component {
   state = {
     auth: true,
     anchorEl: null,
   };

   handleChange = (event, checked) => {
     this.setState({ auth: checked });
   };

   handleMenu = (event) => {
     this.setState({ anchorEl: event.currentTarget });
   };

   handleClose = () => {
     this.setState({ anchorEl: null });
   };

   render() {
     const { classes } = this.props;
     const { auth, anchorEl } = this.state;
     const headerColor = this.props.location.pathname === '/' ? { background: 'transparent' } : { background: 'black' };
     const open = Boolean(anchorEl);
     return (
       <div>
         <header>
           <div className="header" style={headerColor}>
             <div className="header-connect">
               <NavLink
                 exact
                 to="/"
               >
                 <Typography
                   variant="title"
                   color="inherit"
                   className={classes.flex}
                 >
                     FreeWorld
                 </Typography>
               </NavLink>
             </div>
             <div className="header-connect">
               {(!this.props.username) ? (
                 <div className="header-connect-connect flex">
                   <NavLink
                     exact
                     to="/Signup"
                   >
                     <h3>S'incrire</h3>
                   </NavLink>
                   <NavLink
                     exact
                     to="/Login"
                   >
                     <h3>Se Connecter</h3>
                   </NavLink>
                 </div>
               )
               : (
                 <div>
                   <div id="logout">
                     <button onClick={this.props.logout}>Logout</button>
                   </div>
                   <IconButton
                     aria-owns={open ? 'menu-appbar' : null}
                     aria-haspopup="true"
                     onClick={this.handleMenu}
                     color="inherit"
                   >
                     <AccountCircle id="profil-button" />
                   </IconButton>
                   <Menu
                     id="menu-appbar"
                     anchorEl={anchorEl}
                     anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                     open={open}
                     onClose={this.handleClose}
                     onClick={this.props.getUserInfo(this.props.token,this.props.userId)}
                   >
                     <MenuItem onClick={this.handleClose}>
                       <NavLink
                         exact
                         to="/Profil"
                       >
                         Profil
                       </NavLink>
                     </MenuItem>
                   </Menu>
                 </div>
                  )}
             </div>
           </div>
         </header>
       </div>
     );
   }
}

Header.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);

// const Header = () => (
//   <header id="header">
//     <div id="header-title">
//       <img src="" alt="" />
//       <NavLink
//         exact
//         to="/"
//       >
//         <h1>FreeWorld</h1>
//       </NavLink>
//     </div>
//     <div id="header-connect">
//       <NavLink
//         exact
//         to="/Signup"
//       >
//         <h3>S'incrire</h3>
//       </NavLink>
//
//       <NavLink
//         exact
//         to="/Login"
//       >
//         <h3>Se Connecter</h3>
//       </NavLink>
//     </div>
//   </header>
// );
//
// /**
//  * Export
//  */
// export default Header;
