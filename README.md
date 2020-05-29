```
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$             $                                                                                           $
$             $ _______             __            _______                                                 $
$    .===.    $ /       \           /  |          /       \                                               $
$   //- -\\   $ $$$$$$$  | ______  _$$ |_         $$$$$$$  | ______  _______  _______   ______   ______   $
$   \\_=_//   $ $$ |__$$ |/      \/ $$   |        $$ |__$$ |/      \/       \/       \ /      \ /      \  $
$ o==|ooo|==o $ $$    $$</$$$$$$  $$$$$$/         $$    $$< $$$$$$  $$$$$$$  $$$$$$$  /$$$$$$  /$$$$$$  | $
$    |___|    $ $$$$$$$  $$ |  $$ | $$ | __       $$$$$$$  |/    $$ $$ |  $$ $$ |  $$ $$    $$ $$ |  $$/  $
$   _// \\_   $ $$ |__$$ $$ \__$$ | $$ |/  |      $$ |__$$ /$$$$$$$ $$ |  $$ $$ |  $$ $$$$$$$$/$$ |       $
$  /_o| |o_\  $ $$    $$/$$    $$/  $$  $$/       $$    $$/$$    $$ $$ |  $$ $$ |  $$ $$       $$ |       $
$             $ $$$$$$$/  $$$$$$/    $$$$/        $$$$$$$/  $$$$$$$/$$/   $$/$$/   $$/ $$$$$$$/$$/        $
$             $                                                                                           $
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
```

## Overview

This applet generates a banner you can use for autogenerated files or whatever you'd like.

## Install

```
yarn add botbanner
```

## Use

```typescript
import * as createBanner from "botbanner";

console.info(
  ["Bot Banner", "A banner generator"],
  {
    borderChar: "%",
    borderWidth: 1,
    botId: 8152,
    comment: true,
    minWidth: 85,
    padding: 2
  }
);
```