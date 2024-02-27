import { CanvasRenderingContext2D } from "canvas"
import { GuildMember } from "discord.js"

export enum Color {
  White = "#ffffff",
  OffWhite = "#aaaaaa",
  LightGrey = "#939aa3",
  DiscordGreyLight = "#424549",
  DiscordGrey = "#36393e",
  DiscordGreyDark = "#282b30",
  DiscordGreyDarker = "#1e2124",
  Blurple = "#7289da"
}

export function useFont(size: number) {
  return `${size}px 'gg sans Normal'`
}

export function headerText(ctx: CanvasRenderingContext2D, primary = false) {
  ctx.font = useFont(45)
  ctx.fillStyle = primary ? Color.White : Color.LightGrey
  ctx.textBaseline = "middle"
  ctx.textAlign = "left"
}

export function headerGuildImageText(ctx: CanvasRenderingContext2D) {
  ctx.font = useFont(35)
  ctx.fillStyle = Color.White
  ctx.textBaseline = "middle"
  ctx.textAlign = "center"
}

export function usernameText(ctx: CanvasRenderingContext2D, member: GuildMember | null) {
  ctx.font = useFont(45)
  ctx.fillStyle = member ? member.displayHexColor : Color.White
  ctx.textBaseline = "top"
  ctx.textAlign = "left"
}

export function messageDateText(ctx: CanvasRenderingContext2D) {
  ctx.font = useFont(40)
  ctx.fillStyle = Color.LightGrey
  ctx.textBaseline = "top"
  ctx.textAlign = "left"
}

export function messageContentText(ctx: CanvasRenderingContext2D) {
  ctx.font = useFont(45)
  ctx.fillStyle = Color.White
  ctx.textBaseline = "top"
  ctx.textAlign = "left"
}

export function replyContentText(ctx: CanvasRenderingContext2D) {
  ctx.font = useFont(40)
  ctx.fillStyle = Color.OffWhite
  ctx.textBaseline = "top"
  ctx.textAlign = "left"
}

export function replyUsernameText(ctx: CanvasRenderingContext2D, member: GuildMember | null) {
  ctx.font = useFont(40)
  ctx.fillStyle = member ? member.displayHexColor : Color.OffWhite
  ctx.textBaseline = "top"
  ctx.textAlign = "left"
}
