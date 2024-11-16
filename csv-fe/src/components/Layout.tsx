import { Property } from "csstype"
import React, { PropsWithChildren } from "react"
import styled, { CSSObject } from "styled-components"

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
export type PixelSizeType =
  | `${Digit}${Digit}${Digit}px`
  | `${Digit}${Digit}px`
  | `${Digit}px`

export type Spacing = {
  none: PixelSizeType
  xSmall: PixelSizeType
  small: PixelSizeType
  smedium: PixelSizeType
  medium: PixelSizeType
  xMedium: PixelSizeType
  large: PixelSizeType
  xxLarge: PixelSizeType
}

const spacing: Spacing = {
  none: "0px",
  xSmall: "4px",
  small: "8px",
  smedium: "12px",
  medium: "16px",
  xMedium: "24px",
  large: "32px",
  xxLarge: "40px",
}

export const useSpacing = (key: SpacingKey) => spacing[key]

export type SpacingKey = keyof Spacing

const DEBUG_COLORS: boolean = false

type OptionalSize = "none" | SpacingKey

interface LayoutCommonProps {
  padding?: OptionalSize
  paddingVertical?: OptionalSize
  paddingHorizontal?: OptionalSize
  paddingBottom?: OptionalSize
  paddingTop?: OptionalSize
  paddingRight?: OptionalSize
  paddingLeft?: OptionalSize
  id?: string
  gap?: OptionalSize
  horizontal?: boolean
  justifyContent?: Property.JustifyContent
  /**
   * If omitted, and `grow` is set to `true`, then the value
   * will automatically be set to `stretch`
   */
  alignItems?: Property.AlignItems
}

interface LayoutGrowProps extends LayoutCommonProps {
  grow?: boolean
  fullHeight?: never
  fullWidth?: never
}

interface LayoutWidthAndHeightProps extends LayoutCommonProps {
  grow?: never
  fullHeight?: boolean
  fullWidth?: boolean
}

export type LayoutProps = LayoutGrowProps | LayoutWidthAndHeightProps

type ThemedLayoutProps = Required<
  Omit<
    LayoutProps,
    | "padding"
    | "paddingVertical"
    | "paddingHorizontal"
    | "id"
    | "paddingBottom"
    | "paddingTop"
    | "paddingRight"
    | "paddingLeft"
    | "horizontal"
    | "grow"
    | "justifyContent"
    | "alignItems"
    | "fullHeight"
    | "fullWidth"
    | "spacing"
    | "gap"
  >
> & {
  $paddingBottom: OptionalSize
  $paddingTop: OptionalSize
  $paddingRight: OptionalSize
  $paddingLeft: OptionalSize
  $horizontal: boolean
  $grow: boolean
  $justifyContent: Property.JustifyContent
  $alignItems: Property.AlignItems | undefined
  $fullHeight: boolean
  $fullWidth: boolean
  $gap: OptionalSize | undefined
}

export const Layout: React.FC<LayoutProps & PropsWithChildren> = ({
  padding = "none",
  paddingVertical,
  paddingHorizontal,
  paddingBottom,
  paddingTop,
  paddingRight,
  paddingLeft,
  gap,
  horizontal = false,
  children,
  grow = false,
  fullHeight = false,
  fullWidth = false,
  justifyContent = "flex-start",
  alignItems,
  id,
  ...rest
}) => (
  <ThemedLayout
    $paddingBottom={paddingBottom || paddingVertical || padding}
    $paddingTop={paddingTop || paddingVertical || padding}
    $paddingRight={paddingRight || paddingHorizontal || padding}
    $paddingLeft={paddingLeft || paddingHorizontal || padding}
    $horizontal={horizontal}
    $grow={grow}
    $justifyContent={justifyContent}
    $alignItems={alignItems}
    $gap={gap}
    id={id}
    $fullHeight={fullHeight}
    $fullWidth={fullWidth}
    {...rest}
  >
    {children}
  </ThemedLayout>
)

const ThemedLayout = styled.div<ThemedLayoutProps>`
  ${({
    $paddingBottom: semanticPaddingBottom,
    $paddingTop: semanticPaddingTop,
    $paddingRight: semanticPaddingRight,
    $paddingLeft: semanticPaddingLeft,
    $horizontal,
    $grow,
    $justifyContent,
    $alignItems,
    $gap: semanticGap,
    $fullHeight,
    $fullWidth,
  }) => {
    const paddingBottom = useSpacing(semanticPaddingBottom)
    const paddingTop = useSpacing(semanticPaddingTop)
    const paddingRight = useSpacing(semanticPaddingRight)
    const paddingLeft = useSpacing(semanticPaddingLeft)
    const gap = semanticGap ? useSpacing(semanticGap) : undefined

    const css: CSSObject = {
      paddingBottom,
      paddingTop,
      paddingRight,
      paddingLeft,
      display: "flex",
      flexDirection: $horizontal ? "row" : "column",
      flex: $grow ? 1 : 0,
      gap,
      width: $fullWidth || ($horizontal && $grow) ? "100%" : undefined,
      height: $fullHeight || (!$horizontal && $grow) ? "100%" : undefined,
      justifyContent: $justifyContent,
      alignItems: $alignItems || ($grow ? "stretch" : "flex-start"),
      backgroundColor: DEBUG_COLORS ? getDebugColor() : undefined,
      boxSizing: "border-box",
      "&>* + *": {
        marginTop: 0,
        marginLeft: 0,
      },
    }

    return css
  }};
`

const getDebugColor = () => {
  let color = Math.floor(Math.random() * 0xffffff).toString(16)

  while (color.length < 6) {
    color = "0" + color
  }

  return "#" + color
}
