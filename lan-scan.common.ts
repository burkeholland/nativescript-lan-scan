import { View } from 'ui/core/view';
import { EventData } from 'data/observable';
import { NativeScriptLanScan } from ".";

export abstract class LanScan extends View {
	public lanScanner: any;
	public abstract start(): void;
	public abstract pingAddress(): void;
	
	public static foundNewDeviceEvent: string = "foundNewDevice";
	public static foundNewAddressEvent: string = "foundNewAddress";
	public static scanningFinishedEvent: string = "scanningFinished";
	public static scanningFailedEvent: string = "scanningFailed";
	public static progressPingedEvent: string = "progressPinged";

	notifyFoundNewDeviceEvent(device: any) {
		this.notify(device);
	}

	notifyScanningFinishedEvent(status: any) {
		this.notify(status);
	}

	notifyScanningFailedEvent(eventName: string) {
		let args: EventData = { eventName: eventName, object: this}
		this.notify(args);
	}

	notifyFoundNewAddressEvent(eventName: string, address: Address) {
		let args: AddressEventData = { eventName: eventName, object: this, address: address }
		this.notify(args);
	}

	notifyProgressPingedEvent(eventName: string, pingProgress: PingProgress) {
		let args: PingProgressEventData = { eventName: eventName, object: this, pingProgress: pingProgress }
		this.notify(args);
	}
}

export class Address {
    ip: string;
    macAddress: string;
    hostName: string;
}

export interface AddressEventData extends EventData {
	address: Address;
}

export class PingProgress {
	pingedHosts: number;
	overallHosts: number;
}

export interface PingProgressEventData extends EventData {
	pingProgress: PingProgress
}

