import {defineCliConfig} from "sanity/cli";
export default defineCliConfig({api:{projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||"lxh9l3bt",dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production"},typegen:{path:"./sanity.types.ts",generates:"./sanity.types.ts",schema:"./schema.json"}});
