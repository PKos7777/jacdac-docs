import React, { useContext } from "react"
import WorkspaceContext from "../WorkspaceContext"
import { ReactFieldJSON } from "./ReactField"
import ReactInlineField from "./ReactInlineField"
import useBlockData from "../useBlockData"
import type { VisualizationSpec } from "react-vega"
import VegaLiteWidget from "./VegaLiteWidget"
import { tidyResolveHeader } from "./tidy"

function ScatterPlotWidget() {
    const { sourceBlock } = useContext(WorkspaceContext)
    const { data } = useBlockData(sourceBlock)
    const x = tidyResolveHeader(data, sourceBlock?.getFieldValue("x"), "number")
    const y = tidyResolveHeader(data, sourceBlock?.getFieldValue("y"), "number")
    if (!x || !y) return null
    const spec: VisualizationSpec = {
        description: `Scatter plot of ${x}x${y}`,
        mark: "point",
        encoding: {
            x: { field: x, type: "quantitative" },
            y: { field: y, type: "quantitative" },
        },
        data: { name: "values" },
    }
    return <VegaLiteWidget spec={spec} />
}

export default class ScatterPlotField extends ReactInlineField {
    static KEY = "jacdac_field_scatter_plot"
    static EDITABLE = false

    static fromJson(options: ReactFieldJSON) {
        return new ScatterPlotField(options)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(options?: any) {
        super(options)
    }

    renderInlineField() {
        return <ScatterPlotWidget />
    }
}
