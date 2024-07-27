import { aws_apigateway } from "aws-cdk-lib";
import { LambdaIntegration, LambdaRestApi, RestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

interface ApiGatewayStackProps {
  productService: IFunction;
  categoryService: IFunction;
  dealsService: IFunction;
}

interface ResourceType {
    name: string;
    methods: string[];
    child?: ResourceType
}

export class ApiGatewayStack extends Construct {
  public readonly productService: NodejsFunction;

  constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
    super(scope, id);
    this.addResources("product", props);
  }

  addResources(
    serviceName: string,
    { productService, categoryService, dealsService }: ApiGatewayStackProps
  ) {
    
    const apgw = new aws_apigateway.RestApi(this, `${serviceName}-ApiGtw`);

    this.createEndpoint(productService, apgw, {
        name: 'product',
        methods: ["GET", "POST"],
        child: {
            name:'{id}',
            methods: ["GET", "PUT", "DELETE"],
        }
    })
    this.createEndpoint(categoryService, apgw, {
        name: 'category',
        methods: ["GET", "POST"],
        child: {
            name:'{id}',
            methods: ["GET", "PUT", "DELETE"],
        }
    })
    this.createEndpoint(dealsService, apgw, {
        name: 'deals',
        methods: ["GET", "POST"],
        child: {
            name:'{id}',
            methods: ["GET", "PUT", "DELETE"],
        }
    })

  }

  createEndpoint(handler: IFunction, resource: RestApi, {name, methods, child}: ResourceType) {
    const lambdaFunction = new LambdaIntegration(handler)
    const rootResource = resource.root.addResource(name)

    methods.map((item) => {
        rootResource.addMethod(item, lambdaFunction)
    })

    if(child) {
        const childResource = rootResource.addResource(child.name)
        methods.map((item) => {
            childResource.addMethod(item, lambdaFunction)
        })
    }

  }
}
