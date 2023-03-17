#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <RCTJPushModule.h>
#import "WXApi.h"

@interface AppDelegate : RCTAppDelegate<JPUSHGeofenceDelegate,JPUSHRegisterDelegate,WXApiDelegate>

@end
