#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(Plugin, "Plugin",
           CAP_PLUGIN_METHOD(test, CAPPluginReturnPromise);
)
