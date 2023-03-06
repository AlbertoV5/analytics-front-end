---
layout: ../../layouts/MainWide.astro
title: Metrics
# Tableau in HTML:
# https://help.tableau.com/current/api/embedding_api/en-us/docs/embedding_api_basic.html
---
<script type="module" src="https://public.tableau.com/javascripts/api/tableau.embedding.3.4.0.min.js"></script>

<style>
    h4 {
        color: #555;
        margin-top: 24px;
    }
</style>

## METRICS

#### Patient Per State

<img id="thumb-2" src="https://public.tableau.com/thumb/views/Gender-Kardias/Mapa" width="300px">
<!-- <img id="thumb-1" src="https://public.tableau.com/views/Gender-Kardias/Mapa.png?%3Adisplay_static_image=y&:showVizHome=n" width="400px"> -->
<tableau-viz id="tableau1" src="https://public.tableau.com/views/Gender-Kardias/Mapa" width="100%" height="600px" toolbar="bottom" hide-tabs disable-url-actions/>
