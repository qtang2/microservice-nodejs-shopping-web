import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

interface ApiGatewayStackProps {
    productService: IFunction
}

export class ApiGatewayStack extends Construct {
    public readonly productService: NodejsFunction

    constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
        super(scope, id)
        this.addResources("product", props.productService)
    }

    addResources(serviceName: string, handler: IFunction) {
        const apgw = new LambdaRestApi(this, `${serviceName}-ApiGtw`, {
            handler,
            proxy: false
        })

        /**
         * Get product
         * POST product
         * GET product/{id}
         * PUT product/{id}
         * DELETE product/{id}
         */
        const productResource = apgw.root.addResource("product")
        productResource.addMethod("GET")
        productResource.addMethod("POST")

        const productIdResource = productResource.addResource("{id}")
        productIdResource.addMethod("GET")
        productIdResource.addMethod("PUT")
        productIdResource.addMethod("DELETE")

        const categoryResource = apgw.root.addResource("category")
        categoryResource.addMethod("GET")
        categoryResource.addMethod("POST")

        const categoryIdResource = categoryResource.addResource("{id}")
        categoryIdResource.addMethod("GET")
        categoryIdResource.addMethod("PUT")
        categoryIdResource.addMethod("DELETE")

        const dealsResource = apgw.root.addResource("deals")
        dealsResource.addMethod("GET")
        dealsResource.addMethod("POST")

        const dealsIdResource = dealsResource.addResource("{id}")
        dealsIdResource.addMethod("GET")
        dealsIdResource.addMethod("PUT")
        dealsIdResource.addMethod("DELETE")
    }
}