import { LanScan as LanScanCommon, Address, PingProgress, DeviceInfo, Status } from './lan-scan.common';

declare var LANProperties;

class LanScanDelegateImpl extends NSObject implements MMLANScannerDelegate {
    public static ObjCProtocols = [MMLANScannerDelegate];

    public _owner: WeakRef<LanScan>;

    public static initWithOwner(owner: WeakRef<LanScan>): LanScanDelegateImpl {
        let handler = <LanScanDelegateImpl>LanScanDelegateImpl.new();
        handler._owner = owner;
        return handler;
    }

    public lanScanDidFindNewDevice(device: any) {
        let owner = this._owner.get();
        if (owner) {

            let deviceInfo: DeviceInfo = {
                ipAddress: device.ipAddress,
                macAddress: device.macAddress,
            }

            owner.notifyFoundNewDeviceEvent(LanScan.foundNewDeviceEvent, deviceInfo);
        }
    }

    public lanScanDidFinishScanningWithStatus(status: Status) {
        console.log('LanScanner Finished Scanning');
        let owner = this._owner.get();
        if (owner) {
            owner.notifyScanningFinishedEvent(LanScan.scanningFinishedEvent, status);
        }
    }

    public lanScanDidFailedToScan() {
        console.log('Lan Scanner Failed');
        let owner = this._owner.get();
        if (owner) {
            owner.notifyScanningFailedEvent(LanScanCommon.scanningFailedEvent);
        }
    }

    public lanScanProgressPingedFrom(pingedHosts: number, overallHosts: number) {
        let owner = this._owner.get();
        if (owner) {
            let pingProgress: PingProgress = { pingedHosts, overallHosts };
            owner.notifyProgressPingedEvent(LanScanCommon.progressPingedEvent, pingProgress);
        }
    }
}

export class LanScan extends LanScanCommon {
    
    private _ios: MMLANScanner;
    private _delegate: NSObject;
    
    constructor() {
        super();
        
        this._delegate = LanScanDelegateImpl.initWithOwner(new WeakRef(this));
        this._ios = MMLANScanner.alloc().initWithDelegate(this._delegate);
        this._ios.delegate = this._delegate;
    }

    get ios(): MMLANScanner {
        return this._ios;
    }

    start() {
        console.log('LanScanner Beginning Scan');
        this._ios.start();
    }

    stop() {
        console.log('LanScanner Was Stopped');
        this._ios.stop();
    }

    fetchSSIDInfo(): string {
        return LANProperties.fetchSSIDInfo();
    }
}