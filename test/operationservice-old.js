"use strict";

const fs = require("fs");
const path = require("path");
const { expect } = require("chai");
const gql = require("graphql-tag");
//const EasyGraphQLTester = require("easygraphql-tester");
const EasyGraphQLTester = require("../lib");

const schemaCode = fs.readFileSync(
    path.join(__dirname, "schema", "operations.gql"),
    "utf8"
);

const customRootTypeNamesSchema = fs.readFileSync(
    path.join(__dirname, "schema", "customRootTypeNames.gql"),
    "utf8"
);

describe('Testing Operation Service', () => {
    let tester

    before(() => {
        tester = new EasyGraphQLTester(schemaCode)
    })

    it("Should return selected fields on getOperationFields", () => {
        const query = `
          {
            getOperationFields (operationId: "23456", page:1, pageSize:20) 
            {
                id
                name
                serviceId
                accountId
                customerId
                status
                createdDate
            }
          }
        `;

        const {
            data: { getOperationFields }
        } = tester.mock(query);
        console.log(getOperationFields)
        expect(getOperationFields.id).to.exist;
        expect(getOperationFields.name).to.exist;
        expect(getOperationFields.serviceId).to.exist;
        expect(getOperationFields.accountId).to.exist;
        expect(getOperationFields.customerId).to.exist;
        expect(getOperationFields.status).to.exist;
        expect(getOperationFields.createdDate).to.exist;
    });
});