import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


// const router = createBrowserRouter([
//   {
//     path: "/oi",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//   },
// ]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} />
    <App /> */}
    <App/>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/ola" element={<Root/>}></Route>
      </Routes>
    </BrowserRouter> */}
  </React.StrictMode>
);
