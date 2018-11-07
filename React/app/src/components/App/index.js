/**
 * NPM import
 */
import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Local import
 */
import Header from 'src/containers/Header';
import Home from 'src/containers/Home';
import Login from 'src/containers/Login';
import Footer from 'src/containers/Footer';
import Signup from 'src/containers/Signup';
import Recherche from 'src/containers/Recherche';
import Profil from 'src/containers/Profil';
import Lieu from 'src/containers/Lieu';
import SearchMap from 'src/containers/SearchMap';
import MentionsLégales from 'src/components/Footer/MentionsLégales';

/*
*Data Routes
*/

const routes = {
  '/': {
    title: 'Home',
    subtitle: '',
    component: Home,
  },
  '/Login': {
    title: 'Login',
    subtitle: '',
    component: Login,
  },
  '/Signup': {
    title: 'Signup',
    subtitle: '',
    component: Signup,
  },
  '/Recherche': {
    title: 'Recherche',
    subtitle: '',
    component: Recherche,
  },
  '/Profil': {
    title: 'Profil',
    subtitle: '',
    component: Profil,
  },
  '/Lieu/:id/:slug': {
    title: 'Lieu',
    subtitle: '',
    component: Lieu,
  },
  '/SearchMap': {
    title: 'SearchMap',
    subtitle: '',
    component: SearchMap,
  },
  '/MentionsLégales': {
    title: 'MentionsLégales',
    subtitle: '',
    component: MentionsLégales,
  },
};

const routesKeys = Object.keys(routes);

/**
 * Code
 */
class App extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }
  /**
  *Lifecycles
  */
  componentDidMount() {
    this.listenRoute();
  }

  /*
  *Title
  */
  listenRoute = () => {
  // On affiche le bon title une première fois
    this.changeTitle(window.location);

    // On écoute le changement de route,
    // pour rechanger le title à chaque fois
    this.props.history.listen(this.changeTitle);
  }

  changeTitle = ({ pathname }) => {
  // On récupère notre objet de data
    const route = routes[pathname];

    // On modifie le title de la page
    if (route) {
      document.title = route.title;
    }
    document.title = 'Lieu';
  }

  goToIndex = (index) => {
  // Est-ce que la route existe
    if (index in routesKeys) {
    // On va chercher le path
      const path = routesKeys[index];
      // On change de page
      this.props.history.push(path);
    }
  }
  /*
  * Actions
  */

  /*
  *Rendu
  */
  render() {
    return (
      <div id="app">
        <Header routes={routes} location={this.props.location} />
        <div className="container">
          <Switch>
            {Object.keys(routes).map(path => (
              <Route
                exact
                key={path}
                path={path}
                component={routes[path].component}
                routes={routes}
              />
              ))}
            <Route render={() => <div>404</div>} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
