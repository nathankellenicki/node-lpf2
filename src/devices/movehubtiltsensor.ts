import { Device, DeviceVersion } from "./generic/device";

import { IDeviceInterface } from "../interfaces";

import * as Consts from "../consts";

export class MoveHubTiltSensor extends Device {
    protected static _type = 40;

    constructor (hub: IDeviceInterface, portId: number, versions: DeviceVersion) {
        super(hub, portId, versions, MoveHubTiltSensor.ModeMap);
    }

    public receive (message: Buffer) {
        const mode = this._mode;

        switch (mode) {
            case MoveHubTiltSensor.Mode.TILT:
                /**
                 * Emits when a tilt sensor is activated.
                 * @event MoveHubTiltSensor#tilt
                 * @param {number} x
                 * @param {number} y
                 */
                const tiltX = message.readInt8(4);
                const tiltY = message.readInt8(5);
                this.emitGlobal("tilt", -tiltX, tiltY);
                break;
        }
    }

}

export namespace MoveHubTiltSensor {

    export enum Mode {
        TILT = 0x00
    }

    export const ModeMap: {[event: string]: number} = {
        "tilt": MoveHubTiltSensor.Mode.TILT
    }

}