# NativeScript LanScan

## What Is It?

A [NativeScript](https://www.nativescript.org) plugin that scans your local network for devices and returns their IP and Mac Address. It is a wrapper for the [MMLanScan](https://github.com/mavris/MMLanScan) iOS library.

A wrapper for [MMLanScan] iOS library as a plugin for  that allows you to scan your local network and pick up any attached devices. Check it out...

![Gif]

## Usage

Add the plugin to your NativeScript app

```
tns plugin add nativescript-lan-scan
```

Include the plugin in your application. You will need to include a few of the event classes as well if you are using TypeScript - just so TypeScript is happy. 

```
import { LanScan, FoundDeviceEventData, DeviceInfo, PingProgressEvent, PingProgress }

var lanScan = new LanScan();

// Wire up callback events from the Lan Scanner

// Fires whenever a devices is discovered
this._lanScan.on(LanScan.foundNewDeviceEvent, (args: FoundDeviceEventData) => {
    // Device info is found on the args.deviceInfo object...
    // args.deviceInfo.ipAddress
    // args.deviceInfo.macAddress
});

// Fires everytime an address on the subnet is pinged
this._lanScan.on(LanScan.progressPingedEvent, (args: PingProgressEventData) => {
    // args.pingProgress.overallHosts - total number hosts that the scanner will ping through
    // args.pingProgress.pingedHosts - current number of hosts that have been pinged
});

this._lanScan.on(LanScan.scanningFinishedEvent, (args) => {
    // Status: enum...
    // 0: Finished
    // 1: Stopped
});

// Start the Lan Scanner
lanScan.start();


// If, in the middle of the operation you want to stop the scan
lanScan.stop();

// 

```