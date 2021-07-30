const ROOM_DIM = 2

export default async function loadResonanceAudio(
    ctx: AudioContext,
    globalVolume: AudioNode
) {
    if (typeof window === "undefined")
        return (
            node: AudioNode,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            position?: { dx: number; dy: number; dz: number }
        ) => {
            node.connect(globalVolume)
        }

    const { ResonanceAudio } = await import("resonance-audio")
    const resonance = new ResonanceAudio(ctx)
    const roomDimension = {
        width: ROOM_DIM,
        heigth: ROOM_DIM,
        depth: ROOM_DIM,
    }
    const roomMaterials = {
        left: "grass",
        right: "grass",
        up: "grass",
        down: "grass",
        back: "grass",
        front: "grass",
    }
    resonance.roomDimensions(roomDimension, roomMaterials)
    resonance.output.connect(globalVolume)

    console.debug(`resonance initialized`, resonance)

    return (
        node: AudioNode,
        position?: { dx: number; dy: number; dz: number }
    ) => {
        // volume -> resonance
        const resonanceSource = resonance.createSource()
        resonanceSource.setPosition(
            position?.dx || 0,
            position?.dy || 0,
            position?.dz || 0
        )
        node.connect(resonanceSource.input)
    }
}
