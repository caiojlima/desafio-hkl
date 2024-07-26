import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import UserForm from "../views/UserForm";
import UserList from "../views/UserList";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
          <Route path="/" element={<UserForm />} />
          <Route path="/list" element={<UserList />} />
        </Route>
    )
);

export function RoutingProvider() {
    return <RouterProvider router={router} />;
}