![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Datetime picker web component built with Stencil
## The toc
 + [Short Description](#short-description)
 + [How it looks](#how-it-looks)
 + [How to use](#how-to-use)
 + [What is not included](#what-is-not-included)
 
## Short Description
This is a datetime picker web component built with [Stencil](https://stenciljs.com/). 
It allows to:
+ set a date
+ display the date using a custom format
+ use it on a PC and on a phone

## How it looks
![wireframes](https://user-images.githubusercontent.com/3591259/70871174-01e3e980-1fa5-11ea-8d19-1f4a9a177fb6.png)

## How to use
### To run locally in dev state
Install 
----
```
npm install
```
Run 
----
```
npm start
```
To build the component for production, run:
----------
```bash
npm run build
```
To run the unit tests for the components, run:
-----------
```bash
npm test
```

### To use it in your project
Check Stencil's [Framework Integration](https://stenciljs.com/docs/overview) page

### Example
Check the [index.html](https://github.com/alexeiTruhin/datetime-picker/blob/master/src/index.html) file for example of usage.

Also check the properties of the component in [component's readme file](https://github.com/alexeiTruhin/datetime-picker/blob/master/src/components/datetime/readme.md).

## What is not included
 + no testing... at all...
 + display date using words (like Jan, Feb etc.. for months), only numbers.
