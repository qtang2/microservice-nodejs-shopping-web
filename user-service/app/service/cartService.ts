import { autoInjectable } from "tsyringe";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { CartRepository } from "../repository/cartRepository";
import { VerifyToken } from "../utility/password";
import { plainToClass } from "class-transformer";
import { AppValidation } from "../utility/errors";
import { CartInput } from "../models/dto/CartInput";
import { ShoppingCartModel } from "../models/ShoppingCartModel";
import { CartItemModel } from "../models/CartItemModel";

@autoInjectable() // inject whatever needed to create this user service
export class CartService {
  repository: CartRepository;
  constructor(repository: CartRepository) {
    this.repository = repository;
  }

  async ResponseWithError(event: APIGatewayProxyEventV2) {
    return ErrorResponse(404, "request method is not supported");
  }

  /**
   * Cart
   */
  CreateCart = async (event: APIGatewayProxyEventV2) => {
    try {
      const token = event.headers.authorization;
      if (!token) return ErrorResponse(403, "authorization failed");

      const payload = VerifyToken(token);

      if (!payload || !payload.user_id)
        return ErrorResponse(403, "authorization failed");

      const input = plainToClass(CartInput, event.body);

      const error = await AppValidation(input);

      if (error) return ErrorResponse(404, error);

      // DB operation
      let currentCart = await this.repository.findShoppingCart(payload.user_id);
      if (!currentCart) {
        currentCart = (await this.repository.createShoppingCart(
          payload.user_id
        )) as ShoppingCartModel;
      }

      // find the item if exist
      const currentProductCartItem =
        await this.repository.findCartItemByProductId(input.productId);

      // if exist update the qty
      if (currentProductCartItem) {
        await this.repository.updateCartItemByProductId(
          input.productId,
          input.qty
        );
      } else {
        // if does not call product service to get product information
        let cartItem: CartItemModel = {} as CartItemModel;
        cartItem.cart_id = currentCart.cart_id;
        cartItem.product_id = input.productId;
        cartItem.item_qty = input.qty;
        // finally create cart item
        // await this.repository.createCartItem({
        //   cart_id: currentCart.cart_id,
        //   product_id: input.productId,
        //   item_qty: input.qty,
        //   name: "",
        //   price: 8,
        //   image_url: "",
        // });
      }
      // return all cart items to client
      const result = await this.repository.createShoppingCart(payload.user_id);
      console.log("service CreateCart", result);

      return SuccessResponse({ message: "shopping cart updated!" });
    } catch (error) {
      console.log("EditProfile error ==>", error);
      return ErrorResponse(500, error);
    }
    return SuccessResponse({ message: "CreateCart response" });
  };
  GetCart = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "GetCart response" });
  };
  EditCart = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "EditCart response" });
  };
  DeleteCart = (event: APIGatewayProxyEventV2) => {
    return SuccessResponse({ message: "DeleteCart response" });
  };
}
