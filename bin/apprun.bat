#!/bin/bash
 
cat << EOF
###########################################################
# Auto deploy for ionic app
###########################################################
 
EOF
 
if [ "$1" == "ios" ]; then
        if [ "$2" == "emulator" ]; then
# LIST emulators
# xcrun simctl list
# ios-sim showdevicetypes
# cordova run --list
#               ionic cordova run ios -lcs --address=0.0.0.0 --target="00C94350-0B1F-49EC-8FF4-367633D40ABC" --no-native-run --verbose
                ionic cordova run ios -lcs --address=0.0.0.0 --target="iPhone-XS, 13.3" --no-native-run
# iPhone-11, 13.3
        else
                ionic cordova run ios -lcs --address=0.0.0.0 --no-native-run
        fi
fi
 
if [ "$1" == "android" ]; then
        ionic cordova run android -lcs --address=0.0.0.0 --no-native-run
fi
 
if [ "$1" != "ios" ] && [ "$1" != "android" ]; then
        echo "Invalid platform"
fi