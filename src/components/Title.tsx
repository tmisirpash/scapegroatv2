import React from 'react';
import '../styles.css';

interface title {
  media: boolean;
}

function Title(props: title) {
  const {
    media,
  } = props;

  return (
    <div
      className="unselectable"
      style={{
        fontSize: '2rem',
        color: 'white',
        paddingLeft: media ? '15px' : '0',
      }}
    >
      ScapeGroat
    </div>
  );
}
export default Title;
