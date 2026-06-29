# Design System

## 1. Product Role

This generated application is an operational React starter for teams that want Redux actions, reducers, and Saga side effects wired from the first commit.

## 2. Visual Direction

The default interface is quiet, readable, and work-focused. It avoids decorative gradients, large marketing sections, and oversized rounded cards.

## 3. Tokens

Color tokens:

- `surface`: `#ffffff`
- `surfaceMuted`: `#f6f7f9`
- `textStrong`: `#20242a`
- `textMuted`: `#5f6875`
- `border`: `#d8dde5`
- `accent`: `#2f6fed`
- `success`: `#1f8a5b`
- `danger`: `#c63d32`

Spacing tokens:

- `space2`: `8px`
- `space3`: `12px`
- `space4`: `16px`
- `space6`: `24px`
- `space8`: `32px`

Typography tokens:

- `fontBody`: system UI stack
- `textBody`: `16px`
- `textTitle`: `28px`
- `lineBody`: `1.5`

## 4. Layout

Use one centered application shell with a maximum width of `960px`, `space6` padding, and full-width content sections separated by borders.

## 5. Components

Primary buttons use `accent` background, white text, `space3` vertical rhythm, and visible focus outlines. Status panels use `surfaceMuted` and `border`.

## 6. Interaction

Loading, success, and failure states must be visible in the same view that starts the request. Keyboard focus must remain visible.

## 7. Accessibility

Use semantic landmarks, real buttons for actions, and text contrast that stays readable on both `surface` and `surfaceMuted`.
