import React from "react";

const NotFound = () => {
  return (
    <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center'
    }}>
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-page-not-available-9561127-7706458.png"
        alt="404 Not Found"
        style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
      />
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
