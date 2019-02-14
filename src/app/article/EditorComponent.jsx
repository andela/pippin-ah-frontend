import React from 'react';
import TinyMCE from 'react-tinymce';

const Editor = () => {
  return (
    <TinyMCE
      placeholder="<p>This is the initial content of the editor</p>"
      config={{
        plugins: 'autolink link image lists print preview',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
        width: '100%',
        height: '30%',
      }}
    />
  );
};

export default Editor;
