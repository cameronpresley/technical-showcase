# Technical Showcase

This repository is a technical showcase of abilities for a technical screen.

_Requirements_

Create either a console or a UI application that displays photo ids and titles in an album.
The photos are available in this web service: [https://jsonplaceholder.typicode.com/photos](https://jsonplaceholder.typicode.com/photos). Photos are filtered with a query string.

This will return photos within Album ID 3 [https://jsonplaceholder.typicode.com/photos?albumId=3](https://jsonplaceholder.typicode.com/photos?albumId=3).

## Dependencies

To build/run the application, you can do so _natively_ or _containerized_.

### Running Natively
- Make sure you have [Node 18+ LTS](https://nodejs.org/en/download) installed

To build/run the application, run the following commands in the root of the repository:

```shell
npm install
npm run start
```

Open your browser to [localhost:4200](http://localhost:4200) and you should see the application.

### Running Containerized
- Make sure you have [Docker](https://docs.docker.com/engine/install/) installed

To run the application, run the following commands in the root of the repository.

```sh
docker compose build # builds the container
docker compose up # starts the application
```

Open your browser to [localhost:8000](http://localhost:8000) and you should see the application.

# PhotoAlbum

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
