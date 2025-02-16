import { Block, Workspace } from "blockly"
import { CHANGE } from "../../../../jacdac-ts/src/jdom/constants"
import { inIFrame } from "../../../../jacdac-ts/src/jdom/iframeclient"
import { randomDeviceId } from "../../../../jacdac-ts/src/jdom/random"
import { workspaceToJSON } from "../jsongenerator"
import {
    BlockDataSet,
    BlockDataSetTransform,
    BlockDefinition,
    ContentDefinition,
    resolveBlockDefinition,
} from "../toolbox"
import { BlockWithServices, setBlockDataWarning } from "../WorkspaceContext"
import BlockDomainSpecificLanguage, {
    CreateBlocksOptions,
    CreateCategoryOptions,
} from "./dsl"
import { WorkspaceJSON } from "./workspacejson"

export interface DslMessage {
    type?: "dsl"
    id?: string
    dslid: string
    action: "mount" | "unmount" | "blocks" | "transform" | "change"
}

export interface DslBlocksResponse extends DslMessage {
    action: "blocks"
    blocks: BlockDefinition[]
    category: ContentDefinition[]
}

export interface DslTransformMessage extends DslMessage {
    action: "transform"
    blockId?: string
    workspace?: WorkspaceJSON
    dataset?: BlockDataSet
}

export interface DslTransformResponse extends DslTransformMessage {
    warning?: string
}

class IFrameDomainSpecificLanguage implements BlockDomainSpecificLanguage {
    private dslid = randomDeviceId()
    private blocks: BlockDefinition[] = []
    private category: ContentDefinition[] = []
    private pendings: Record<string, (data: DslMessage) => void> = {}

    private _workspace: Workspace

    constructor(readonly id: string, readonly targetOrigin: string) {
        this.handleMessage = this.handleMessage.bind(this)
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    private post(action: string, extras?: object) {
        const payload = {
            id: Math.random() + "",
            type: "dsl",
            dslid: this.dslid,
            action,
            ...(extras || {}),
        } as DslMessage
        window.parent.postMessage(payload, this.targetOrigin)
        return payload
    }

    mount(workspace: Workspace) {
        this._workspace = workspace
        window.addEventListener("message", this.handleMessage, false)
        this.post("mount")
        return () => {
            this.post("unmount")
            this._workspace = undefined
            window.removeEventListener("message", this.handleMessage)
        }
    }

    private handleMessage(msg: MessageEvent<DslMessage>) {
        const { data } = msg
        if (data.type === "dsl" && data.dslid === this.dslid) {
            const { id, action } = data
            // check for pending request
            const pending = id !== undefined && this.pendings[id]
            if (pending) {
                delete this.pendings[id]
                pending(data)
            }
            // trigger recomputation
            if (action === "change") {
                //console.log(`iframedsl: change requested`)
                this._workspace
                    .getTopBlocks(false)
                    .filter(
                        b => resolveBlockDefinition(b.type)?.dsl === this.id
                    )
                    .forEach((b: Block) => {
                        //console.log(`change ${b.id}`)
                        const { jacdacServices } = b as BlockWithServices
                        jacdacServices.emit(CHANGE)
                    })
            }
        }
    }

    private createTransformData(): BlockDataSetTransform {
        return (blockWithServices, dataset) =>
            new Promise<BlockDataSet>(resolve => {
                const workspace = workspaceToJSON(
                    blockWithServices.workspace,
                    [], // TODO pass dsls
                    [blockWithServices]
                )
                const { id } = this.post("transform", {
                    blockId: blockWithServices.id,
                    workspace,
                    dataset,
                })
                setTimeout(() => {
                    if (this.pendings[id]) {
                        delete this.pendings[id]
                        console.warn(`iframedsl: transform timeouted`)
                        resolve(undefined)
                    }
                }, 10000)
                this.pendings[id] = data => {
                    const { dataset, warning } = data as DslTransformResponse
                    if (warning) setBlockDataWarning(blockWithServices, warning)
                    resolve(dataset)
                }
            })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createBlocks(options: CreateBlocksOptions): Promise<BlockDefinition[]> {
        return new Promise<BlockDefinition[]>(resolve => {
            const { id } = this.post("blocks")
            setTimeout(() => {
                if (this.pendings[id]) {
                    delete this.pendings[id]
                    console.warn(
                        `iframedsl ${this.id}: no blocks returned, giving up`
                    )
                    resolve(this.blocks)
                }
            }, 3000)
            this.pendings[id] = data => {
                const bdata = data as DslBlocksResponse
                this.blocks = bdata.blocks
                this.category = bdata.category
                console.debug(
                    `iframedsl ${this.id}: loaded ${this.blocks?.length} blocks, ${this.category?.length} categories`
                )
                const transformData = this.createTransformData()
                this.blocks.forEach(
                    block => (block.transformData = transformData)
                )
                resolve(this.blocks)
            }
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createCategory(options: CreateCategoryOptions): ContentDefinition[] {
        return this.category
    }
}

/**
 * Creates an iframe DSL if applicable
 * @param targetOrigin
 * @returns
 */
export function createIFrameDSL(
    id: string,
    targetOrigin = "*"
): BlockDomainSpecificLanguage {
    return inIFrame() && new IFrameDomainSpecificLanguage(id, targetOrigin)
}
