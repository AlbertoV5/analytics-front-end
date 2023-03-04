---
layout: ../../layouts/MainMid.astro
title: Support
---
<style>
    main {
        text-align: justify;
    }
    h2 {
        margin-bottom: 32px;
        text-align: center;
    }
    h3 {
        margin-bottom: 24px;
        margin-top: 24px;
    }
</style>

## SUPPORT

### Medical Calculators

Welcome to the Health Analytics MX Congenital Heart Disease Calculator Version 2023
We are expecting that your ability to start using the Calculator will be fast and easy due to its intuitive user interface. Whether you practice Cardiovascular Medicine, Intensive Care Medicine or Insurance Assessment this expert-AI system will help you to integrate more factors into producing a superior level of assessment with greater uniformity throughout your practice.

If there is a need for program training, we will provide a downloadable support manual that will help you to learn how to use this program in the shortest amount of time possible. We have also pre-loaded the system with the latest database (16-11-2022), in addition to the most commonly used ICD-11 codes and surgical procedures.

**The following is a rapid training and overview for immediate use of the program:**

### The Navigation Bar

Across the top of the screen is our menu or navigation bar. At the present time we have:

<ol type="a">
<li> <b>Calculator:</b> Here you will be able to make AI Predictions based on your database. Main calculation  has been set up to estimate Intensive Care Stay Days.
</li>
<li> <b>Metrics:</b> You will be able to visualize data using enterprise-grade graphics (Tableau).
</li>
<li> <b>Database:</b> You can consult Patient data (de-identified as per HIPAA specifications) and Diagnosis table (linked to ICD-11 codes). 
</li>
<li> <b>Support:</b> This will help you to learn how to use this program in the shortest amount of time possible.
</li>
</ol>

### Calculator

<ul style="list-style-type:none; padding-left: 10px;">
<li> <b>Age:</b> Patient’s age (days).</li>
<li> <b>Weight:</b> Patient’s weight (kilograms).</li>
<li> <b>Height:</b> Patient’s height (centimeters).</li>
<li> <b>Cx Prev:</b> Number of previous surgeries.</li>
<li> <b>Diagnosis:</b> Select from a drop-down menu as many cardiac diagnosis with ICD-11 codes as needed, you have available the top 10 most frequent diagnosis.</li>
<li> <b>Diagnosis Count:</b> You need to input the number of the selected cardiac diagnosis.</li>
</ul>

Once you have entered all the requested information press “Calculate”. A predictive calculation will be performed, the results are as follow: 

#### Result:

<ol type="a">
<li> Cluster where the patient is assigned.</li>
<li> The predicted number of Intensive Care Stay Days.</li>
<li> Classification, maximum and minimum values for the predicted number.</li>
</ol>

### Calculation Criteria

#### Spearman Correlation

In statistics, correlation coefficients are a quantitative assessment that measures both the direction and the strength of this tendency to vary together. Pearson’s correlation coefficient is a single number that measures both the strength and direction of the linear relationship between two continuous variables. Values can range from -1 to +1.

<ol type="a">
<li> The extreme values of -1 and 1 indicate a perfectly linear relationship where a change in one variable is accompanied by a perfectly consistent change in the other. </li>
<li> A coefficient of zero represents no linear relationship. </li>
<li> When the value is in-between 0 and +1/-1, there is a relationship, but the points don’t all fall on a line. As r approaches -1 or 1, the strength of the relationship increases and the data points tend to fall closer to a line.</li>
</ol>

### Medical History

Clicking “Medical History” will open a window where you can choose to enter either “Medical Conditions” or “Surgeries”. We will start with the Medical Conditions, so click it. On the bottom right of the window click “Add”, and a “Medical Condition” entry form appears. Again, placing at least two letters into the Name field will generate a list of options. Entry Example: the patient has Primary Complaints of insomnia, migraines, and depression which were precipitated by his -------   by -----------. 

Selecting the Name of the Medical Condition will automatically enter the appropriate ICD-11 code. A field is present for the year that the condition occurred followed by a check box to indicate if there was Loss of Consciousness in association with the condition. Then click “Submit” to add this condition to the patient’s chart. Note: All of these entry items will be used for searches and reports, a section that will be available in 2023. Continue to repeat this process adding additional Medical Conditions as needed for each patient