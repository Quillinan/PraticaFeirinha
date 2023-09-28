import fruits from "data/fruits";
import server from "index";
import supertest from "supertest";

const api = supertest(server);

describe("Fruits API", () => {
  beforeEach(() => {
    fruits.length = 0;
    fruits.push(
      { id: 1, name: "Maçã", price: 1.0 },
      { id: 2, name: "Banana", price: 0.5 },
      { id: 3, name: "Laranja", price: 0.8 }
    );
  });

  //postFruits

  it("should return 201 when inserting a fruit", async () => {
    const newFruit = { name: "Pêra", price: 1.2 };
    const response = await api.post("/fruits").send(newFruit).expect(201);
  });

  it("should return 409 when inserting a fruit that is already registered", async () => {
    const invalidFruit = { name: "Maçã", price: 1.0 };
    await api.post("/fruits").send(invalidFruit).expect(409);
  });

  it("should return 422 when inserting a fruit with data missing", async () => {
    const invalidFruit = { name: "Uva" };
    await api.post("/fruits").send(invalidFruit).expect(422);
  });

  //getFruits

  it("shoud return 404 when trying to get a fruit by an id that doesn't exist", async () => {
    const id = 4;
    const response = await api.get(`/fruits/${id}`);
    expect(response.status).toBe(404);
  });

  it("should return 400 when id param is present but not valid", async () => {
    const id = "BADREQUEST";
    const response = await api.get(`/fruits/${id}`);
    expect(response.status).toBe(400);
  });

  it("should return one fruit when given a valid and existing id", async () => {
    const id = 2;
    const response = await api.get(`/fruits/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(fruits.find((fruit) => fruit.id === id));
  });

  it("should return all fruits if no id is present", async () => {
    const response = await api.get("/fruits");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(fruits);
  });

  afterAll(() => {
    server.close();
  });
});
