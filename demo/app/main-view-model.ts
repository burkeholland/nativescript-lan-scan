import {Observable} from 'data/observable';
import { ObservableArray } from 'data/observable-array';
import { LanScan, FoundDeviceEventData, DeviceInfo, PingProgressEventData, PingProgress } from 'nativescript-lan-scan';

export class HelloWorldModel extends Observable {

    private _lanScan: LanScan;

    public devices: ObservableArray<DeviceInfo>;
    public status: string = "Scan Test";
    public max: number = 254;
    public progress: number = 0;

    constructor() {
        super();

        this._lanScan = new LanScan();

        this.devices = new ObservableArray([]);

        this._lanScan.on(LanScan.foundNewDeviceEvent, (args: FoundDeviceEventData) => {
            this.devices.push(args.deviceInfo);
        });

        this._lanScan.on(LanScan.progressPingedEvent, (args: PingProgressEventData) => {
            this.set('max', args.pingProgress.overallHosts);
            this.set('progress', args.pingProgress.pingedHosts);
        });

        this._lanScan.on(LanScan.scanningFinishedEvent, (args) => {
            this.set('status', 'Finished');
        });
    }

    onTap() {
        console.log('starting the lan scanner');
        this._lanScan.start();
        this.set('status', 'Scanning');
    }
}