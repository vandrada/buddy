import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Provider } from 'mobx-react'

import { ProductList } from './components/Products/List'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

import stores from './stores'

class App extends React.Component<any, any> {
    render() {
        return (
            <Provider {...stores}>
                <div>
                    <Header />
                    <ProductList />
                    <Footer />
                </div>
            </Provider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)
