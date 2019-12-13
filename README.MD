
## Installation

To set up the project just run on the root of your project
```shell
$ npm install
```

### For running Grapgql server
```
npm start
```
### For Graphql editor
```
http://localhost:9000/graphiql
````


### Sample Request for operation service

```
{  
  operations(operationId: "520447", page: 1, pageSize: 5) {
      data {
        id
        accountId
        author
      }

  }
}
```

### For testing the graphql using easygraphql-tester

1. Go to root/test directory, open the shell
2. run the command 
```
mocha operationservice.js
```


