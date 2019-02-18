import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const EditorComponent = ({ handleEditorChange }) => {
  return (
    <Editor
      init={{
        plugins: 'autolink link image lists print preview',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
        width: '100%',
        height: '40%',
      }}
      onEditorChange={content => {
        handleEditorChange(content);
      }}
    />
  );
};

export default EditorComponent;
