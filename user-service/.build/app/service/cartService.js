"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const tsyringe_1 = require("tsyringe");
const response_1 = require("../utility/response");
const cartRepository_1 = require("../repository/cartRepository");
const password_1 = require("../utility/password");
const class_transformer_1 = require("class-transformer");
const errors_1 = require("../utility/errors");
const CartInput_1 = require("../models/dto/CartInput");
const message_queue_1 = require("../message-queue");
let CartService = class CartService {
    constructor(repository) {
        /**
         * Cart
         */
        this.CreateCart = async (event) => {
            try {
                const token = event.headers.authorization;
                if (!token)
                    return (0, response_1.ErrorResponse)(403, "authorization failed");
                const payload = (0, password_1.VerifyToken)(token);
                if (!payload || !payload.user_id)
                    return (0, response_1.ErrorResponse)(403, "authorization failed");
                const input = (0, class_transformer_1.plainToClass)(CartInput_1.CartInput, event.body);
                const error = await (0, errors_1.AppValidation)(input);
                if (error)
                    return (0, response_1.ErrorResponse)(404, error);
                // DB operation
                let currentCart = await this.repository.findShoppingCart(payload.user_id);
                if (!currentCart) {
                    currentCart = (await this.repository.createShoppingCart(payload.user_id));
                }
                if (!currentCart) {
                    return (0, response_1.ErrorResponse)(500, "failed to create cart");
                }
                // find the item if exist
                const currentProductCartItem = await this.repository.findCartItemByProductId(input.productId);
                // if exist update the qty
                if (currentProductCartItem) {
                    await this.repository.updateCartItemByProductId(input.productId, input.qty + currentProductCartItem.item_qty);
                }
                else {
                    // if does not call product service to get product information
                    const { data, status } = await (0, message_queue_1.PullData)({
                        action: "PULL_PRODUCT_DATA",
                        productId: input.productId,
                    });
                    console.log("PULL_PRODUCT_DATA ", data);
                    if (status !== 200) {
                        return (0, response_1.ErrorResponse)(500, "failed to add cart, product not found");
                    }
                    // create cart item
                    let cartItem = data.data;
                    cartItem.cart_id = currentCart.cart_id;
                    cartItem.product_id = input.productId;
                    cartItem.item_qty = input.qty;
                    const result = await this.repository.createCartItem(cartItem);
                    console.log("service CreateCart", result);
                }
                // return all cart items to client
                const items = await this.repository.findCartItemsByCartId(currentCart.cart_id);
                return (0, response_1.SuccessResponse)(items);
            }
            catch (error) {
                console.log("EditProfile error ==>", error);
                return (0, response_1.ErrorResponse)(500, error);
            }
            return (0, response_1.SuccessResponse)({ message: "CreateCart response" });
        };
        this.GetCart = (event) => {
            return (0, response_1.SuccessResponse)({ message: "GetCart response" });
        };
        this.EditCart = (event) => {
            return (0, response_1.SuccessResponse)({ message: "EditCart response" });
        };
        this.DeleteCart = (event) => {
            return (0, response_1.SuccessResponse)({ message: "DeleteCart response" });
        };
        this.repository = repository;
    }
    async ResponseWithError(event) {
        return (0, response_1.ErrorResponse)(404, "request method is not supported");
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, tsyringe_1.autoInjectable)() // inject whatever needed to create this user service
    ,
    __metadata("design:paramtypes", [cartRepository_1.CartRepository])
], CartService);
//# sourceMappingURL=cartService.js.map