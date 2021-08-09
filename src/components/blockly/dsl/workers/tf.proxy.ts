import type {
    TFModelCompileRequest,
    TFModelCompileResponse,
    TFModelTrainRequest,
    TFModelTrainResponse,
    TFModelPredictRequest,
    TFModelPredictResponse,
    TFModelMessage,
} from "../../../../workers/tf/dist/node_modules/tf.worker"
import workerProxy from "./proxy"

export async function postModelRequest(
    message: TFModelMessage
    // eslint-disable-next-line @typescript-eslint/ban-types
): Promise<any> {
    const worker = workerProxy("tf")
    const res = await worker.postMessage<TFModelMessage, TFModelMessage>(
        message
    )
    return res?.data
}

export async function compileRequest(
    message: TFModelCompileRequest
    // eslint-disable-next-line @typescript-eslint/ban-types
): Promise<TFModelCompileResponse> {
    // Randi TODO check for missing data e.g. if (!message.trainingData) return undefined

    const worker = workerProxy("tf")
    const res = await worker.postMessage<
        TFModelCompileRequest,
        TFModelCompileResponse
    >(message)
    return res
}

export async function trainRequest(
    message: TFModelTrainRequest
    // eslint-disable-next-line @typescript-eslint/ban-types
): Promise<TFModelTrainResponse> {
    // Randi TODO check for missing data e.g. if (!message.trainingData) return undefined

    const worker = workerProxy("tf")
    const res = await worker.postMessage<
        TFModelTrainRequest,
        TFModelTrainResponse
    >(message)
    return res
}

export async function predictRequest(
    message: TFModelPredictRequest
    // eslint-disable-next-line @typescript-eslint/ban-types
): Promise<TFModelPredictResponse> {
    // Randi TODO check for missing data e.g. if (!message.trainingData) return undefined

    const worker = workerProxy("tf")
    const res = await worker.postMessage<
        TFModelPredictRequest,
        TFModelPredictResponse
    >(message)
    return res
}
