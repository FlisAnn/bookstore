const app = require("../../server");
const supertest = require("supertest");
const { expect, jsonResponse } = require("../specHelper");

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

  it("is expected to return a collection of books", () => {
    const expectedBody =
      '{"books":[{"id":1,"author":"J.K. Rowlings","title":"Harry Potter"},{"id":2,"author":"Doris Lessing","title":"The Golden Notebook"},{"id":4,"author":"A. Flismark","title":"Being awesome"},{"id":9,"author":"Valerie Solanas","title":"SCUM Manifesto"},{"id":11,"author":"Nina Björk","title":"Under det rosa täcket"},{"id":12,"author":"Cissi Wallin","title":"Allt som var mitt"},{"id":8,"author":"Claire North","title":"The Sudden Appearance Of Hope"}]}';
    expect(jsonResponse(response)).to.equal(expectedBody);
  });
});
