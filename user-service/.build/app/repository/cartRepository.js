"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const dbOperation_1 = require("./dbOperation");
// handle data access layer
class CartRepository extends dbOperation_1.DBOperation {
    constructor() {
        super();
    }
    async findShoppingCart(userId) {
        const queryString = "SELECT cart_id, user_id FROM shopping_carts WHERE user_id=$1";
        const values = [userId];
        const result = await this.executeQuery(queryString, values);
        return result.rowCount && result.rowCount > 0
            ? result.rows[0]
            : false;
    }
    async createShoppingCart(userId) {
        const queryString = "INSERT INTO shopping_carts(user_id) VALUES($1) RETURNING *";
        const values = [userId];
        const result = await this.executeQuery(queryString, values);
        return result.rowCount && result.rowCount > 0
            ? result.rows[0]
            : false;
    }
    async findCartItemById(cartId) { }
    async findCartItemByProductId(productId) {
        const queryString = "SELECT product_id, price, item_qty FROM cart_items WHERE product_id=$1";
        const values = [productId];
        const result = await this.executeQuery(queryString, values);
        return result.rowCount && result.rowCount > 0
            ? result.rows[0]
            : false;
    }
    async findCartItemsByCartId(cartId) {
        const queryString = "SELECT product_id, name, price, image_url, item_qty FROM cart_items WHERE cart_id=$1";
        const values = [cartId];
        const result = await this.executeQuery(queryString, values);
        return result.rowCount && result.rowCount > 0
            ? result.rows
            : [];
    }
    async findCartItems(userId) { }
    async createCartItem({ cart_id, product_id, name, image_url, price, item_qty, }) {
        const queryString = "INSERT INTO cart_items(cart_id, product_id, name, image_url, price, item_qty) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
        const values = [cart_id, product_id, name, image_url, price, item_qty];
        const result = await this.executeQuery(queryString, values);
        return result.rowCount && result.rowCount > 0
            ? result.rows[0]
            : false;
    }
    async updateCartItemById(itemId, qty) {
        // const queryString = "UPDATE cart_items SET item_qty=$1 WHERE item_id=$2";
        // const values = [qty, itemId];
        // const result = await this.executeQuery(queryString, values);
        // return result.rowCount && result.rowCount > 0
        //   ? (result.rows[0] as CartItemModel)
        //   : false;
    }
    async updateCartItemByProductId(productId, qty) {
        const queryString = "UPDATE cart_items SET item_qty=$1 WHERE product_id=$2 RETURNING *";
        const values = [qty, productId];
        const result = await this.executeQuery(queryString, values);
        return result.rowCount && result.rowCount > 0
            ? result.rows[0]
            : false;
    }
    async deleteCartItem(id) { }
}
exports.CartRepository = CartRepository;
//# sourceMappingURL=cartRepository.js.map