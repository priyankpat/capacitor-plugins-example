import Foundation
import Capacitor

@objc(Plugin)
public class CapacitorPlugin: CAPPlugin {
    
    var bridgeRef: CAPBridge?
    var viewControllerRef: UIViewController?
    
    public override func load() {
        print("---------------------------")
        
        self.bridgeRef = self.bridge
        
        if self.bridge != nil {
            self.viewControllerRef = self.bridge.viewController
            print("--------------------------->")
        }
        
        if (self.viewControllerRef != nil) {
            print("<--------------------------->")
            if #available(iOS 11.0, *) {
                print("|---------------------------|")
                self.viewControllerRef?.setNeedsUpdateOfScreenEdgesDeferringSystemGestures()
            } else {
              // Earlier version of iOS
            }
        }
    }
    
    @objc func test(_ call: CAPPluginCall) {}
    
}
