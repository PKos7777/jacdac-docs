import { Chip } from "@material-ui/core"
import React, { useContext } from "react"
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser"
import FileSystemContext from "../FileSystemContext"
import useChange from "../../jacdac/useChange"

export default function FileSystemChip() {
    const { fileSystem, showDirectoryPicker } = useContext(FileSystemContext)
    const root = useChange(fileSystem, _ => _?.root)
    const handleOpenDirectory = showDirectoryPicker
    const handleCloseDirectory = () => (fileSystem.root = undefined)

    if (!fileSystem) return null

    return (
        <Chip
            clickable
            avatar={<OpenInBrowserIcon />}
            label={root?.name || "open directory"}
            onClick={handleOpenDirectory}
            onDelete={root ? handleCloseDirectory : undefined}
        />
    )
}
