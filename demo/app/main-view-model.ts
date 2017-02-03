import {Observable} from 'data/observable';
import { ObservableArray } from 'data/observable-array';
import { LanScan, FoundDeviceEventData, DeviceInfo } from 'nativescript-lan-scan';

export class HelloWorldModel extends Observable {

    private _lanScan: LanScan;

    public devices: ObservableArray<DeviceInfo>;

    constructor() {
        super();

        this._lanScan = new LanScan();

        this.devices = new ObservableArray([]);

        this._lanScan.on(LanScan.foundNewDeviceEvent, (args: FoundDeviceEventData) => {
            this.devices.push(args.deviceInfo);
        });
    }

    onTap() {
        console.log('starting the lan scanner');
        this._lanScan.start();
    }
}