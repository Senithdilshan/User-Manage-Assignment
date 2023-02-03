import Login from "./Pages/Login/Login"
import FillResetPassword from "./Pages/ResetPassword/FillResetPassword"
import ResetPassword from "./Pages/ResetPassword/ResetPassword"
import SignIn from "./Pages/SignIn/SignIn"
import UpdateUser from "./Pages/UpdateUser/UpdateUser"
import ViewUser from "./Pages/ViewUsers/ViewUser"
export const routes = [
    {
        path: '/',
        Component: <Login/>
    },
    {
        path: '/signIn',
        Component: <SignIn/>
    },
    {
        path: '/viewUsers',
        Component: <ViewUser/>
    },
    {
        path: '/resetPassword',
        Component: <ResetPassword/>
    },
    {
        path: '/updatePassword/:id',
        Component: <FillResetPassword/>
    },
    {
        path: '/updateUser/:id',
        Component: <UpdateUser/>
    }
]