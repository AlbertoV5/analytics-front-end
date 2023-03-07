---
title: Intensive Care Stay Days Predictor
description: Calculate number of days that a patient will stay in the Intensive Care Unit using Machine Learning.
date: "2023-02-15"
---

# Calculadora

Health Analytics brinda 3 diferentes modelos para la predicción de datos, de los cuales, el seleccionado es el modelo de clasificación de pacientes de acuerdo al rango de días.
Los pacientes están clasificados en 4 grupos: 

- Estancia de menos de 4 días.
- Estancia de 4 a 7 días.
- Estancia de 7 a 10 días.
- Estancia de 10 días o más.

El número de pacientes de cada grupo:
- De 0 a 4 días: 396
- De 4 a 7 días: 127
- De 7 a 10 días: 58
- 10 días o más: 209

La predicción tiene probabilidad de acertar de alrededor del 80% por lo que se complementa con modelos adicionales. Estos incluyen predicciones y métricas que señalan rangos de variación para integrar el resultado.

En el estudio se implementó un “Score” que complementa los resultados para obtener una predicción asertiva de los grupos. 

El rango del Score va de 1 a 10, donde el 1 determina mayor exactitud.

Los resultados del análisis recomiendan mejorar la captura de la base de datos para obtener mayor información y poder realizar una clasificación más específica. 

- Algunas posibles servicios para su mejora, incluyen:
- Sistema para captura de pacientes
- Formato para captura de datos basado en ICD
- Base de datos completa
