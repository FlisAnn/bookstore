const app = require("../../server");
const supertest = require("supertest");
const { expect, jsonResponse } = require("../specHelper");
// const { requests } = require('sinon');

let server, request, response;

beforeEach(done => {
  server = app.listen(done);
  request = supertest.agent(server);
});

after(done => {
  server.close(done);
});

describe("GET /books", () => {
  beforeEach(async () => {
    response = await request.get("/books");
  });

  it("is expected to respond with status 200", () => {
    expect(response.status).to.equal(200);
  });
});
