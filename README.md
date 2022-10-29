# The Front-end App

## System Requirements

- Node.js 16+ (with NPM)

## Local Development

```
npm install
npm start
```

Visit http://localhost:3000/ in your web browser

## AWS Deployment

Create a new Amplify app and deployment of main branch.

Add the following environment variables:

```ini
REACT_APP_API_BASE_URL=https://aws-metro-api.guoyunhe.me/
```

Modify the build spec (amplify.yml):

```yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - echo "REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL" >> .env
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
```
