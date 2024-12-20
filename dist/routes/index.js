"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const elve_routes_1 = require("./elve.routes");
const reindeer_routes_1 = require("./reindeer.routes");
const address_routes_1 = require("./address.routes");
const card_routes_1 = require("./card.routes");
const children_routes_1 = require("./children.routes");
const member_routes_1 = require("./member.routes");
const reindeerOrganization_routes_1 = require("./reindeerOrganization.routes");
const santaCookies_routes_1 = require("./santaCookies.routes");
const registerRoutes = (app) => {
    app.use("/api/elfo", (0, elve_routes_1.createElveRouter)());
    app.use("/api/reindeer", (0, reindeer_routes_1.createReindeerRouter)());
    app.use("/api/address", (0, address_routes_1.createAddressRouter)());
    app.use("/api/card", (0, card_routes_1.createCardsRouter)());
    app.use("/api/children", (0, children_routes_1.createChildrensRouter)());
    app.use("/api/member", (0, member_routes_1.createMemberRouter)());
    app.use("/api/reindeerOrganizations", (0, reindeerOrganization_routes_1.createReindeerOrganizationRouter)());
    app.use("/api/cookie", (0, santaCookies_routes_1.createSantaCookiesRouter)());
};
exports.registerRoutes = registerRoutes;
