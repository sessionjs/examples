import React, { Suspense } from 'react'

// Session.js/client loads bun-network under the hood and a lot of other things
// so it's recommended to always await for `ready` promise before calling methods

// That's why we implement React's native way of awaiting for things to be loaded
// Until the promise is resolved, the component will be in suspended state, thanks to React.lazy

// You also need React's Suspense which will not render tree under it unless this 
// promise is resolved. You can also have fallback component that will be rendered like spinner

const Loader = React.lazy(async () => {
  await import('@session.js/client').then(m => m.ready)

  return {
    default: ({ children }: React.PropsWithChildren) => children
  }
})

export function LoaderWrapper({ children }: React.PropsWithChildren) {
  return (
    <Suspense 
      // optionally add fallback but it will likely flash for less than 0.1ms
      // fallback={<span>Loading Session web client...</span>}
    >
      <Loader>
        {children}
      </Loader>
    </Suspense>
  )
}