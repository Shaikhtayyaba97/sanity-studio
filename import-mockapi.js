"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@sanity/client");
var node_fetch_1 = require("node-fetch");
// Initialize Sanity client
var sanityClient = (0, client_1.createClient)({
    projectId: '1kifk5u3', // Replace with your project ID
    dataset: 'production', // Replace with your dataset
    useCdn: false,
    apiVersion: '2023-01-01',
    token: 'skqdoSAfJBBnLs0ZnleZgnAGkTOGtVGubfyINQXryb2aHyj7lIp0lt86dcdZdtv6g7l3y27Gclh6RpqLWCSySw8cv82gRUxOXMGBg5YvGrWeaPQXABHs1cZaUj4tmJDzmnjOPyTk0brRbZ514Z2IcG1a2IXboZ1RMyOSEmH7dEWBTahBO2xh', // Replace with your Sanity token
});
// MockAPI URL
var mockApiUrl = 'https://677d6be14496848554ca92d5.mockapi.io/furniture/api/furniture';
// Import data function
function importData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, furnitureItems, _i, furnitureItems_1, item, doc, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    console.log('Fetching data from MockAPI...');
                    return [4 /*yield*/, (0, node_fetch_1.default)(mockApiUrl)];
                case 1:
                    response = _a.sent();
                    // Ensure the response is successful
                    if (!response.ok) {
                        throw new Error("Failed to fetch data: ".concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    furnitureItems = (_a.sent());
                    console.log("Fetched ".concat(furnitureItems.length, " items from MockAPI."));
                    _i = 0, furnitureItems_1 = furnitureItems;
                    _a.label = 3;
                case 3:
                    if (!(_i < furnitureItems_1.length)) return [3 /*break*/, 6];
                    item = furnitureItems_1[_i];
                    doc = {
                        _type: 'furniture',
                        id: item.id,
                        createdAt: item.createdAt,
                        name: item.name,
                        price: item.price,
                        image: {
                            _type: 'image',
                            asset: {
                                _ref: item.image, // Assumes the image is a URL. You may need to handle uploads separately.
                            },
                        },
                    };
                    // Create the document in Sanity
                    return [4 /*yield*/, sanityClient.create(doc)];
                case 4:
                    // Create the document in Sanity
                    _a.sent();
                    console.log("Imported: ".concat(item.name));
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log('All data imported successfully!');
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.error('Error importing data:', error_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// Call the importData function
importData();
