import { View } from 'ui/core/view';
import { EventData, Observable } from 'data/observable';

export abstract class LanScan extends Observable {
	public lanScanner: any;
	
	public abstract start(): void;
	public abstract stop(): void;
	public abstract fetchSSIDInfo(): string;
	
	public static foundNewDeviceEvent: string = "foundNewDevice";
	public static foundNewAddressEvent: string = "foundNewAddress";
	public static scanningFinishedEvent: string = "scanningFinished";
	public static scanningFailedEvent: string = "scanningFailed";
	public static progressPingedEvent: string = "progressPinged";

	notifyFoundNewDeviceEvent(eventName: string, deviceInfo: DeviceInfo) {
		let args: FoundDeviceEventData = { eventName: eventName, object: this, deviceInfo: deviceInfo }
		this.notify(args);
	}

	notifyScanningFinishedEvent(eventName: string, status: Status) {
		let args: StatusEventData = { eventName: eventName, object: this, status: status }
		this.notify(args);
	}

	notifyScanningFailedEvent(eventName: string) {
		let args: EventData = { eventName: eventName, object: this}
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

export interface StatusEventData extends EventData {
	status: Status;
}

export class DeviceInfo {
	ipAddress: string;
	macAddress: string;
}

export interface FoundDeviceEventData extends EventData {
	deviceInfo: DeviceInfo;
}

export enum Status {
	LanScannerStatusFinished,
	LanScannerStatusCancelled
}

