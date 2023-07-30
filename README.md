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
