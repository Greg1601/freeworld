import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'sogtcjbt';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dunitrdji/upload';

class UploadApi extends React.Component {
  state = {
    uploadedFileCloudinaryUrl: '',
  }
  componentDidMount() {

  }
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
        this.props.sendApi(response.body.secure_url, this.props.pointId);
      }
    });
  }

  render() {
    const {
      uploadedFileCloudinaryUrl,
      uploadedFile,
    } = this.state;

    return (
      <div className="upload">
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
      </div>
    );
  }
}

export default UploadApi;
