import React from 'react'
import './App.scss'
import { Route, Switch } from 'react-router-dom'
import TopNewsPage from './pages/top-news/top-news.component'
import CategoriesPage from './pages/categories/categories.component'
import SearchPage from './pages/search/search.component'
import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route path="/search" component={SearchPage} />
      <Route path="/categories" component={CategoriesPage} />
      <Route path="/" component={TopNewsPage} />
    </Switch>
    <Footer />
  </div>
)

export default App
