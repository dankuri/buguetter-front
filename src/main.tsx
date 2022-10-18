import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './components/App'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

if (process.env.NODE_ENV === 'development') {
    document.title = 'dev buguetter'
}

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
)
