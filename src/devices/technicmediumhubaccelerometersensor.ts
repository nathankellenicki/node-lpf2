import { Device, DeviceVersion } from "./generic/device";

import { IDeviceInterface } from "../interfaces";

import * as Consts from "../consts";

export class TechnicMediumHubAccelerometerSensor extends Device {
    protected static _type = 57;

    constructor (hub: IDeviceInterface, portId: number, versions: DeviceVersion) {
        super(hub, portId, versions, TechnicMediumHubAccelerometerSensor.ModeMap);
    }

    public receive (message: Buffer) {
        const mode = this._mode;

        switch (mode) {
            case TechnicMediumHubAccelerometerSensor.Mode.ACCEL:
                /**
                 * Emits when accelerometer detects movement. Measured in mG.
                 * @event LPF2Hub#accel
                 * @param {string} port
                 * @param {number} x
                 * @param {number} y
                 * @param {number} z
                 */
                const accelX = Math.round(message.readInt16LE(4) / 4.096);
                const accelY = Math.round(message.readInt16LE(6) / 4.096);
                const accelZ = Math.round(message.readInt16LE(8) / 4.096);
                this.emitGlobal("accel", accelX, accelY, accelZ);
                break;
        }
    }

}

export namespace TechnicMediumHubAccelerometerSensor {

    export enum Mode {
        ACCEL = 0x00
    }

    export const ModeMap: {[event: string]: number} = {
        "accel": TechnicMediumHubAccelerometerSensor.Mode.ACCEL
    }

}