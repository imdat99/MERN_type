import { useClientRouter, navigate } from 'vite-plugin-ssr/client/router'

useClientRouter({
    render(pageContext) {
        const { redirectTo } = pageContext
        if (redirectTo) {
            navigate(redirectTo)
            return
        }

        // The usual stuff
        // ...
    }
})