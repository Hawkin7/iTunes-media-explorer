const request = require("supertest");
const app = require("./app");

//This test uses supertest to make sure that the backend is receiving responses from the API
test("GET /search should fetch data from the API", async () => {
    const response = await request(app).get("/search?term=jack+johnson&media=music&limit=10");
    expect(response.status).toBe(200);
    expect(response.body.results).not.toBeNull();
});