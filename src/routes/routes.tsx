import SignIn from "@/pages/auth/sign-in"
import SignUp from "@/pages/auth/sign-up"
import Chat from "@/pages/chat"
import SingleChat from "@/pages/chat/chat-id"

export const AUTH_ROUTES = {
    SIGN_IN: '/',
    SING_UP: '/sign-up'
}

export const PROTECTED_ROUTES = {
    CHAT: '/chat',
    SINGLE_CHAT: '/chat/:chat-id'
}

export const authRoutesPaths = [
    {
        path: AUTH_ROUTES.SIGN_IN,
        element: <SignIn/>
    },
    {
        path: AUTH_ROUTES.SING_UP,
        element: <SignUp/>
    }

    ]


export const protectedRoutesPaths = [
    {
        path: PROTECTED_ROUTES.CHAT,
        element: <Chat/>
    },
    {
        path: AUTH_ROUTES.SING_UP,
        element: <SingleChat/>
    }

    ]

    export const isAuthRoutes = (pathname: string) => {
         return Object.values(AUTH_ROUTES).includes(pathname)
    }

