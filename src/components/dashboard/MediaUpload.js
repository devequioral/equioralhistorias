import React, { useState } from 'react';

export default function MediaUpload(props) {
  const { onImageChange } = props;
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          onImageChange(e.target.files[0]);
        }}
      />
    </div>
  );
}
