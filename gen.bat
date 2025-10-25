npx @openapitools/openapi-generator-cli generate -g javascript -i http://localhost:8080/v3/api-docs -o src/main/resources/static/api-client
npm run build:client