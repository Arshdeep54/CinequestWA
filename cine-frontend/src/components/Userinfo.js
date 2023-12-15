import React from 'react';

export default function Userinfo(props) {
  const { label, value, readonly, changeValue } = props;
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
        {readonly ? (
          <input
            name='inputInfo'
            type='text'
            readOnly
            value={value}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        ) : (
          <input
            name='inputInfo'
            type='text'
            value={value}
            onChange={(e) => {
              changeValue(e.target.value);
            }}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        )}
      </div>
    </>
  );
}
