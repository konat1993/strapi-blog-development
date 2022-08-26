/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { NotFound } from '@strapi/helper-plugin'
import pluginId from '../../pluginId'
import HomePage from '../HomePage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReposProvider } from '../../context'
// import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReposProvider>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
          <Route component={NotFound} />
        </Switch>
      </ReposProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default App
