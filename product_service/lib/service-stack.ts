import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface ServiceStackProps {
    bucket?: any;
}

export class ServiceStack extends Construct {
    public readonly productService: NodejsFunction

    constructor(scope: Construct, id: string, props: ServiceStackProps) {
        super(scope, id)

        const nodeJsFunctionProps: NodejsFunctionProps ={
            bundling:{
                externalModules:["aws-sdk"]
            },
            environment: {
                BUCKET_NAME: "BUCKET_ARN"
            },
            runtime: Runtime.NODEJS_20_X
        }

        this.productService = new NodejsFunction(this, "productLambda", {
            entry: join(__dirname, "/../src/index.ts"),
            ...nodeJsFunctionProps
        })
    }
}