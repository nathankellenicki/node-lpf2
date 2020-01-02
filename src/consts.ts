/**
 * @typedef Color
 * @property {number} BLACK 0
 * @property {number} PINK 1
 * @property {number} PURPLE 2
 * @property {number} BLUE 3
 * @property {number} LIGHT_BLUE 4
 * @property {number} CYAN 5
 * @property {number} GREEN 6
 * @property {number} YELLOW 7
 * @property {number} ORANGE 8
 * @property {number} RED 9
 * @property {number} WHITE 10
 * @property {number} NONE 255
 */
export enum Color {
    BLACK = 0,
    PINK = 1,
    PURPLE = 2,
    BLUE = 3,
    LIGHT_BLUE = 4,
    CYAN = 5,
    GREEN = 6,
    YELLOW = 7,
    ORANGE = 8,
    RED = 9,
    WHITE = 10,
    NONE = 255
}


// tslint:disable-next-line
export const ColorNames = Color;


/**
 * @typedef ButtonState
 * @property {number} PRESSED 0
 * @property {number} RELEASED 1
 * @property {number} UP 2
 * @property {number} DOWN 3
 * @property {number} STOP 4
 */
export enum ButtonState {
    PRESSED = 0,
    RELEASED = 1,
    UP = 2,
    DOWN = 3,
    STOP = 4
}


/**
 * @typedef DuploTrainBaseSound
 * @property {number} BRAKE 3
 * @property {number} STATION_DEPARTURE 5
 * @property {number} WATER_REFILL 7
 * @property {number} HORN 9
 * @property {number} STEAM 10
 */
export enum DuploTrainBaseSound {
    BRAKE = 3,
    STATION_DEPARTURE = 5,
    WATER_REFILL = 7,
    HORN = 9,
    STEAM = 10
}


export enum BLEManufacturerData {
    DUPLO_TRAIN_BASE_ID = 32,
    MOVE_HUB_ID = 64,
    HUB_ID = 65,
    REMOTE_CONTROL_ID = 66,
    TECHNIC_MEDIUM_HUB = 128
}


export enum BLEService {
    WEDO2_SMART_HUB = "00001523-1212-efde-1523-785feabcd123",
    WEDO2_SMART_HUB_2 = "00004f0e-1212-efde-1523-785feabcd123",
    WEDO2_SMART_HUB_3 = "2a19",
    WEDO2_SMART_HUB_4 = "180f",
    WEDO2_SMART_HUB_5 = "180a",
    LPF2_HUB = "00001623-1212-efde-1623-785feabcd123"
}


export enum BLECharacteristic {
    WEDO2_BATTERY = "2a19",
    WEDO2_FIRMWARE_REVISION = "2a26",
    WEDO2_BUTTON = "00001526-1212-efde-1523-785feabcd123", // "1526"
    WEDO2_PORT_TYPE = "00001527-1212-efde-1523-785feabcd123", // "1527" // Handles plugging and unplugging of devices on WeDo 2.0 Smart Hub
    WEDO2_LOW_VOLTAGE_ALERT = "00001528-1212-efde-1523-785feabcd123", // "1528"
    WEDO2_HIGH_CURRENT_ALERT = "00001529-1212-efde-1523-785feabcd123", // "1529"
    WEDO2_LOW_SIGNAL_ALERT = "0000152a-1212-efde-1523-785feabcd123", // "152a",
    WEDO2_DISCONNECT = "0000152b-1212-efde-1523-785feabcd123", // "152b"
    WEDO2_SENSOR_VALUE = "00001560-1212-efde-1523-785feabcd123", // "1560"
    WEDO2_VALUE_FORMAT = "00001561-1212-efde-1523-785feabcd123", // "1561"
    WEDO2_PORT_TYPE_WRITE = "00001563-1212-efde-1523-785feabcd123", // "1563"
    WEDO2_MOTOR_VALUE_WRITE = "00001565-1212-efde-1523-785feabcd123", // "1565"
    WEDO2_NAME_ID = "00001524-1212-efde-1523-785feabcd123", // "1524"
    LPF2_ALL = "00001624-1212-efde-1623-785feabcd123"
}

export enum ValueType {
    UInt8 = "UInt8",
    Int8 = "Int8",
    UInt16 = "UInt16",
    Int16 = "Int16",
    UInt32 = "UInt32",
    Int32 = "Int32",
    Float = "Float"
}

// tslint:disable-next-line
export const ValueBits = {
    [ValueType.UInt8]: 1,
    [ValueType.Int8]: 1,
    [ValueType.UInt16]: 2,
    [ValueType.Int16]: 2,
    [ValueType.UInt32]: 4,
    [ValueType.Int32]: 4,
    [ValueType.Float]: 4
};
