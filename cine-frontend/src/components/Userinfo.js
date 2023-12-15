import React from 'react';

export default function Userinfo(props) {
  const { label, value, readonly } = props;
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        <label style={{ fontWeight: '700', color: '#000' }}>{label}</label>
        <input
          name='inputInfo'
          type='text'
          readOnly={readonly}
          value={value}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
      </div>
    </>
  );
}
