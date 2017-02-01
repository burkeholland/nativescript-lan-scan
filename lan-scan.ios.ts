import { LanScan as LanScanCommon, Address, PingProgress } from './lan-scan.common';

declare var NSObject, MMLANScanner, MMLANScannerDelegate;

class LanScanDelegateImpl extends NSObject implements MMLANScannerDelegate {
    public static ObjCProtocols = [MMLANScannerDelegate];

    private _owner: WeakRef<LanScan>;

    public static initWithOwner(owner: WeakRef<LanScan>): LanScanDelegateImpl {
        let handler = <LanScanDelegateImpl>LanScanDelegateImpl.new();
        handler._owner = owner;
        return handler;
    }

    public lanScanDidFindNewDevice(device: any) {
        let owner = this._owner.get();
        if (owner) {
            owner.notifyFoundNewDeviceEvent(device);
        }
    }

    public lanScanDidFinishScanning(status: any) {
        let owner = this._owner.get();
        if (owner) {
            owner.notifyScanningFinishedEvent(status);
        }
    }

    public lanScanDidFailedToScan() {
        let owner = this._owner.get();
        if (owner) {
            owner.notifyScanningFailedEvent(LanScanCommon.scanningFailedEvent);
        }
    }

    public lanScanDidFindNewAddressWithIPMACAddressAndHostname(ip: string, macAddress:string, hostName: string) {
        let owner = this._owner.get();
        if (owner) {
            let address: Address = { ip, macAddress, hostName };
            owner.notifyFoundNewAddressEvent(LanScanCommon.foundNewAddressEvent, address);
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
    
    private _ios: any;
    
    constructor() {
        super();

        let delegate = LanScanDelegateImpl.initWithOwner(new WeakRef(this));
        this._ios = MMLANScanner.alloc().initWithDelegate(delegate);
    }

    start() {
        this._ios.start();
    }

    pingAddress() {
        this._ios.pingAddress();
    }

    pingResult(PingResult: any) {
        this.pingResult(PingResult);
    }
}