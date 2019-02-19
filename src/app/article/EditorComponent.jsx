import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { uploadImage } from '../util/uploadToCloudinary';

const EditorComponent = ({ handleEditorChange }) => {
  return (
    <Editor
      init={{
        plugins: 'autolink link image lists print preview',
        toolbar:
          'undo redo | bold italic | alignleft aligncenter alignright| link image |',
        width: '100%',
        height: '40%',
        entity_encoding: 'raw',
        automatic_uploads: true,
        file_picker_types: 'file image media',
        file_picker_callback(cb) {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.onchange = function onInputChange() {
            const file = this.files[0];
            const reader = new FileReader();
            reader.onload = function onReaderLoad() {
              const id = `blobid${new Date().getTime()}`;
              const { blobCache } = tinymce.activeEditor.editorUpload;
              const base64 = reader.result.split(',')[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };
          input.click();
        },
        images_upload_handler(blobInfo, success, failure) {
          const formData = new FormData();
          formData.append('file', blobInfo.blob(), blobInfo.filename());
          uploadImage('article', 'data', formData)
            .then(imageLink => {
              success(imageLink);
            })
            .catch(e => {
              failure(`error uploading imgage: ${e}`);
            });
        },
      }}
      onEditorChange={content => {
        handleEditorChange(content);
      }}
    />
  );
};

export default EditorComponent;
