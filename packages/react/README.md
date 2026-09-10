# @torob/react

React wrappers over the Torob Design System CSS layer.

```tsx
import '@torob/css/dist/torob.css';
import '@torob/css/dist/fonts.css';
import { Button, StoreCard, useToast } from '@torob/react';
```

Set direction once, at the document root — never on a component:

```html
<html lang="fa" dir="rtl">
```

37 components. Full documentation, including the accessibility
contract for each, is on the design system site.

These files are generated from `source/components/*.mjs`. Edit that, then run
`node build/react-build.mjs`.
