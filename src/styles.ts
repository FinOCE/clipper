import { CanvasRenderingContext2D } from "canvas"

export enum Color {
  White = "#ffffff",
  LightGrey = "#939aa3",
  DiscordGrey = "#36393e",
  DiscordGreyDark = "#282b30",
  DiscordGreyDarker = "#1e2124"
}

export function headerText(ctx: CanvasRenderingContext2D, primary = false) {
  ctx.font = "40px 'gg sans'"
  ctx.fillStyle = primary ? Color.White : Color.LightGrey
  ctx.textBaseline = "middle"
  ctx.textAlign = "left"
}

export function headerGuildImageText(ctx: CanvasRenderingContext2D) {
  ctx.font = "30px 'gg sans'"
  ctx.fillStyle = Color.White
  ctx.textBaseline = "middle"
  ctx.textAlign = "center"
}
