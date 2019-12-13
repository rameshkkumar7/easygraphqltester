"use strict";

const fs = require("fs");
const path = require("path");
const { expect } = require("chai");
//const EasyGraphQLTester = require("easygraphql-tester");
const EasyGraphQLTester = require("../lib");
const db = require('../db')

const schemaCode = fs.readFileSync(
    path.join(__dirname, "schema", "schema.gql"),
    "utf8"
);

describe('Testing Operation Service', () => {
    let tester

    before(() => {
        tester = new EasyGraphQLTester(schemaCode)
    })

    it('Invalid query getOperationFields', () => {
        const query = `
        {
            operations (operationId: "23456", invalidField:1, pageSize:20) 
            { 
            data {
                id
                name
                serviceId
                accountId
                customerId
                status
                createdDate
            }
            pageInfo {
                currentPage
                pageSize
                currentSize
                previousPage
                nextPage
                firstPage
            }
        }
      }
    `
            // First arg: false, there is no invalidField on the schema.
        tester.test(false, query)
    })

    it('Invalid fields in query', () => {
        const query = `
          {
            operations (operationId: "23456", page:1, pageSize:20) 
            { 
                data {
                    id
                    name
                    invalidField
                    accountId
                    customerId
                    status
                    createdDate
                }
                pageInfo {
                    currentPage
                    pageSize
                    currentSize
                    previousPage
                    nextPage
                    firstPage
                }
            }
          }
        `
            // First arg: false, there is no invalidField on the schema.
        tester.test(false, query)
    })

    it("Should pass if the query is valid", () => {
        const query = `
          {
            operations (operationId: "23456", page:1, pageSize:20) 
            { 
                data {
                    id
                    name
                    serviceId
                    accountId
                    customerId
                    status
                    createdDate
                }
                pageInfo {
                    currentPage
                    pageSize
                    currentSize
                    previousPage
                    nextPage
                    firstPage
                }
            }
          }
        `

        tester.test(true, query)
            /*  const {
                 data: { getOperationFields }
             } = tester.mock(query);
             console.log(getOperationFields) */
            /* expect(getOperationFields.id).to.exist;
            expect(getOperationFields.name).to.exist; */
    });
});