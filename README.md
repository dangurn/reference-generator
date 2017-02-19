# Reference Generator

A small web application to generate a job reference (or 'letter of recommendation') automatically from a simple form.

Try it out [here](https://dangurn.github.io/reference-generator/).

## Features
* Choose whether to write a reference for a student, professional employee or a tenant.
* Fill out simple text inputs on your details, the applicant's details, and your relationship with them.
* Select simple checkboxes to comment on the applicant's competencies and performance.
* Complete as much or as little as the form as you like.
* Be reassured that you the reference will never say anything negative about the applicant that could put you in trouble.
* Generate multiple versions of each paragraph by clicking on the 'refresh' icon next to each paragraph.
* Edit any text you're not happy with by clicking on the 'edit' icon next to each paragraph.
* Copy, email or print your reference right from the browser.
* Designed to work on mobiles and tablets too.

## About
The Reference Generator is written using *React.js*; Facebook's programming language, and bundled up using *Webpack*. This is my first stab at writing a single-page web application, and my first serious attempt at using React.js. It may not be perfect, but it should work fine!

## Known issues
* React's `onChange` action does not fire on Internet Explorer's `input: range` elements. So, for now, the `onMouseUp` action is triggered as a back-up. This only affects the 'Relationship Capacity' component.
