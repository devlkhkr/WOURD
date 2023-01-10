const defaultSvgIconColor = "%23000000";

export function svgSearchIcon(color: string): string {
  color = color ? `%23${color}` : defaultSvgIconColor;
  let icon = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='${color}' width='40px' height='40px' viewBox='0 0 512 512' id='_11_Search' data-name='11 Search'%3E%3Cpath id='Path_16' data-name='Path 16' d='M497.914,497.913a48.085,48.085,0,0,1-68.008,0L345.043,413.05a222.6,222.6,0,0,1-120.659,35.717C100.469,448.767,0,348.313,0,224.383S100.469,0,224.384,0C348.315,0,448.768,100.452,448.768,224.383A222.872,222.872,0,0,1,413.05,345.059l84.864,84.863A48.066,48.066,0,0,1,497.914,497.913Zm-273.53-433.8A160.274,160.274,0,1,0,384.658,224.382,160.271,160.271,0,0,0,224.384,64.109Z' fill-rule='evenodd'/%3E%3C/svg%3E`;
  return `url("${icon}")`;
}

export function svgEmailIcon(color: string): string {
  color = color ? `%23${color}` : defaultSvgIconColor;
  let icon = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='${color}' class='bi bi-at' viewBox='0 0 16 16'%3E%3Cpath d='M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z'/%3E%3C/svg%3E`;
  return `url("${icon}")`;
}

export function svgPwIcon(color: string): string {
  color = color ? `%23${color}` : defaultSvgIconColor;
  let icon = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='${color}' class='bi bi-lock' viewBox='0 0 16 16'%3E%3Cpath d='M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z'/%3E%3C/svg%3E`;
  return `url("${icon}")`;
}
