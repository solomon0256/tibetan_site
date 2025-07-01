interface Env {
  PROGRESS_DO: DurableObjectNamespace;
}

import { ProgressDO } from "./objects/ProgressDO";

export { ProgressDO };

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const id = env.PROGRESS_DO.idFromName("default");
    const stub = env.PROGRESS_DO.get(id);
    return stub.fetch(request);
  },
};
