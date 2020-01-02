import { Peripheral } from "@abandonware/noble";
import compareVersion from "compare-versions";

import { IBLEAbstraction } from "../interfaces";

import { LPF2Hub } from "./generic/lpf2hub";

import * as Consts from "../consts";

import Debug = require("debug");
const debug = Debug("movehub");


/**
 * The MoveHub is emitted if the discovered device is a Move Hub.
 * @class MoveHub
 * @extends LPF2Hub
 * @extends BaseHub
 */
export class MoveHub extends LPF2Hub {

    public static IsMoveHub (peripheral: Peripheral) {
        return (
            peripheral.advertisement &&
            peripheral.advertisement.serviceUuids &&
            peripheral.advertisement.serviceUuids.indexOf(Consts.BLEService.LPF2_HUB.replace(/-/g, "")) >= 0 &&
            peripheral.advertisement.manufacturerData &&
            peripheral.advertisement.manufacturerData.length > 3 &&
            peripheral.advertisement.manufacturerData[3] === Consts.BLEManufacturerData.MOVE_HUB_ID
        );
    }

    protected static _type: number = 2;
    protected static _typeName: string = "MOVE_HUB";
    protected static _portMap: {[portName: string]: number} = {
        "A": 0,
        "B": 1,
        "C": 2,
        "D": 3,
        "HUB_LED": 50,
        "TILT_SENSOR": 58,
        "CURRENT_SENSOR": 59,
        "VOLTAGE_SENSOR": 60
    };

    constructor (device: IBLEAbstraction) {
        super(device);
        debug("Discovered Move Hub");
    }


    public connect () {
        return new Promise(async (resolve, reject) => {
            debug("Connecting to Move Hub");
            await super.connect();
            debug("Connect completed");
            return resolve();
        });
    }


    protected _checkFirmware (version: string) {
        if (compareVersion("2.0.00.0017", version) === 1) {
            throw new Error(`Your Move Hub"s (${this.name}) firmware is out of date and unsupported by this library. Please update it via the official Powered Up app.`);
        }
    }


}
