# Hamx A.I. Calculators Website

Static site built with [Astro](https://astro.build/), React and Bootstrap.

## Source Folder Structure

Most of the files are .astro for general HTML and JSX for interactive sections. Following Astro's folder structure, components include separate .astro files and some include .tsx for React components. Most content is in markdown (.md) files inside each of the pages folder.

```
src
├── components
│   ├── calculator
│   │   └── components
│   ├── database
│   │   └── components
│   ├── footer
│   │   └── components
│   ├── login
│   │   ├── auth
│   │   ├── components
│   │   └── hooks
│   ├── navbar
│   │   └── components
│   └── userdata
├── icons
├── images
├── layouts
├── pages
│   ├── calculator
│   ├── database
│   ├── legal
│   ├── login
│   ├── metrics
│   └── quickstart
├── scripts
└── styles
```

## Styles

Using Bootstrap with custom SCSS. Compile with:
```shell
sass src/styles/custom.scss public/custom.css
```