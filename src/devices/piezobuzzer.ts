import { Device, DeviceVersion } from "./generic/device";

import { IDeviceInterface } from "../interfaces";

import * as Consts from "../consts";

export class PiezoBuzzer extends Device {
    protected static _type = 22;


    constructor (hub: IDeviceInterface, portId: number, versions: DeviceVersion) {
        super(hub, portId, versions);
    }


    /**
     * Play a tone on the Hub"s in-built buzzer
     * @method PiezoBuzzer#playTone
     * @param {number} frequency
     * @param {number} time How long the tone should play for (in milliseconds).
     * @returns {Promise} Resolved upon successful completion of command (ie. once the tone has finished playing).
     */
    public playTone (frequency: number, time: number) {
        return new Promise((resolve) => {
            const data = Buffer.from([0x05, 0x02, 0x04, 0x00, 0x00, 0x00, 0x00]);
            data.writeUInt16LE(frequency, 3);
            data.writeUInt16LE(time, 5);
            this.send(data, Consts.BLECharacteristic.WEDO2_MOTOR_VALUE_WRITE);
            global.setTimeout(resolve, time);
        });
    }


}
