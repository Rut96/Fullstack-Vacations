import { expect } from "chai";
import { describe, it, before } from "mocha";
import path from "path";
import supertest from "supertest";
import { app } from "../src/app";
import fs from "fs";

describe("Testing VacationController", () => {
    let token: string;
    let imagePath: string;

    before(async () => {
        try {
            const loginResponse = await supertest(app.server)
                .post("/api/login")
                .send({
                    email: "rut@gmail.com",
                    password: "12345"
                });

            if (loginResponse.status !== 200) {
                throw new Error(`Login failed with status ${loginResponse.status}`);
            }

            token = loginResponse.text;
            console.log("Login successful, token received:", token);

            imagePath = path.join(__dirname, "resources", "vac.jpg");
            if (!fs.existsSync(imagePath)) {
                throw new Error(`Test image not found at: ${imagePath}`);
            }

        } catch (err) {
            console.error("Test setup failed:", err);
            throw err;
        }
    });

    // GET all vacations
    it("should return vacations array", async () => {
        const response = await supertest(app.server)
            .get("/api/vacations")
            .set("Authorization", `Bearer ${token}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThanOrEqual(0);
        if (response.body.length > 0) {
            expect(response.body[0]).to.contain.keys(
                "id",
                "destination",
                "description",
                "startDate",
                "endDate",
                "price",
                "imageName"
            );
        }
    });

    // GET vacations with likes
    it("should return vacations array with likes", async () => {
        const response = await supertest(app.server)
            .get("/api/vacations-likes")
            .set("Authorization", `Bearer ${token}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThanOrEqual(0);
        if (response.body.length > 0) {
            expect(response.body[0]).to.contain.keys(
                "id",
                "destination",
                "description",
                "startDate",
                "endDate",
                "price",
                "imageName",
                "isMyLiked",
                "likesCount"
            );
        }
    });

    // GET single vacation
    it("should return a single vacation", async () => {
        // First create a vacation to test
        const newVacation = await supertest(app.server)
            .post("/api/vacations")
            .set("Authorization", `Bearer ${token}`)
            .field("destination", "Test Destination")
            .field("description", "Test Description")
            .field("startDate", "2024-06-14 21:00:00")
            .field("endDate", "2024-06-14 22:00:00")
            .field("price", "150")
            .attach("img", imagePath);

        const vacationId = newVacation.body.id;

        const response = await supertest(app.server)
            .get(`/api/vacations/${vacationId}`)
            .set("Authorization", `Bearer ${token}`);
        
        expect(response.status).to.equal(200);
        expect(response.body).to.not.be.empty;
        expect(response.body).to.contain.keys(
            "id",
            "destination",
            "description",
            "startDate",
            "endDate",
            "price",
            "imageName"
        );
    });

    // POST new vacation
    it("should add a new vacation", async () => {
        const response = await supertest(app.server)
            .post("/api/vacations")
            .set("Authorization", `Bearer ${token}`)
            .field("destination", "Testing Vacation")
            .field("description", "Testing description")
            .field("startDate", "2024-06-14 21:00:00")
            .field("endDate", "2024-06-14 22:00:00")
            .field("price", 150)
            .attach("img", imagePath);

        expect(response.status).to.equal(201);
        expect(response.body).to.not.be.empty;
        expect(response.body).to.contain.keys(
            "id",
            "destination",
            "description",
            "startDate",
            "endDate",
            "price",  
            "imgUrl"    
        );
        expect(response.body.destination).to.equal("Testing Vacation");
        expect(parseFloat(response.body.price)).to.equal(150);
    });

    // PUT update vacation
    it("should update an existing vacation", async () => {
        const newVacation = await supertest(app.server)
            .post("/api/vacations")
            .set("Authorization", `Bearer ${token}`)
            .field("destination", "Original Destination")
            .field("description", "Original Description")
            .field("startDate", "2024-06-14 21:00:00")
            .field("endDate", "2024-06-14 22:00:00")
            .field("price", 150)
            .attach("img", imagePath);

        const vacationId = newVacation.body.id;

        const response = await supertest(app.server)
            .put(`/api/vacations/${vacationId}`)
            .set("Authorization", `Bearer ${token}`)
            .field("destination", "Updated Vacation")
            .field("description", "Updated description")
            .field("startDate", "2024-07-14 21:00:00")
            .field("endDate", "2024-07-14 22:00:00")
            .field("price", 200)
            .attach("img", imagePath);

        expect(response.status).to.equal(200);
        expect(response.body).to.not.be.empty;
        expect(response.body).to.contain.keys(
            "id",
            "destination",
            "description",
            "startDate",
            "endDate",
            "price", 
            "imageName"    
        );
        expect(response.body.destination).to.equal("Updated Vacation");
        expect(parseFloat(response.body.price)).to.equal(200);
    });

    // DELETE vacation
    it("should delete a vacation", async () => {
        const newVacation = await supertest(app.server)
            .post("/api/vacations")
            .set("Authorization", `Bearer ${token}`)
            .field("destination", "To Be Deleted")
            .field("description", "This vacation will be deleted")
            .field("startDate", "2024-06-14 21:00:00")
            .field("endDate", "2024-06-14 22:00:00")
            .field("price", 150)
            .attach("img", imagePath);

        const vacationId = newVacation.body.id;

        const response = await supertest(app.server)
            .delete(`/api/vacations/${vacationId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).to.equal(204);
    });

});