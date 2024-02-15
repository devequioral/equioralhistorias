import React from 'react';

function EmailComponent() {
  return (
    <>
      <div
        style={{
          width: '100%',
        }}
      >
        <div
          style={{
            width: '80%',
            maxWidth: '600px',
            border: '1px solid #fafafa',
            backgroundColor: '#ccc',
            margin: '50px auto',
            padding: '50px',
            borderRadius: '5px',
            boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <h1 style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Cambios en su cotización
          </h1>
          <p style={{ marginTop: '30px' }}>
            Su cotización ha cambiado de estado. Por favor, revise las
            notificaciones del sistema.
          </p>
          <p style={{ marginTop: '30px' }}>
            Recuerde que el sistema no le enviará enlaces al correo, por lo que
            si recibe algún correo con enlaces, no los abra.
          </p>
        </div>
      </div>
    </>
  );
}

EmailComponent.auth = { adminOnly: true };
export default EmailComponent;
