# Fastest Biker Oslo

Work in progress. 

Find the fastest Oslo City Biker between station A and station B.

## :fast_forward: tl;dr

__Development:__

```
clone this repo
yarn install
make .env file from example.env
yarn run dev
(automatically) open browser at localhost:3000
🚀
```

The config variables can be found in the Heroku settings for each app. Due to `create-react-app` variables needs to be prefixed with `REACT_APP` to be exposed in the React (client-side) app.

__This application base hosts all of the apps in the system:__

* Frontend `/src/frontend`
* Backend `/src/backend`

## :package: Tech
* [React](https://facebook.github.io/react/)

## :computer: Deploy

[Heroku Multi Procfile Buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-multi-procfile)

Set the following environment variables to specify which app you want to deploy:

* `PROCFILE`
  * Set the path to the `Procfile` you want to use
  * Example: `./src/frontend/Procfile`
* `APP`
  * Set the name of the app you are deploying
  * Corresponding to its folder name
  * Makes sure the correct scripts are executed
  * Example: `frontend`

Then set the additional appropriate environment variables that are required by the application specified.

## :books: Overview

__TODO__
