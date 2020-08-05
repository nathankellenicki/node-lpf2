import { BasicMotor, modes as BasicMotorModes } from "./basicmotor";

import { IDeviceInterface, IMode, IEventData } from "../interfaces";

import * as Consts from "../consts";
import { mapSpeed } from "../utils";

export const modes: IMode[] = BasicMotorModes.concat([
    // POWER
    {
        name: "speed", // SPEED
        input: true,
        output: true,
        raw: { min: -100, max: 100 },
        pct: { min: -100, max: 100 },
        si: { min: -100, max: 100, symbol: "PCT" },
        values: { count: 1, type: Consts.ValueType.Int8 }
    },
    {
        name: "rotate", // POS
        input: true,
        output: true,
        weDo2SmartHub: true,
        raw: { min: -360, max: 360 },
        pct: { min: -100, max: 100 },
        si: { min: -360, max: 360, symbol: "DEG" },
        values: { count: 1, type: Consts.ValueType.Int32 }
    },
])

/**
 * @class TachoMotor
 * @extends BasicMotor
 */
export class TachoMotor extends BasicMotor {

    protected _brakeStyle: Consts.BrakingStyle = Consts.BrakingStyle.BRAKE;
    protected _maxPower: number = 100;
    public useAccelerationProfile: boolean = true;
    public useDecelerationProfile: boolean = true;

    constructor (hub: IDeviceInterface, portId: number, _modes: IMode[] = [], type: Consts.DeviceType = Consts.DeviceType.UNKNOWN) {
        super(hub, portId, _modes.length > 0 ? _modes : modes, type);

        this._eventHandlers.rotate = (data: IEventData) => {
            const [degrees] = data.raw;
            /**
             * Emits when a rotation sensor is activated.
             * @event TachoMotor#rotate
             * @type {object}
             * @param {number} rotation
             */
            this.notify("rotate", { degrees });
        };
    }

    /**
     * Set the braking style of the motor.
     *
     * Note: This applies to setSpeed, rotateByDegrees, and gotoAngle.
     * @method TachoMotor#setBrakingStyle
     * @param {number} style Either BRAKE or HOLD
     */
    public setBrakingStyle (style: Consts.BrakingStyle) {
        this._brakeStyle = style;
    }


    /**
     * Set the max power of the motor.
     *
     * Note: This applies to setSpeed, rotateByDegrees, and gotoAngle.
     * @method TachoMotor#setMaxPower
     * @param {number} style Either BRAKE or HOLD
     */
    public setMaxPower (maxPower: number) {
        this._maxPower = maxPower;
    }


    /**
     * Set the global acceleration time
     * @method TachoMotor#setAccelerationTime
     * @param {number} time How long acceleration should last (in milliseconds).
     * @returns {Promise} Resolved upon successful completion of command (ie. once the motor is finished).
     */
    public setAccelerationTime (time: number, profile: number = 0x00) {
        const message = Buffer.from([0x81, this.portId, 0x11, 0x05, 0x00, 0x00, profile]);
        message.writeUInt16LE(time, 4);
        this.send(message);
    }


    /**
     * Set the global deceleration time
     * @method TachoMotor#setDecelerationTime
     * @param {number} time How long deceleration should last (in milliseconds).
     * @returns {Promise} Resolved upon successful completion of command (ie. once the motor is finished).
     */
    public setDecelerationTime (time: number, profile: number = 0x00) {
        const message = Buffer.from([0x81, this.portId, 0x11, 0x06, 0x00, 0x00, profile]);
        message.writeUInt16LE(time, 4);
        this.send(message);
    }


    /**
     * Set the motor speed.
     * @method TachoMotor#setSpeed
     * @param {number} speed For forward, a value between 1 - 100 should be set. For reverse, a value between -1 to -100. Stop is 0.
     * @param {number} time How long the motor should run for (in milliseconds).
     * @returns {Promise} Resolved upon successful issuance of the command.
     */
    public setSpeed (speed: [number, number] | number, time: number | undefined) {
        if (!this.isVirtualPort && speed instanceof Array) {
            throw new Error("Only virtual ports can accept multiple speeds");
        }
        if (this.isWeDo2SmartHub) {
            throw new Error("Motor speed is not available on the WeDo 2.0 Smart Hub");
        }
        this.cancelEventTimer();
        return new Promise((resolve) => {
            this._busy = true;
            if (speed === undefined || speed === null) {
                speed = 100;
            }
            let message;
            if (time !== undefined) {
                if (speed instanceof Array) {
                    message = Buffer.from([0x81, this.portId, 0x11, 0x0a, 0x00, 0x00, mapSpeed(speed[0]), mapSpeed(speed[1]), this._maxPower, this._brakeStyle, this.useProfile()]);
                } else {
                    message = Buffer.from([0x81, this.portId, 0x11, 0x09, 0x00, 0x00, mapSpeed(speed), this._maxPower, this._brakeStyle, this.useProfile()]);
                }
                message.writeUInt16LE(time, 4);
            } else {
                if (speed instanceof Array) {
                    message = Buffer.from([0x81, this.portId, 0x11, 0x08, mapSpeed(speed[0]), mapSpeed(speed[1]), this._maxPower, this.useProfile()]);
                } else {
                    message = Buffer.from([0x81, this.portId, 0x11, 0x07, mapSpeed(speed), this._maxPower, this.useProfile()]);
                }
            }
            this.send(message);
            this._finished = () => {
                return resolve();
            };
        });
    }

    /**
     * Rotate a motor by a given amount of degrees.
     * @method TachoMotor#rotateByDegrees
     * @param {number} degrees How much the motor should be rotated (in degrees).
     * @param {number} [speed=100] For forward, a value between 1 - 100 should be set. For reverse, a value between -1 to -100.
     * @returns {Promise} Resolved upon successful completion of command (ie. once the motor is finished).
     */
    public rotateByDegrees (degrees: number, speed: [number, number] | number) {
        if (!this.isVirtualPort && speed instanceof Array) {
            throw new Error("Only virtual ports can accept multiple speeds");
        }
        if (this.isWeDo2SmartHub) {
            throw new Error("Rotation is not available on the WeDo 2.0 Smart Hub");
        }
        this.cancelEventTimer();
        return new Promise((resolve) => {
            this._busy = true;
            if (speed === undefined || speed === null) {
                speed = 100;
            }
            let message;
            if (speed instanceof Array) {
                message = Buffer.from([0x81, this.portId, 0x11, 0x0c, 0x00, 0x00, 0x00, 0x00, mapSpeed(speed[0]), mapSpeed(speed[1]), this._maxPower, this._brakeStyle, this.useProfile()]);
            } else {
                message = Buffer.from([0x81, this.portId, 0x11, 0x0b, 0x00, 0x00, 0x00, 0x00, mapSpeed(speed), this._maxPower, this._brakeStyle, this.useProfile()]);
            }
            message.writeUInt32LE(degrees, 4);
            this.send(message);
            this._finished = () => {
                return resolve();
            };
        });
    }


    protected useProfile () {
        let value = 0x00;
        if (this.useAccelerationProfile) {
            value += 0x01;
        }
        if (this.useDecelerationProfile) {
            value += 0x02;
        }
        return value;
    }


}
