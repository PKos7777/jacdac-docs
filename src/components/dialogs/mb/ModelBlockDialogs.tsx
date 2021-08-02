import React, { useEffect, useContext, useState, lazy } from "react"

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

import Blockly, {
    BlockSvg,
    FieldVariable,
    Variables,
    WorkspaceSvg,
} from "blockly"
import {
    MODEL_BLOCKS,
    MB_CLASS_VAR_TYPE,
    MB_DATASET_VAR_TYPE,
    MB_CLASSIFIER_VAR_TYPE,
} from "../../model-editor/modelblockdsl"

import FieldDataSet from "../../FieldDataSet"
import MBModel from "../../model-editor/MBModel"
import ModelDataSet from "../../model-editor/ModelDataSet"
import Suspense from "../../ui/Suspense"
import useChartPalette from "../../useChartPalette"

const RecordDataDialog = lazy(() => import("./RecordDataDialog"))

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: theme.spacing(1),
        },
        grow: {
            flexGrow: 1,
        },
        field: {
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1.5),
        },
        segment: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        row: {
            marginBottom: theme.spacing(0.5),
        },
        buttons: {
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
        trend: {
            width: theme.spacing(10),
        },
        vmiddle: {
            verticalAlign: "middle",
        },
    })
)

// handling dialogs within Blockly
export function addNewDataSet(workspace) {
    // prompt user for dataset name
    Blockly.prompt("Enter new dataset name:", "", newDataSetName => {
        // check if name is already used
        if (newDataSetName != null && newDataSetName != undefined) {
            if (
                newDataSetName != "" &&
                !Variables.nameUsedWithAnyType(newDataSetName, workspace)
            ) {
                // get or create new dataset typed variable
                const newDataSetVar = workspace.createVariable(
                    newDataSetName,
                    MB_DATASET_VAR_TYPE
                )

                // create new dataset block on the workspace
                const newDataSetBlock = workspace.newBlock(
                    MODEL_BLOCKS + "dataset"
                ) as BlockSvg

                // automatically insert the variable name into the new block
                const field = newDataSetBlock.getField(
                    "DATASET_NAME"
                ) as FieldVariable
                field.setValue(newDataSetVar.getId())

                // add new block to the screen
                newDataSetBlock.initSvg()
                newDataSetBlock.render(false)
                workspace.centerOnBlock(newDataSetBlock.id)
            } else {
                setTimeout(
                    () =>
                        Blockly.alert(
                            "That variable name is invalid or already exists"
                        ),
                    10
                )
            }
        }
    })
}

// Randi TODO is this too redundant with creating a dataset?
export function addNewClassifier(workspace) {
    // prompt user for variable name
    Blockly.prompt(`Enter new classifier name:`, ``, newVariableName => {
        // check if name is already used
        if (newVariableName != null && newVariableName != undefined) {
            if (
                newVariableName != "" &&
                !Variables.nameUsedWithAnyType(newVariableName, workspace)
            ) {
                // get or creat new dataset typed variable
                const newVariable = workspace.createVariable(
                    newVariableName,
                    MB_CLASSIFIER_VAR_TYPE
                )

                // create new dataset block on the workspace
                const newBlock = workspace.newBlock(
                    MODEL_BLOCKS + "knn"
                ) as BlockSvg

                // automatically insert the variable name into the new block
                const field = newBlock.getField(
                    "CLASSIFIER_NAME"
                ) as FieldVariable
                field.setValue(newVariable.getId())

                // add new block to the screen
                newBlock.initSvg()
                newBlock.render(false)
                workspace.centerOnBlock(newBlock.id)
            } else {
                setTimeout(
                    () =>
                        Blockly.alert(
                            "That variable name is invalid or already exists"
                        ),
                    10
                )
            }
        }
    })
}

export default function ModelBlockDialogs(props: {
    onRecordingDone: (recording: FieldDataSet[], blockId: string) => void
    onTrainingDone: (
        model: MBModel,
        modelName: string,
        dataset: ModelDataSet,
        datasetName: string
    ) => void
    recordingCount: number
    workspace: WorkspaceSvg
}) {
    const { onRecordingDone, onTrainingDone, recordingCount, workspace } = props
    const [recordDataDialogVisible, setRecordDataDialogVisible] =
        useState<boolean>(false)
    const [trainModelDialogVisible, setTrainModelDialogVisible] =
        useState<boolean>(false)

    const classes = useStyles()
    const chartPalette = useChartPalette()

    return (
        <>
            {" "}
            {recordDataDialogVisible && (
                <Suspense>
                    <RecordDataDialog
                        classes={classes}
                        chartPalette={chartPalette}
                        open={recordDataDialogVisible}
                        onDone={onRecordingDone}
                        onClose={toggleRecordDataDialog}
                        recordingCount={recordingCount}
                        workspace={workspace}
                    />
                </Suspense>
            )}
            {/*trainModelDialogVisible && <Suspense></Suspense>*/}
        </>
    )
}
