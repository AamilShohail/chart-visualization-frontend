import { DropzoneAreaBase } from "material-ui-dropzone";
import React, { Component } from "react";

export default class DropzoneArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
  }

  handleChange(files) {
    this.setState({
      files: files,
    });
  }

  render() {
    return (
      <DropzoneAreaBase
        onChange={this.handleChange.bind(this)}
        showPreviews={true}
        useChipsForPreview
        showPreviewsInDropzone={true}
        previewText="Selected file"
        onDelete={true}
        acceptedFiles={[
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ]}
      />
    );
  }
}
