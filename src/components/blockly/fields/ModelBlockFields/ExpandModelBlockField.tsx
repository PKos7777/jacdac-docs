import React, { useContext,
                useEffect,
                useState } from "react"

import { Grid,} from "@material-ui/core"
import AddCircleIcon from "@material-ui/icons/AddCircleOutline"
import RemoveCircleIcon from "@material-ui/icons/RemoveCircleOutline"
import IconButtonWithTooltip from "../../../ui/IconButtonWithTooltip"

import { ReactFieldJSON } from "../ReactField"
import ReactInlineField from "../ReactInlineField"
import ReactParameterField from "../ReactParameterField"
import WorkspaceContext from "../../WorkspaceContext"

function ExpandIconWidget() {
    const { sourceBlock, workspaceJSON } = useContext(WorkspaceContext)
    const [parametersVisible, setParametersVisible] = useState(false)

    /*useEffect(() => {
        const parameterField = sourceBlock.getField("BLOCK_PARAMS") as ReactParameterField<any>
        setParametersVisible(parameterField.areParametersVisible())
    }, [workspaceJSON])*/

    const handleExpandBlock = () => {
        const parameterField = sourceBlock.getField("BLOCK_PARAMS") as ReactParameterField<any>
        if (parameterField) {            
            parameterField.setParametersVisible(!parametersVisible)
            setParametersVisible(parameterField.areParametersVisible())
        }
    }

    return (
        <Grid
            container
            spacing={1}
        >
            <Grid item>
                <IconButtonWithTooltip
                    style={{ backgroundColor: 'transparent' }}
                    onClick={handleExpandBlock}
                    title="Expand dataset block to see all dataset info" >
                    {parametersVisible ? <RemoveCircleIcon /> : <AddCircleIcon />}
                </IconButtonWithTooltip>
            </Grid>
        </Grid>
    )
}

export default class ExpandModelBlockField extends ReactInlineField {
    static KEY = "model_field_key"

    constructor(value: string) {
        super(value)
    }

    protected createContainer(): HTMLDivElement {
        const c = document.createElement("div")
        c.style.display = "inline-block"
        c.style.minWidth = "2rem"
        return c
    }

    static fromJson(options: ReactFieldJSON) {
        return new ExpandModelBlockField(options?.value)
    }

    getText_() {
        return ','
    }

    renderInlineField() {
        return <ExpandIconWidget />
    }
}
