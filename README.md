# ts-debug-helpers

Add this to the first cell in VS Code's debug watch window:

```ts
globalThis.__loaded || require("path/to/ts-debug-helpers")(ts)
```

Then, you can add use its helpers in the watch window.
