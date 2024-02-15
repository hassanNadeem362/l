
// import React from 'react';
// import { Navigate, Route,Routes } from 'react-router-dom';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   console.log("🚀 ~ ProtectedRoute ~ children:", children)
//   const userRole = localStorage.getItem('userRole');

//   if (allowedRoles.includes(userRole)) {
//     return
//     <>
//      <Routes>
//     {/* <Route>{children}</Route> */}
//     return <Route element={children}/>
//     </Routes>
//     </>

//   } else {
//     // Redirect to the login page if the user doesn't have the required role
//     return <Navigate to="/Login" />;
//   }
// };

// export default ProtectedRoute;
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  console.log("🚀 ~ ProtectedRoute ~ children:", children)
  const userRole = localStorage.getItem('userRole');

  if (allowedRoles.includes(userRole)) {
    return children
  } else {
    // Redirect to the login page if the user doesn't have the required role
    return <Navigate to="/Login" />;
  }
};

export default ProtectedRoute;
