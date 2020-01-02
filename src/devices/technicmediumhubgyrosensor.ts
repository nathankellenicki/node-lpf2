import { Device, DeviceVersion } from "./generic/device";

import { IDeviceInterface } from "../interfaces";

export class TechnicMediumHubGyroSensor extends Device {
    protected static _type = 58;

    constructor (hub: IDeviceInterface, portId: number, versions: DeviceVersion) {
        super(hub, portId, versions, TechnicMediumHubGyroSensor.ModeMap);
    }

    public receive (message: Buffer) {
        const mode = this._mode;

        switch (mode) {
            case TechnicMediumHubGyroSensor.Mode.GYRO:
                /**
                 * Emits when gyroscope detects movement. Measured in DPS - degrees per second.
                 * @event TechnicMediumHubGyroSensor#gyro
                 * @param {number} x
                 * @param {number} y
                 * @param {number} z
                 */
                const gyroX = Math.round(message.readInt16LE(4) * 7 / 400);
                const gyroY = Math.round(message.readInt16LE(6) * 7 / 400);
                const gyroZ = Math.round(message.readInt16LE(8) * 7 / 400);
                this.emitGlobal("gyro", gyroX, gyroY, -gyroZ);
                break;
        }
    }

}

export namespace TechnicMediumHubGyroSensor {

    export enum Mode {
        GYRO = 0x00
    }

    export const ModeMap: {[event: string]: number} = {
        "gyro": TechnicMediumHubGyroSensor.Mode.GYRO
    }

}