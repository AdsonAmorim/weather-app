import { extendTheme } from "native-base";
import { colors } from "./colors";
import { fonts } from "./fonts";

export const theme = extendTheme({ colors, ...fonts });
