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

# TODO:

## Notes 1

1. Disclaimer in website
2. Better results display
3. Change About to Setup / Quickstart / Instructions
4. Change Client to Database
5. Home keep 

Slogan: Artificial Intelligence Made Easy

## Odoo

1. Language, Content Management system.
2. Jamstack deployment.

## Notes 2

1. Add view password option
2. Change favicon

## Calculator

1. Top Ten Diagnosis field instead of Diagnosis
2. Input custom diagnosis data, fuzzy search?
   1. Data Input section, improve data entry?
3. Keep the narrow layout in Calculator
4. Add Instructions to Calculator
5. Improve classification results description
6. Define cluster and metrics visualizations
7. Add a third step in Calculator: consult metrics


## TODO 

User experience:
- Ordenar por ID 
- Buscador
