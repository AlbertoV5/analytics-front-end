# Hamx A.I. Calculators Website

Static site built with [Astro](https://astro.build/), React and Bootstrap. Using AWS Cognito for authentication.

## DevOps

Branches flow:

- {feature} -> dev -> main

Deployments:

- dev -> deploy.yml -> GitHub Pages
- main -> prod_deploy.yml -> AWS S3 (+CloudFront)

Tests:

- {feature} -> TODO: implement unit/integration tests -> run unit and integration tests
- dev -> playwright -> run end-to-end tests

Environment Variables and Secrets are available in the repository settings.

## Styles

Using Bootstrap with custom SCSS. Import with Astro in Layout. Alternatively compile with:

```shell
npm run styles
```

## API

Using OpenAPI to generate the schemas and methods exported from FastAPI.

```shell
npm run openapi
```

## Auth

Using AWS SDK for JavaScript.

```shell
amazon-cognito-identity-js
```

## Content

Using Astro's content system for rendering HTML from markdown. 

```ts
export async function getStaticPaths() {
    const posts = await getCollection("metrics");
    return posts.map((post) => ({
        params: { slug: post.slug },
        props: { post },
    }));
}
```

## Directories

Following Astro file-based routing, the main directories in src are:

```shell
src
├── api
├── components
├── content
├── icons
├── images
├── layouts
├── pages
├── scripts
└── styles
```

- API: OpenAPI code-gen output.
- Components: Astro or React components by feature ("database", "login", etc).
- Content: Markdown files for Astro's markdown collections feature.
- Icons: SVG icons.
- Images: PNG and JPEG images.
- Layouts: Generic HTML templates with Header and SEO info. 
- Pages: File-based routing webpages that use Layouts and Components.
- Scripts: JavaScript analytics or fixes scripts loaded by Layouts.
- Styles: CSS and SCSS.