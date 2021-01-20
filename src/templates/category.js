import React from "react"
import { Link, graphql } from "gatsby"

import Links from "../components/links"
import Footer from "../components/footer"
import "../scss/style.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faClock, faUndo, faTags } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const Category = ({ pageContext, data }) => {

  const { edges } = data.allMarkdownRemark
  const { category } = pageContext

  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <Link to={"/"}>鳥に生まれることができなかった人へ</Link>
        </h1> 
        <h2 className="page-title">
          { category } カテゴリの記事
        </h2>
      </header>

      <Links />

      <main className="main">
      <ol style={{ listStyle: `none` }} className="post-list">
        {
          edges.map((node) => {
            const title = node.node.frontmatter.title 

            return (
              <li key={node.node.fields.title}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2 className="post-title">
                      <Link to={node.node.fields.slug} itemProp="url">
                        <span itemProp="headline">{ title }</span>
                      </Link>
                    </h2>
                    <div className="info">
                      <p className="category">
                        <FontAwesomeIcon icon={faFolder} />
                        <Link to={`/category/${node.node.frontmatter.categorySlug}`}>{node.node.frontmatter.categoryName}</Link>
                      </p>
                      <p className="post"><FontAwesomeIcon icon={faClock} />{node.node.frontmatter.postdate}</p>
                      <p className="update"><FontAwesomeIcon icon={faUndo} />{node.node.frontmatter.updatedate}</p>
                      <p className="tags"><FontAwesomeIcon icon={faTags} />
                        {
                          node.node.frontmatter.tags.map(tag => {
                            return (
                              <a href={`/tag/${tag}`}>{ tag }</a>
                            )
                          })
                        }
                      </p>
                    </div>
                  </header>
                </article>
              </li>
            )
          })
        }
      </ol>
      </main>

      <Footer />
    </div>
  )
}

export default Category

export const pageQuery = graphql`
  query($categoryId: String) {
    allMarkdownRemark (
      sort: {
        fields: [frontmatter___postdate],
        order: DESC
      }
      filter: {
        frontmatter: {
          categorySlug: {
            eq: $categoryId
          }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            postdate(formatString: "YYYY年MM月DD日")
            updatedate(formatString: "YYYY年MM月DD日")
            categoryName
            categorySlug
            title
            tags
          }
        }
      }
    }
  }
`