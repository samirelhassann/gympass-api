# gympass-api

A gym access controller simulator built using Nodejs + Typescript + SOLID principles  

This is a project used for study purposes only • [Samir El Hassan](https://github.com/samirelhassann)

This project was built with the help of [Rocketseat](https://www.rocketseat.com.br/) ![image 3](https://user-images.githubusercontent.com/91634008/206936638-05d22d2f-4c3a-4f45-861f-ff6fe1db990d.png)


## Language and Tools

<p align="left"> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

## Additional Libraries

- fastify
- prisma
- zod
- vitest
- supertest

## Demo

## Instalation

Install all the packages

```bash
npm install
```

Install the docker image and start the container:

```bash
docker compose up -d
```

## Usage

create a .env file following the values on .env.example, after that run:

```bash
yarn dev
```

## Test

Make sure that the docker is running localy, then:

Unit tests:

```bash
yarn test
```

E2E tests:

```bash
yarn test-e2e
```

## Business Rules

### RFs

- [x] Should be possible to sign in;
- [x] Should be possible to authenticate;
- [x] Should be possible to get the logged user profile;
- [x] Should be possible to do a check-in on a gym;
- [x] Should be possible to register a gym;
- [x] Should be possible to get the check-ins quantity of the logged user;
- [x] Should be possible to the user get the check-ins history;
- [x] Should be possible to get the near gyms until 10 km;
- [x] Should be possible to search gyms by name;
- [x] Should be possible to validate the check-in of a user;

### RNs

- [x] The user can not register with duplicated e-mail;
- [x] The user can not make 2 check-ins in the same day;
- [x] The user can not make check-in far from a gym;
- [x] The check-in must only be validated after 20 minutes after has been created;
- [x] The check-in must only be validated by admin;
- [x] Gyms can only be registered by admins;

### RNFs

- [x] The user password must be encrypted;
- [x] The application data must be persisted on a PostgreSQL database;
- [x] The data list must be paginated by 20 items by page;
- [x] The user must be identified by a JWT token;
