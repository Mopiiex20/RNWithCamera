if Error: spawnSync ./gradlew EACCES
run: 
chmod 755 android/gradlew

if react native debug.keystore not found
You can generate the debug keystore by running this command in the android/app/ directory: keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000