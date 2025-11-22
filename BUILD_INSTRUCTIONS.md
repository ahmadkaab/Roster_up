# Build Instructions for RosterUp (Android)

    eas build:configure
    ```

## Generating a Build

### Option A: Preview Build (APK)

Best for testing on your device immediately. This generates a `.apk` file you can install directly.

```bash
eas build -p android --profile preview
```

### Option B: Production Build (AAB)

Required for Google Play Store submission. This generates a `.aab` file.

```bash
eas build -p android --profile production
```

## Troubleshooting

- **Credentials**: EAS will ask to generate Keystore credentials. Select "Yes" to let EAS handle it automatically.
- **Updates**: If you make code changes, you need to rebuild or use `eas update` (if configured).
