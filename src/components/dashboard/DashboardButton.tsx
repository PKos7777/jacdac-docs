import React, { useEffect, useMemo, useState } from "react"
import {
    ButtonEvent,
    ButtonReg,
    EVENT,
    SystemReg,
} from "../../../jacdac-ts/src/jdom/constants"
import ButtonServer from "../../../jacdac-ts/src/servers/buttonserver"
import { DashboardServiceProps } from "./DashboardServiceWidget"
import ButtonWidget from "../widgets/ButtonWidget"
import useServiceServer from "../hooks/useServiceServer"
import {
    useRegisterBoolValue,
    useRegisterUnpackedValue,
} from "../../jacdac/useRegisterValue"
import SvgWidget from "../widgets/SvgWidget"
import useSvgButtonProps from "../hooks/useSvgButtonProps"
import useWidgetTheme from "../widgets/useWidgetTheme"
import { describeArc } from "../widgets/svgutils"
import useAnimationFrame from "../hooks/useAnimationFrame"
import useRegister from "../hooks/useRegister"
import useEvent from "../hooks/useEvent"
import { roundWithPrecision } from "../../../jacdac-ts/src/jdom/utils"
import OptionalTooltip from "../widgets/OptionalTooltip"

export default function DashboardButton(props: DashboardServiceProps) {
    const { service } = props
    const [pressed, setPressed] = useState<boolean>(false)
    const analogRegister = useRegister(service, ButtonReg.Analog)
    const analog = useRegisterBoolValue(analogRegister)
    // don't track reading, use events only
    const downEvent = useEvent(service, ButtonEvent.Down)
    const upEvent = useEvent(service, ButtonEvent.Up)
    useEffect(
        () => downEvent.subscribe(EVENT, () => setPressed(true)),
        [downEvent]
    )
    useEffect(
        () => upEvent.subscribe(EVENT, () => setPressed(false)),
        [upEvent]
    )

    if (!analog) return <BinaryButton {...props} pressed={pressed} />
    else return <AnalogButton {...props} pressed={pressed} />
}

function BinaryButton(props: { pressed: boolean } & DashboardServiceProps) {
    const { service, pressed } = props

    const server = useServiceServer<ButtonServer>(service)
    const color = server ? "secondary" : "primary"
    const label = `button ${pressed ? `down` : `up`}`
    const handleDown = () => server?.down()
    const handleUp = () => server?.up()
    const widgetSize = `clamp(3rem, 10vw, 10vh)`

    return (
        <OptionalTooltip
            title={!server ? "Use the physical button!" : undefined}
        >
            <ButtonWidget
                checked={!!pressed}
                color={color}
                onDown={server ? handleDown : undefined}
                onUp={server ? handleUp : undefined}
                label={label}
                size={widgetSize}
            />
        </OptionalTooltip>
    )
}

const ACTIVE_SPEED = 0.05
const INACTIVE_SPEED = 0.1
const LABEL_PRECISION = 2

function AnalogButton(props: { pressed: boolean } & DashboardServiceProps) {
    const { service, pressed, visible } = props
    const { mixins } = service
    const pressureRegister = useRegister(service, ButtonReg.Pressure)
    const [pressure] = useRegisterUnpackedValue<[number]>(pressureRegister, {
        visible,
    })
    // find threshold if any
    const thresholdRegister = useMemo(
        () =>
            mixins
                .find(cfg => !!cfg.register(SystemReg.ActiveThreshold))
                ?.register(SystemReg.ActiveThreshold),
        [service]
    )
    const [threshold] = useRegisterUnpackedValue(thresholdRegister, { visible })

    const widgetSize = `clamp(3rem, 10vw, 10vh)`
    const server = useServiceServer<ButtonServer>(service)
    const color = server ? "secondary" : "primary"
    const label = `button pressure ${roundWithPrecision(
        pressure,
        LABEL_PRECISION
    )}`
    const { background, controlBackground, active } = useWidgetTheme(color)
    const [down, setDown] = useState(false)
    const handleDown = () => {
        setDown(true)
    }
    const handleUp = () => {
        setDown(false)
    }
    const buttonProps = useSvgButtonProps<SVGCircleElement>(
        label,
        server && handleDown,
        server && handleUp
    )

    useAnimationFrame(() => {
        if (!server) return false
        const [p] = server.reading.values()
        let keepAnimating = true
        if (down) {
            if (p > 1 - ACTIVE_SPEED) {
                server.reading.setValues([1])
                keepAnimating = false
            } else server.reading.setValues([p + ACTIVE_SPEED])
        } else {
            if (p < INACTIVE_SPEED) {
                server.reading.setValues([0])
                keepAnimating = false
            } else server.reading.setValues([p - INACTIVE_SPEED])
        }
        server.reading.sendGetAsync() // refresh ui
        return keepAnimating
    }, [down])

    const w = 64
    const mo = pressed ? 3 : 5
    const r = w / 2
    const cx = r
    const cy = r
    const rp = r - mo
    const ri = rp - mo
    const ps = mo

    const range = 360

    /*
        {buttonVariant === AnalogButtonVariant.Capacitive && <path transform={`translate(20,20)`} aria-hidden={true}
            pointerEvents="none"
            style={{ userSelect: "none" }}
            fill={background}
            d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"></path>}
            */

    return (
        <SvgWidget width={w} size={widgetSize}>
            <rect
                x={0}
                y={0}
                rx={2}
                ry={2}
                width={w}
                height={w}
                fill={background}
            />
            {pressure && (
                <path
                    d={describeArc(cx, cy, rp, 0, pressure * range)}
                    stroke={active}
                    strokeLinecap={"round"}
                    strokeWidth={ps}
                />
            )}
            {threshold !== undefined && (
                <circle
                    cx={cx}
                    cy={mo}
                    r={mo / 3}
                    aria-label={`active threshold ${roundWithPrecision(
                        threshold,
                        LABEL_PRECISION
                    )}`}
                    fill={controlBackground}
                    transform={`rotate(${range * threshold}, ${cx}, ${cy})`}
                />
            )}
            <circle
                cx={cx}
                cy={cy}
                r={ri}
                fill={pressed ? active : controlBackground}
                {...buttonProps}
            />
        </SvgWidget>
    )
}
