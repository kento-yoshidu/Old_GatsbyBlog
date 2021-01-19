import React from "react"
import { Link, graphql } from "gatsby"

import Links from "../components/links"
import Footer from "../components/footer"

const Categorys = ({ data, location }) => {

  const categories = data.allMarkdownRemark.group

  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <Link to={"/"}>鳥に生まれることができなかった人へ</Link></h1> 
        <h2 className="page-title">カテゴリ一覧</h2>
      </header>

      <Links />

      <main className="main categoriesMain">
        <ul className="categoryList">
          { categories.map(category => {
            return (
              <li className="listItem">
                <Link to={`/category/${category.nodes[0].frontmatter.categorySlug}`}>
                  { category.nodes[0].frontmatter.categoryName } （{ category.totalCount }）
                </Link>
              </li>
            )
          })}
        </ul>
      </main>

      <Footer />
    </div>
  )
}

export default Categorys

export const pageQuery = graphql`
  query ($category: String) {
    allMarkdownRemark(filter: {frontmatter: {categorySlug: {eq: $category}}}) {
      totalCount
      group(field: frontmatter___categoryName) {
        nodes {
          frontmatter {
            categorySlug
            categoryName
          }
        }
        fieldValue
        totalCount
      }
    }
  }
`
