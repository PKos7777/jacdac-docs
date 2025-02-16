import { useTheme } from "@material-ui/core"
import React, { useContext, useEffect, useState } from "react"
import { VM_LOG_ENTRY } from "../../../../jacdac-ts/src/vm/events"
import WorkspaceContext from "../WorkspaceContext"

export default function LogViewWidget() {
    const { runner } = useContext(WorkspaceContext)
    const theme = useTheme()
    const [logs, setLogs] = useState<{ text: string; count: number }[]>([])

    useEffect(() => {
        setLogs([])
        runner?.subscribe(VM_LOG_ENTRY, () => {
            setLogs(runner?.logData || [])
        })
    }, [runner])

    return (
        <pre
            style={{
                padding: "0",
                marginBottom: "0",
                background: "none",
                color: theme.palette.text.primary,
                maxHeight: "80vh",
                overflowY: "auto",
            }}
        >
            {logs
                .slice(-20)
                .map(l => `${l.count > 1 ? `${l.count}: ` : ""}${l.text}`)
                .join("\n")}
        </pre>
    )
}
