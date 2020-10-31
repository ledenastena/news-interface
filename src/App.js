import React from 'react'
import './App.scss'
import { Route, Switch } from 'react-router-dom'
import TopNewsPage from './pages/top-news/top-news.component'
import CategoriesPage from './pages/categories/categories.component'
import SearchPage from './pages/search/search.component'
import Header from './components/header/header.component'
import Footer from './components/footer/footer.component'
import ArticlePage from './pages/article/article.component'

const App = () => (
  <div className="App">
    <Header />
    <div className="app-width">
      <Switch>
        <Route path="/search" component={SearchPage} />
        <Route path="/categories" component={CategoriesPage} />
        <Route path="/categories" component={CategoriesPage} />
        <Route path="/article" component={ArticlePage} />
        <Route path="/" component={TopNewsPage} />
      </Switch>
    </div>
    <Footer />
  </div>
)

export default App
