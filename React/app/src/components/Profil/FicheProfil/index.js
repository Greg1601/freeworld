import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const styles = theme => ({
  card: {
    maxWidth: '80%',
    margin: '3em auto',
    textAlign: 'left',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    width: 100,
    height: 100,
  },
});

const CLOUDINARY_UPLOAD_PRESET = 'sogtcjbt';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dunitrdji/upload';

class FicheProfil extends React.Component {
  static propTypes = {
    userId: PropTypes.number,
    currentUser: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string,
    avatar: PropTypes.string,
  }
  static defaultProps = {
    userId: false,
    currentUser: false,
    email: '',
    description: '',
    city: '',
    avatar: false,
  }

  state = {
    uploadedFileCloudinaryUrl: '',
  }
  // componentDidMount() {
  //   console.log(this.props.userInfo);
  // }
  onImageDrop = (files) => {
    this.setState({
      uploadedFile: files[0],
    });

    this.handleImageUpload(files[0]);
  }
  handleImageUpload = (file) => {
    const upload = request.post(CLOUDINARY_UPLOAD_URL).field('upload_preset', CLOUDINARY_UPLOAD_PRESET).field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url,
        });
        this.props.sendImage(response.body.secure_url, this.props.userId);
      }
    });
  }

  render() {
    const {
      classes,
      changeState,
    } = this.props;

    const {
      uploadedFileCloudinaryUrl,
      uploadedFile,
    } = this.state;
    if (this.props.userInfo) {
      return (
        <div>
          <Card className={classes.card}>
            {(!this.props.userInfo.Image) ?
              <div>
                <Dropzone
                  multiple={false}
                  accept="image/*"
                  onDrop={this.onImageDrop}
                >
                  <p>Glissez une image ou clickez pour selectionner une image dans vos dossiers</p>
                </Dropzone>
                {uploadedFileCloudinaryUrl === '' ? null :
                <div>
                  <p>{uploadedFile.name}</p>
                  <img src={uploadedFileCloudinaryUrl} alt="uploadedFile" />
                </div>}
              </div>
                : ''
              }
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar} src={this.props.userInfo.Image || 'images/grey/jpeg'} />
              }
              title={this.props.userInfo.Name}
              subheader={this.props.userInfo.Email}
            />
            <CardContent>
              <Typography gutterBottom variant="headline" component="h4">
                Présentation
              </Typography>
              <Typography component="p">
                {this.props.userInfo.Description}
              </Typography>
              <Typography gutterBottom variant="headline" component="h4">
                Ville
              </Typography>
              <Typography component="p">
                {this.props.userInfo.City}
              </Typography>
              <Typography gutterBottom variant="headline" component="h4">
                Centres d'intérêt
              </Typography>
            </CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites" onClick={changeState('editProfil')}>
                  <i className="material-icons">
                    build
                  </i>
                </IconButton>
                <IconButton aria-label="Share" onClick={changeState('addPlace')}>
                  <i className="material-icons">
                    add
                  </i>
                </IconButton>
              </CardActions>
            </Card>
          </div>
        );
    }
    return <div>je charge</div>;
  }
}


FicheProfil.propTypes = {
  changeState: PropTypes.func.isRequired,
  sendImage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(FicheProfil);
